import React, { useState, useEffect } from 'react';
import {
    View,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from './components/ui/ShowToast';

import ExerciseModal from './components/exercise/ExerciseModal';
import ExerciseList from "./components/exercise/ExerciseList";
import ExerciseInput from "./components/exercise/ExerciseInput";
import CustomHeader from './components/ui/Header';

import { Exercise, WorkoutData } from './types';

const ExerciseLog: React.FC = () => {
    const [workoutData, setWorkoutData] = useState<WorkoutData>({ workouts: [] });
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [reps, setReps] = useState<string>('');
    const [weight, setWeight] = useState<string>('');

    const { workoutName, workoutId } = useLocalSearchParams();

    const name = Array.isArray(workoutName) ? workoutName[0] : workoutName || "Untitled Workout";
    const id = Array.isArray(workoutId) ? workoutId[0] : workoutId || "Unknown ID";

    const router = useRouter();

    useEffect(() => {
        const loadWorkoutData = async (): Promise<void> => {
            try {
                const savedWorkoutData = await AsyncStorage.getItem('workout-data');
                if (savedWorkoutData) {
                    const parsedData = JSON.parse(savedWorkoutData);
                    setWorkoutData(parsedData);
                }
            } catch (error) {
                console.error("Error loading workout data", error);
            }
        };

        loadWorkoutData();
    }, []);

    const postExercises = async () => {
        const currentWorkout = workoutData.workouts.find(workout => workout.id === id);
        if (!currentWorkout) return;

        try {
            const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/exercises", currentWorkout.exercises || [], {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error posting exercises:', error);
        }
    };

    useEffect(() => {
        saveWorkoutData();
        //postExercises();
    }, [workoutData]);

    const saveWorkoutData = async (): Promise<void> => {
        try {
            await AsyncStorage.setItem('workout-data', JSON.stringify(workoutData));
        } catch (error) {
            console.error('Error saving workout data', error);
        }
    };

    const handleAddExercise = (exerciseName: string): void => {
        console.log(exerciseName)
        if (!exerciseName.trim()) {
            Alert.alert('Error', 'Please select an exercise.');
            return;
        }

        const newExercise: Exercise = {
            id: Date.now().toString(),
            name: exerciseName,
            sets: [],
            date: new Date().toLocaleDateString(),
        };

        setWorkoutData((prevState) => {
            // Find the workout by id
            const workoutIndex = prevState.workouts.findIndex(workout => workout.id === id);
            
            if (workoutIndex === -1) {
                // In case workout not found, should not happen in normal flow
                return prevState;
            }
            
            // Create a new array of workouts
            const updatedWorkouts = [...prevState.workouts];
            // Get current workout
            const currentWorkout = { ...updatedWorkouts[workoutIndex] };
            // Add new exercise
            currentWorkout.exercises = [...currentWorkout.exercises, newExercise];
            // Update the workout in the array
            updatedWorkouts[workoutIndex] = currentWorkout;
            
            return {
                ...prevState,
                workouts: updatedWorkouts
            };
        });

        showToast("success", "Exercise Added", exerciseName + " has been added!")

        Keyboard.dismiss();
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true      // For AM/PM format
        }).toLowerCase();   // Convert "PM" to "pm"
    };

    const handleAddSet = (): void => {
        if (!reps.trim() || !weight.trim()) {
            Alert.alert('Error', 'Please fill out both reps and weight.');
            return;
        }

        const parsedReps = parseInt(reps, 10);
        const parsedWeight = parseFloat(weight);

        if (isNaN(parsedReps) || isNaN(parsedWeight)) {
            Alert.alert('Error', 'Please enter valid numbers for reps and weight.');
            return;
        }

        if (selectedExercise) {
            const updatedExercise: Exercise = {
                ...selectedExercise,
                sets: [
                    ...selectedExercise.sets,
                    { reps: parsedReps, weight: parsedWeight, date: getCurrentTime() },
                ],
            };

            setWorkoutData((prevState) => {
                // Find the workout
                const workoutIndex = prevState.workouts.findIndex(workout => workout.id === id);
                if (workoutIndex === -1) return prevState;
                
                const currentWorkout = { ...prevState.workouts[workoutIndex] };
                
                // Update the exercise in the workout
                currentWorkout.exercises = currentWorkout.exercises.map(exercise => 
                    exercise.id === selectedExercise.id ? updatedExercise : exercise
                );
                
                // Create a new array of workouts with the updated workout
                const updatedWorkouts = [...prevState.workouts];
                updatedWorkouts[workoutIndex] = currentWorkout;
                
                return {
                    ...prevState,
                    workouts: updatedWorkouts
                };
            });

            showToast("success", "Set Added", "Set " + (selectedExercise.sets.length + 1) + " has been added!")

            setReps('');
            setWeight('');
            setSelectedExercise(updatedExercise);
            Keyboard.dismiss();
        }
    };

    const handleDeleteExercise = (exerciseId: string, name: string): void => {
        // need to save these exercises here
        Alert.alert('Confirm', 'Are you sure you want to delete this exercise?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => {
                    showToast("error", "Exercise Removed", name + " has been removed!")
                    
                    setWorkoutData((prevState) => {
                        // Find the workout
                        const workoutIndex = prevState.workouts.findIndex(workout => workout.id === id);
                        if (workoutIndex === -1) return prevState;
                        
                        const currentWorkout = { ...prevState.workouts[workoutIndex] };
                        
                        // Remove the exercise from the workout
                        currentWorkout.exercises = currentWorkout.exercises.filter(
                            exercise => exercise.id !== exerciseId
                        );
                        
                        // Create a new array of workouts with the updated workout
                        const updatedWorkouts = [...prevState.workouts];
                        updatedWorkouts[workoutIndex] = currentWorkout;
                        
                        return {
                            ...prevState,
                            workouts: updatedWorkouts
                        };
                    });
                },
            },
        ]);
    };

    const handleExerciseSelect = (exercise: Exercise): void => {
        setSelectedExercise(exercise);
        setModalVisible(true);
    };

    const clearExercises = async (): Promise<void> => {
        setWorkoutData((prevState) => {
            // Find the workout
            const workoutIndex = prevState.workouts.findIndex(workout => workout.id === id);
            if (workoutIndex === -1) return prevState;
            
            const currentWorkout = { ...prevState.workouts[workoutIndex] };
            
            // Clear all exercises
            currentWorkout.exercises = [];
            
            // Create a new array of workouts with the updated workout
            const updatedWorkouts = [...prevState.workouts];
            updatedWorkouts[workoutIndex] = currentWorkout;
            
            return {
                ...prevState,
                workouts: updatedWorkouts
            };
        });
        
        saveWorkoutData();
    };

    const handleClearExercises = (): void => {
        Alert.alert('Confirm', 'Are you sure you want to clear all exercises?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Clear', onPress: () => {
                    clearExercises()
                    showToast("error", "Exercises Removed", "All of your exercises have been cleared!")
                }
            },
        ]);
    };

    // Helper function to get current workout exercises
    const getCurrentWorkoutExercises = (): Exercise[] => {
        const workout = workoutData.workouts.find(w => w.id === id);
        return workout ? workout.exercises : [];
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-discord-background">
                <CustomHeader
                    title={name}
                    onBack={() => router.back()}
                />

                <View className="px-4">
                    <ExerciseInput
                        handleAddExercise={handleAddExercise}
                        handleClearExercises={handleClearExercises}
                        exerciseCount={getCurrentWorkoutExercises().length}
                    />
                </View>

                <View className="flex-1 px-4 mt-2">
                    <ExerciseList
                        exercises={getCurrentWorkoutExercises()}
                        handleExerciseSelect={handleExerciseSelect}
                        handleDeleteExercise={handleDeleteExercise}
                    />
                </View>

                <ExerciseModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    selectedExercise={selectedExercise}
                    reps={reps}
                    setReps={setReps}
                    weight={weight}
                    setWeight={setWeight}
                    handleAddSet={handleAddSet}
                    exercises={getCurrentWorkoutExercises()}
                    setExercises={(updatedExercises) => {
                        setWorkoutData((prevState) => {
                            // Find the workout
                            const workoutIndex = prevState.workouts.findIndex(workout => workout.id === id);
                            if (workoutIndex === -1) return prevState;
                            
                            const currentWorkout = { ...prevState.workouts[workoutIndex] };
                            
                            // Update all exercises
                            currentWorkout.exercises = updatedExercises;
                            
                            // Create a new array of workouts with the updated workout
                            const updatedWorkouts = [...prevState.workouts];
                            updatedWorkouts[workoutIndex] = currentWorkout;
                            
                            return {
                                ...prevState,
                                workouts: updatedWorkouts
                            };
                        });
                    }}
                    setSelectedExercise={setSelectedExercise}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ExerciseLog;