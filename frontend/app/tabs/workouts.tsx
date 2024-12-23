import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import WorkoutCard from '../components/WorkoutCard';
import EmptyWorkoutList from '../components/EmptyWorkoutList';

type Workout = {
    id: string;
    name: string;
};
type Exercise = {
    id: string;
    name: string;
    sets: { reps: number; weight: number }[];
    date: string;
}

const Workouts: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exercises, setExercises] = useState<Record<string, Exercise[]>>({}); // the string is the key
    const [workoutName, setWorkoutName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const showToast = (type: string, text1: string, text2: string) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    };

    const loadWorkouts = async () => {
        try {
            setIsLoading(true);
            const savedWorkouts = await AsyncStorage.getItem('workouts');
            if (savedWorkouts) {
                setWorkouts(JSON.parse(savedWorkouts));
            }
        } catch (error) {
            console.error('Error loading workouts:', error);
            Alert.alert('Error', 'Failed to load workouts');
        } finally {
            setIsLoading(false);
        }
    };

    const saveWorkouts = async (updatedWorkouts: Workout[]) => {
        try {
            await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        } catch (error) {
            console.error('Error saving workouts:', error);
            Alert.alert('Error', 'Failed to save workout');
        }
    };

    const fetchExercises = async () => {
        try {
            const exercisesData = await AsyncStorage.getItem('exercisesByWorkout');
            if (exercisesData) {
                setExercises(JSON.parse(exercisesData));
            }
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    };

    const getLatestWorkoutStats = (workoutId: string) => {
        const workoutExercises = exercises[workoutId] || [];
        const exerciseCount = workoutExercises.length;
        const totalSets = workoutExercises.reduce(
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

        const newWorkout: Workout = {
            id: Date.now().toString(),
            name: workoutName.trim(),
        };

        showToast("success", "Added workout", workoutName + " has been added to your workout plan!")

        const updatedWorkouts = [...workouts, newWorkout];
        setWorkouts(updatedWorkouts);
        saveWorkouts(updatedWorkouts);
        setWorkoutName('');
        Keyboard.dismiss();
    };

    const handleDeleteWorkout = (workoutId: string, name: string) => {
        Alert.alert(
            'Delete Workout',
            `Are you sure you want to delete "${name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const updatedWorkouts = workouts.filter((w) => w.id !== workoutId);
                        showToast("error", "Workout Removed", name + " has been deleted.")
                        setWorkouts(updatedWorkouts);
                        saveWorkouts(updatedWorkouts);
                    },
                },
            ]
        );
    };

    const navigateToWorkout = (workout: Workout) => {
        router.push({
            pathname: '/exercise',
            params: { workoutId: workout.id, workoutName: workout.name },
        });
    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                await loadWorkouts();
                await fetchExercises();
            };

            fetchData();
        }, [])
    );

    return (
        <SafeAreaView edges={['left', 'right']} className="flex-1 bg-discord-background">
            <CustomHeader title="Workouts" titleAlign="center" />

            <View className="p-4 flex-1">
                {/* Add Workout Section */}
                <View className="bg-discord-card rounded-xl p-4 mb-6">
                    <View className="flex-row items-center mb-4">
                        <MaterialCommunityIcons
                            name="playlist-plus"
                            size={24}
                            color="#5865F2"
                            style={{ marginRight: 8 }}
                        />
                        <Text className="text-discord-text text-xl font-bold">
                            Add Workout
                        </Text>
                    </View>

                    <TextInput
                        className="bg-discord-background text-discord-text text-lg px-4 py-3 rounded-lg mb-3"
                        placeholder="What's your workout plan?"
                        placeholderTextColor="#72767D"
                        value={workoutName}
                        onChangeText={setWorkoutName}
                        onSubmitEditing={handleAddWorkout}
                    />

                    <TouchableOpacity
                        className="bg-discord-accent py-3 rounded-lg items-center justify-center flex-row space-x-2"
                        onPress={handleAddWorkout}
                    >
                        <Text className="text-white font-bold text-lg">
                            Create Workout
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Workouts List */}
                {isLoading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#5865F2" />
                    </View>
                ) : (
                    <FlatList
                        data={workouts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <WorkoutCard
                                item={item}
                                exercises={exercises}
                                getLatestWorkoutStats={getLatestWorkoutStats}
                                navigateToWorkout={navigateToWorkout}
                                handleDeleteWorkout={handleDeleteWorkout}
                            />}
                        ListEmptyComponent={EmptyWorkoutList}
                        contentContainerStyle={workouts.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Workouts;