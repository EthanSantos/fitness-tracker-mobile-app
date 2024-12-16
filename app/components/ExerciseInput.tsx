import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import "../../global.css";

type ExerciseInputProps = {
    exerciseName: string;
    setExerciseName: (name: string) => void;
    handleAddExercise: () => void;
    handleClearExercises: () => void;
};

const ExerciseInput: React.FC<ExerciseInputProps> = ({
    exerciseName,
    setExerciseName,
    handleAddExercise,
    handleClearExercises,
}) => {
    return (
        <View className="mb-6 p-6 bg-discord-background rounded-lg">
            <TextInput
                className="border border-discord-card rounded-lg px-4 py-3 mb-4 text-discord-text text-lg bg-discord-card"
                placeholder="Enter Exercise Name"
                placeholderTextColor="#72767D" // Muted gray from Discord theme
                value={exerciseName}
                onChangeText={setExerciseName}
            />
            <TouchableOpacity
                className="bg-discord-accent rounded-lg py-3 mb-4 active:opacity-80"
                onPress={handleAddExercise}
            >
                <Text className="text-center text-white text-lg">Add Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-discord-error rounded-lg py-3 active:opacity-80"
                onPress={handleClearExercises}
            >
                <Text className="text-center text-white text-lg">Clear All Exercises</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExerciseInput;
