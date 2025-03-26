import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import ExerciseAutocomplete from './ExerciseAutocomplete';

import "../../global.css";

type ExerciseInputProps = {
    exerciseName: string;
    setExerciseName: (name: string) => void;
    handleAddExercise: () => void;
    handleClearExercises: () => void;
    exerciseCount?: number;
};

const ExerciseInput: React.FC<ExerciseInputProps> = ({
    exerciseName,
    setExerciseName,
    handleAddExercise,
    handleClearExercises,
    exerciseCount = 0,
}) => {
    // Handle add exercise with validation
    const handleAddWithValidation = () => {
        if (!exerciseName.trim()) return;
        handleAddExercise();
    };
    
    // Confirmation for clearing exercises
    const confirmClearExercises = () => {
        Alert.alert(
            "Clear Workout",
            "Remove all exercises from your workout?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Clear All", 
                    style: "destructive",
                    onPress: handleClearExercises
                }
            ]
        );
    };
    
    return (
        <View className="mb-6">
            {/* Simple heading with clear all button always visible */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                    <Text className="text-discord-text text-lg font-medium">
                        Add exercise
                    </Text>
                    {exerciseCount > 0 && (
                        <Text className="text-discord-muted text-sm ml-2">
                            ({exerciseCount})
                        </Text>
                    )}
                </View>
                
                {/* Clear button - always visible but disabled when no exercises */}
                <TouchableOpacity
                    className={`flex-row items-center py-1 px-3 rounded-lg ${exerciseCount > 0 ? 'bg-discord-error/10' : 'opacity-40'}`}
                    onPress={confirmClearExercises}
                    disabled={exerciseCount === 0}
                >
                    <AntDesign name="delete" size={14} color="#ED4245" />
                    <Text className="text-discord-error text-sm font-medium ml-1">
                        Clear All
                    </Text>
                </TouchableOpacity>
            </View>
            
            {/* Clean, borderless input with subtle background */}
            <View className="mb-4">
                <ExerciseAutocomplete 
                    exerciseName={exerciseName} 
                    setExerciseName={setExerciseName}
                />
            </View>
            
            {/* Simple, clean button */}
            <TouchableOpacity
                className={`py-3 rounded-lg bg-discord-accent flex-row justify-center items-center ${!exerciseName.trim() ? 'opacity-50' : ''}`}
                onPress={handleAddWithValidation}
                disabled={!exerciseName.trim()}
            >
                <Ionicons name="add" size={20} color="#ffffff" />
                <Text className="text-white font-medium ml-2">
                    Add to Workout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExerciseInput;