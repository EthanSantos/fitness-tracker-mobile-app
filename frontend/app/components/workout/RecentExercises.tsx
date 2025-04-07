import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExerciseWithWorkoutId } from '@/app/types';
import { calculateAvgWeight } from '@/app/utils/fitness';

type RecentExercisesProps = {
    exercises: ExerciseWithWorkoutId[];
    onExercisePress?: (exercise: ExerciseWithWorkoutId) => void;
};

const RecentExercises: React.FC<RecentExercisesProps> = ({
    exercises,
    onExercisePress
}) => {
    if (exercises.length === 0) {
        return null;
    }

    return (
        <View className="mt-6 mb-10">
            <Text className="text-discord-text text-xl font-bold mb-4">Recently Logged Exercises</Text>

            {exercises.map(exercise => {
                // Get date from workout ID instead of exercise date
                const workoutDate = new Date(parseInt(exercise.workoutId));
                const formattedDate = workoutDate.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric'
                });

                // Calculate average weight
                const avgWeight = calculateAvgWeight(exercise.sets);

                return (
                    <TouchableOpacity
                        key={exercise.id}
                        className="bg-discord-card p-4 rounded-xl mb-3 flex-row items-center"
                        onPress={() => onExercisePress && onExercisePress(exercise)}
                    >
                        <View className="bg-discord-accent/10 w-10 h-10 rounded-full items-center justify-center mr-3">
                            <MaterialCommunityIcons name="arm-flex" size={20} color="#5865F2" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-discord-text font-bold">{exercise.name}</Text>
                            <Text className="text-discord-muted text-xs">
                                {exercise.sets.length} sets • {avgWeight} lbs avg
                            </Text>
                        </View>
                        <Text className="text-discord-muted text-sm">{formattedDate}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default RecentExercises;