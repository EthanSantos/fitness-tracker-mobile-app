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
import { Set } from '../types';

type Workout = {
  id: string;
  name: string;
};

type Exercise = {
  id: string;
  name: string;
  sets: Set[];
  date: string;
  workoutId?: string;
};

const Workouts: React.FC = () => {
  // State variables
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Record<string, Exercise[]>>({});
  const [recentExercises, setRecentExercises] = useState<Exercise[]>([]);
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
  const loadWorkouts = async () => {
    try {
      setIsLoading(true);
      const savedWorkouts = await AsyncStorage.getItem('workouts');
      if (savedWorkouts) {
        const parsedWorkouts = JSON.parse(savedWorkouts);
        // Sort workouts by ID (newest first)
        const sortedWorkouts = parsedWorkouts.sort((a: Workout, b: Workout) => {
          return parseInt(b.id) - parseInt(a.id);
        });
        setWorkouts(sortedWorkouts);
      }
    } catch (error) {
      console.error('Error loading workouts:', error);
      Alert.alert('Error', 'Failed to load workouts');
    } finally {
      setIsLoading(false);
    }
  };

  // Save workouts to AsyncStorage
  const saveWorkouts = async (updatedWorkouts: Workout[]) => {
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error('Error saving workouts:', error);
      Alert.alert('Error', 'Failed to save workout');
    }
  };

  // Fetch exercises from AsyncStorage
  const fetchExercises = async () => {
    try {
      const exercisesData = await AsyncStorage.getItem('exercisesByWorkout');
      if (exercisesData) {
        const parsedExercises = JSON.parse(exercisesData);
        setExercises(parsedExercises);
        // Extract recent exercises with workout dates
        const recentExercisesWithWorkoutDates: Array<Exercise & { workoutId: string }> = [];
        Object.entries(parsedExercises).forEach(([workoutId, workoutExercisesUntyped]) => {
          const workoutExercises = workoutExercisesUntyped as Exercise[];
          workoutExercises.forEach(exercise => {
            recentExercisesWithWorkoutDates.push({
              ...exercise,
              workoutId,
            });
          });
        });
        // Sort by workout date (using workoutId as timestamp) descending and take most recent 5
        const sortedExercises = recentExercisesWithWorkoutDates
          .sort((a, b) => parseInt(b.workoutId) - parseInt(a.workoutId))
          .slice(0, 5);
        setRecentExercises(sortedExercises);
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  // Get latest workout stats (exercise count and total sets)
  const getLatestWorkoutStats = (workoutId: string) => {
    const workoutExercises = exercises[workoutId] || [];
    const exerciseCount = workoutExercises.length;
    const totalSets = workoutExercises.reduce(
      (sum, exercise) => sum + (exercise.sets?.length || 0),
      0
    );
    return { exerciseCount, totalSets };
  };

  // Handle adding a new workout
  const handleAddWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName.trim(),
    };
    showToast("success", "Added workout", `${workoutName} has been added to your workout plan!`);
    const updatedWorkouts = [newWorkout, ...workouts];
    setWorkouts(updatedWorkouts);
    saveWorkouts(updatedWorkouts);
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
              // 1. Remove workout from workouts array
              const updatedWorkouts = workouts.filter((w) => w.id !== workoutId);
              setWorkouts(updatedWorkouts);
              await saveWorkouts(updatedWorkouts);
              // 2. Remove exercises associated with this workout
              const updatedExercises = { ...exercises };
              delete updatedExercises[workoutId];
              setExercises(updatedExercises);
              await AsyncStorage.setItem('exercisesByWorkout', JSON.stringify(updatedExercises));
              // 3. Update recent exercises list
              const updatedRecentExercises = recentExercises.filter(
                exercise => exercise.workoutId !== workoutId
              );
              setRecentExercises(updatedRecentExercises);
              showToast("error", "Workout Removed", `${name} has been deleted.`);
            } catch (error) {
              console.error("Error deleting workout and exercises:", error);
              Alert.alert("Error", "Failed to delete workout and associated exercises");
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
    return workouts.filter(workout => {
      const workoutDate = new Date(parseInt(workout.id));
      return isSameDay(workoutDate, selectedDate);
    });
  };

  // Fetch data when screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await loadWorkouts();
        await fetchExercises();
      };
      fetchData();
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
                    exercises={exercises}
                    getLatestWorkoutStats={getLatestWorkoutStats}
                    navigateToWorkout={(workout) => navigateToWorkout(workout)}
                    handleDeleteWorkout={handleDeleteWorkout}
                  />
                ))
              ) : (
                <EmptyWorkoutList />
              )}
              {/* Recently Logged Exercises */}
              <RecentExercises
                exercises={recentExercises}
                onExercisePress={(exercise) => {
                  const workoutId = exercise.workoutId;
                  if (!workoutId) return;
                  const workout = workouts.find(w => w.id === workoutId);
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
