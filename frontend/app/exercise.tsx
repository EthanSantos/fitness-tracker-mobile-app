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
import { showToast } from './components/ShowToast';

import ExerciseModal from './components/ExerciseModal';
import ExerciseList from "./components/ExerciseList";
import ExerciseInput from "./components/ExerciseInput";
import CustomHeader from './components/Header';


// Define the Exercise data structure
type Exercise = {
    id: string;
    name: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

type ExercisesByWorkout = {
    [workoutId: string]: Exercise[];
};

const ExerciseLog: React.FC = () => {
    const [exercisesByWorkout, setExercisesByWorkout] = useState<ExercisesByWorkout>({});
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [exerciseName, setExerciseName] = useState<string>('');
    const [reps, setReps] = useState<string>('');
    const [weight, setWeight] = useState<string>('');

    const { workoutName, workoutId } = useLocalSearchParams();

    const name = Array.isArray(workoutName) ? workoutName[0] : workoutName || "Untitled Workout";
    const id = Array.isArray(workoutId) ? workoutId[0] : workoutId || "Unknown ID";

    const router = useRouter();

    useEffect(() => {
        const loadExercises = async (): Promise<void> => {
            try {
                const savedExercises = await AsyncStorage.getItem('exercisesByWorkout');
                if (savedExercises) {
                    setExercisesByWorkout(JSON.parse(savedExercises));
                }
            } catch (error) {
                console.error("Error loading exercises", error);
            }
        };

        loadExercises();
    }, []);

    const postExercises = async () => {
        try {
            const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/exercises", exercisesByWorkout[id] || [], {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error posting exercises:', error);
        }
    };

    useEffect(() => {
        saveExercises();
        postExercises();
    }, [exercisesByWorkout]);

    const saveExercises = async (): Promise<void> => {
        try {
            await AsyncStorage.setItem('exercisesByWorkout', JSON.stringify(exercisesByWorkout));
        } catch (error) {
            console.error('Error saving exercises', error);
        }
    };

    const handleAddExercise = (): void => {
        if (!exerciseName.trim()) {
            Alert.alert('Error', 'Please enter an exercise name.');
            return;
        }

        const newExercise: Exercise = {
            id: Date.now().toString(),
            name: exerciseName,
            sets: [],
            date: new Date().toLocaleDateString(),
        };

        setExercisesByWorkout((prevState) => ({
            ...prevState,
            [id]: [...(prevState[id] || []), newExercise],
        }));

        showToast("success", "Exercise Added", exerciseName + " has been added!")

        setExerciseName('');
        Keyboard.dismiss();
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
                    { reps: parsedReps, weight: parsedWeight },
                ],
            };

            setExercisesByWorkout((prevState) => ({
                ...prevState,
                [id]: (prevState[id] || []).map((exercise) =>
                    exercise.id === selectedExercise.id ? updatedExercise : exercise
                ),
            }));

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
                    setExercisesByWorkout((prevState) => ({
                        ...prevState,
                        [id]: (prevState[id] || []).filter((exercise) => exercise.id !== exerciseId),
                    }))
                },
            },
        ]);
    };

    const handleExerciseSelect = (exercise: Exercise): void => {
        setSelectedExercise(exercise);
        setModalVisible(true);
    };

    const clearExercises = async (): Promise<void> => {
        setExercisesByWorkout((prevState) => ({
            ...prevState,
            [id]: [],
        }));
        saveExercises();
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-discord-background">
                <CustomHeader
                    title={name}
                    onBack={() => router.back()}
                />

                <View className="px-4">
                    <ExerciseInput
                        exerciseName={exerciseName}
                        setExerciseName={setExerciseName}
                        handleAddExercise={handleAddExercise}
                        handleClearExercises={handleClearExercises}
                    />
                </View>

                <View className="flex-1 px-4 mt-2">
                    <ExerciseList
                        exercises={exercisesByWorkout[id] || []}
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
                    exercises={exercisesByWorkout[id] || []}
                    setExercises={(updatedExercises) =>
                        setExercisesByWorkout((prevState) => ({
                            ...prevState,
                            [id]: updatedExercises,
                        }))
                    }
                    setSelectedExercise={setSelectedExercise}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ExerciseLog;
