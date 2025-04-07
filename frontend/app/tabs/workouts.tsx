import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/ui/Header';
import { useFocusEffect } from '@react-navigation/native';
import { showToast } from '../components/ui/ShowToast';
import WorkoutCard from '../components/workout/WorkoutCard';
import WeeklyCalendar from '../components/workout/WeeklyCalendar';
import RecentExercises from '../components/workout/RecentExercises';
import EmptyWorkoutList from '../components/workout/EmptyWorkoutList';
import InputWorkout from '../components/workout/InputWorkout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Workout, WorkoutData, ExerciseWithWorkoutId } from '../types';

const Workouts: React.FC = () => {
  // State variables
  const [workoutData, setWorkoutData] = useState<WorkoutData>({ workouts: [] });
  const [recentExercises, setRecentExercises] = useState<ExerciseWithWorkoutId[]>([]);
  const [workoutName, setWorkoutName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Get start of the week (Sunday)
  function getWeekStart(date: Date): Date {
    const result = new Date(date);
    result.setDate(date.getDate() - date.getDay()); // Go to Sunday
    result.setHours(0, 0, 0, 0);
    return result;
  }

  // Load workouts from AsyncStorage
  const loadWorkoutData = async () => {
    try {
      setIsLoading(true);
      const savedData = await AsyncStorage.getItem('workout-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Sort workouts by ID (newest first)
        parsedData.workouts.sort((a: Workout, b: Workout) => {
          return parseInt(b.id) - parseInt(a.id);
        });
        
        setWorkoutData(parsedData);
      }
    } catch (error) {
      console.error('Error loading workouts:', error);
      Alert.alert('Error', 'Failed to load workouts');
    } finally {
      setIsLoading(false);
    }
  };

  // Save workouts to AsyncStorage
  const saveWorkoutData = async (updatedData: WorkoutData) => {
    try {
      await AsyncStorage.setItem('workout-data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving workout data:', error);
      Alert.alert('Error', 'Failed to save workout data');
    }
  };

  // Extract recent exercises from all workouts
  const generateRecentExercises = (workoutData: WorkoutData): ExerciseWithWorkoutId[] => {
    const allExercises: ExerciseWithWorkoutId[] = [];
    
    workoutData.workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        // Add workout ID as a property to each exercise for reference
        allExercises.push({
          ...exercise,
          workoutId: workout.id
        });
      });
    });
    
    // Sort by workout date (using workoutId as timestamp) descending and take most recent 5
    return allExercises
      .sort((a, b) => parseInt(b.workoutId) - parseInt(a.workoutId))
      .slice(0, 5);
  };

  // Get latest workout stats (exercise count and total sets)
  const getLatestWorkoutStats = (workoutId: string) => {
    const workout = workoutData.workouts.find(w => w.id === workoutId);
    if (!workout) return { exerciseCount: 0, totalSets: 0 };
    
    const exerciseCount = workout.exercises.length;
    const totalSets = workout.exercises.reduce(
      (sum, exercise) => sum + (exercise.sets?.length || 0),
      0
    );
    
    return { exerciseCount, totalSets };
  };

  const handleAddWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }
    
    // Create a timestamp based on the selected date
    // Set the time to noon (12:00) on the selected date to avoid timezone issues
    const dateAtNoon = new Date(selectedDate);
    dateAtNoon.setHours(12, 0, 0, 0);
    const timestamp = dateAtNoon.getTime();
    
    const newWorkout: Workout = {
      id: timestamp.toString(),
      name: workoutName.trim(),
      date: selectedDate.toLocaleDateString(),
      exercises: [],
    };
    
    showToast("success", "Added workout", `${workoutName} has been added to your workout plan!`);
    
    const updatedWorkoutData = {
      ...workoutData,
      workouts: [newWorkout, ...workoutData.workouts]
    };
    
    setWorkoutData(updatedWorkoutData);
    saveWorkoutData(updatedWorkoutData);
    setWorkoutName('');
    Keyboard.dismiss();
    setShowModal(false);
  };

  // Handle deleting a workout and its associated exercises
  const handleDeleteWorkout = (workoutId: string, name: string) => {
    Alert.alert(
      'Delete Workout',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove workout from workouts array
              const updatedWorkouts = workoutData.workouts.filter((w) => w.id !== workoutId);
              
              const updatedWorkoutData = {
                ...workoutData,
                workouts: updatedWorkouts
              };
              
              setWorkoutData(updatedWorkoutData);
              await saveWorkoutData(updatedWorkoutData);
              
              // Update recent exercises list
              setRecentExercises(generateRecentExercises(updatedWorkoutData));
              
              showToast("error", "Workout Removed", `${name} has been deleted.`);
            } catch (error) {
              console.error("Error deleting workout:", error);
              Alert.alert("Error", "Failed to delete workout");
            }
          },
        },
      ]
    );
  };

  // Navigate to the workout details screen
  const navigateToWorkout = (workout: Workout) => {
    router.push({
      pathname: '/exercise',
      params: { workoutId: workout.id, workoutName: workout.name },
    });
  };

  // Check if two dates are the same day (ignoring time)
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Filter workouts for the selected date
  const getWorkoutsForSelectedDate = () => {
    return workoutData.workouts.filter(workout => {
      const workoutDate = new Date(parseInt(workout.id));
      return isSameDay(workoutDate, selectedDate);
    });
  };

  // Update recent exercises when workoutData changes
  useEffect(() => {
    if (workoutData.workouts.length > 0) {
      setRecentExercises(generateRecentExercises(workoutData));
    }
  }, [workoutData]);

  // Fetch data when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadWorkoutData();
    }, [])
  );

  // Reset to current week and today's date when component mounts
  useEffect(() => {
    const today = new Date();
    setCurrentWeekStart(getWeekStart(today));
    setSelectedDate(today);
  }, []);

  const filteredWorkouts = getWorkoutsForSelectedDate();

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 bg-discord-background">
      <CustomHeader title="Workouts" titleAlign="center" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Calendar Week View Component */}
        <WeeklyCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          currentWeekStart={currentWeekStart}
          setCurrentWeekStart={setCurrentWeekStart}
        />
        <View className="px-4">
          {/* Workouts List for Selected Date */}
          {isLoading ? (
            <View className="flex-1 justify-center items-center py-10">
              <ActivityIndicator size="large" color="#5865F2" />
            </View>
          ) : (
            <>
              <Text className="text-discord-text text-xl font-bold mb-4">
                {isSameDay(selectedDate, new Date())
                  ? "Today's Workouts"
                  : `Workouts for ${selectedDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}`}
              </Text>
              {filteredWorkouts.length > 0 ? (
                filteredWorkouts.map(workout => (
                  <WorkoutCard
                    key={workout.id}
                    item={workout}
                    getLatestWorkoutStats={() => getLatestWorkoutStats(workout.id)}
                    navigateToWorkout={() => navigateToWorkout(workout)}
                    handleDeleteWorkout={() => handleDeleteWorkout(workout.id, workout.name)}
                  />
                ))
              ) : (
                <EmptyWorkoutList />
              )}
              {/* Recently Logged Exercises */}
              <RecentExercises
                exercises={recentExercises}
                onExercisePress={(exercise) => {
                  const workoutId = (exercise as ExerciseWithWorkoutId).workoutId;
                  if (!workoutId) return;
                  const workout = workoutData.workouts.find(w => w.id === workoutId);
                  if (!workout) return;
                  navigateToWorkout(workout);
                }}
              />
            </>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#5865F2',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      {/* InputWorkout Modal */}
      <InputWorkout
        visible={showModal}
        setVisible={setShowModal}
        workoutName={workoutName}
        setWorkoutName={setWorkoutName}
        handleAddWorkout={handleAddWorkout}
      />
    </SafeAreaView>
  );
};

export default Workouts;