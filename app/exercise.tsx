import React, { useState, useEffect } from 'react';
import {
    View,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ExerciseModal from './components/ExerciseModal';
import ExerciseList from "./components/ExerciseList";
import ExerciseInput from "./components/ExerciseInput";
import CustomHeader from './components/Header';

import "../global.css";

// Define the Exercise data structure
type Exercise = {
    id: string;
    name: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

const ExerciseLog: React.FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [exerciseName, setExerciseName] = useState<string>('');
    const [reps, setReps] = useState<string>('');
    const [weight, setWeight] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        const loadExercises = async (): Promise<void> => {
            try {
                const savedExercises = await AsyncStorage.getItem('exercises');
                if (savedExercises) {
                    setExercises(JSON.parse(savedExercises));
                }
            } catch (error) {
                console.error("Error loading exercises", error);
            }
        };

        loadExercises();
    }, []);

    const postExercises = async () => {
        console.log(process.env.EXPO_PUBLIC_API_URL + "/api/exercises")
        try {
            const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/exercises", exercises, {
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
    }, [exercises]);

    const saveExercises = async (): Promise<void> => {
        try {
            await AsyncStorage.setItem('exercises', JSON.stringify(exercises));
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

        setExercises([...exercises, newExercise]);
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

            setExercises((prevExercises) =>
                prevExercises.map((exercise) =>
                    exercise.id === selectedExercise.id ? updatedExercise : exercise
                )
            );

            setReps('');
            setWeight('');
            setSelectedExercise(updatedExercise);
            Keyboard.dismiss();
        }
    };

    const handleDeleteExercise = (id: string): void => {
        Alert.alert('Confirm', 'Are you sure you want to delete this exercise?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () =>
                    setExercises((prevExercises) =>
                        prevExercises.filter((exercise) => exercise.id !== id)
                    ),
            },
        ]);
    };

    const handleExerciseSelect = (exercise: Exercise): void => {
        setSelectedExercise(exercise);
        setModalVisible(true);
    };

    const clearExercises = async (): Promise<void> => {
        setExercises([]);
        saveExercises();
    };

    const handleClearExercises = (): void => {
        Alert.alert('Confirm', 'Are you sure you want to clear all exercises?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', onPress: () => clearExercises() },
        ]);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-discord-background">
                <CustomHeader
                    title="Exercises"
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
                        exercises={exercises}
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
                    exercises={exercises}
                    setExercises={setExercises}
                    setSelectedExercise={setSelectedExercise}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ExerciseLog;
