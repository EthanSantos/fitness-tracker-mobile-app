import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import "../../global.css"

type WorkoutInputProps = {
    exercise: string;
    setExercise: (exercise: string) => void;
    handleAddWorkout: () => void;
    handleClearWorkouts: () => void;
};

const WorkoutInput: React.FC<WorkoutInputProps> = ({ exercise, setExercise, handleAddWorkout, handleClearWorkouts }) => {
    return (
        <View className="mb-6 p-6 bg-discord-background rounded-lg">
            <TextInput
                className="border border-discord-card rounded-lg px-4 py-3 mb-4 text-discord-text text-lg bg-discord-card"
                placeholder="Enter Exercise Name"
                placeholderTextColor="#72767D" // Muted gray from Discord theme
                value={exercise}
                onChangeText={setExercise}
            />
            <TouchableOpacity
                className="bg-discord-accent rounded-lg py-3 mb-4 active:opacity-80"
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

export default WorkoutInput
