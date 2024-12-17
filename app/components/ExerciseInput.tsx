import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import ExerciseAutocomplete from './ExerciseAutocomplete';

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
        <View className="mb-6 py-4 bg-discord-background rounded-lg">
            {/* Input Section */}
            <Text className="text-discord-text text-lg font-semibold mb-2">
                Exercise Name
            </Text>
            <ExerciseAutocomplete exerciseName={exerciseName} setExerciseName={setExerciseName}/>

            {/* Add Exercise Button */}
            <TouchableOpacity
                className="bg-discord-accent p-4 rounded-lg mb-4 active:opacity-80"
                onPress={handleAddExercise}
            >
                <Text className="text-white text-center text-lg font-bold tracking-wide">
                    + Add Exercise
                </Text>
            </TouchableOpacity>

            {/* Clear All Exercises Button */}
            <TouchableOpacity
                className="bg-discord-error p-4 rounded-lg active:opacity-80"
                onPress={handleClearExercises}
            >
                <Text className="text-white text-center text-lg font-bold tracking-wide">
                    Clear All Exercises
                </Text>
            </TouchableOpacity>
        </View>

    );
};

export default ExerciseInput;
