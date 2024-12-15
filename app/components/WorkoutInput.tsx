import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import "../../global.css"

type Workout = {
    id: string;
    exercise: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

type WorkoutModalProps = {
    exercise: string;
    setExercise: (exercise: string) => void;
    handleAddWorkout: () => void;
    handleClearWorkouts: () => void;
};

const WorkoutModal: React.FC<WorkoutModalProps> = ({ exercise, setExercise, handleAddWorkout, handleClearWorkouts }) => {
    return (
        <View className="mb-6 p-6 bg-gray-50 rounded-2xl">
            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-900 text-lg"
                placeholder="Enter Exercise Name"
                placeholderTextColor="#6B7280"
                value={exercise}
                onChangeText={setExercise}
            />
            <TouchableOpacity
                className="bg-blue-500 rounded-lg py-3 mb-4 active:opacity-80"
                onPress={handleAddWorkout}
            >
                <Text className="text-center text-white text-lg">Add Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-red-500 rounded-lg py-3 active:opacity-80"
                onPress={handleClearWorkouts}
            >
                <Text className="text-center text-white text-lg">Clear All Workouts</Text>
            </TouchableOpacity>
        </View>
    )
}

export default WorkoutModal
