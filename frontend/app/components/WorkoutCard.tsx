import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

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

type WorkoutCardProps = {
    item: Workout;
    exercises: Record<string, Exercise[]>; // Replace `any` with your Exercise type if defined
    getLatestWorkoutStats: (workoutId: string) => { exerciseCount: number; totalSets: number } | null;
    navigateToWorkout: (workout: Workout) => void;
    handleDeleteWorkout: (workoutId: string, workoutName: string) => void;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({
    item,
    exercises,
    getLatestWorkoutStats,
    navigateToWorkout,
    handleDeleteWorkout,
}) => {
    const stats = getLatestWorkoutStats(item.id);
    const workoutExercises = exercises[item.id] || [];
    const hasExercises = workoutExercises.length > 0;

    return (
        <TouchableOpacity
            className="bg-discord-card rounded-xl mb-3 overflow-hidden border border-discord-card"
            onPress={() => navigateToWorkout(item)}
            activeOpacity={0.7}
        >
            <View className="px-5 py-4">
                {/* Top Row - Name and Delete */}
                <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                        <Text className="text-discord-text text-lg font-bold tracking-tight mb-1">
                            {item.name}
                        </Text>
                        <Text className="text-discord-muted text-sm">
                            {new Date(parseInt(item.id)).toLocaleDateString()}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleDeleteWorkout(item.id, item.name)}
                        className="bg-discord-error/10 rounded-lg p-2"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <AntDesign name="delete" size={18} color="#ED4245" />
                    </TouchableOpacity>
                </View>

                {/* Stats Row */}
                {hasExercises && (
                    <View className="flex-row items-center mt-3 pt-3 border-t border-discord-background/30">
                        <View className="flex-row items-center">
                            <View className="bg-discord-accent/10 w-8 h-8 rounded-lg items-center justify-center mr-2">
                                <MaterialCommunityIcons name="dumbbell" size={18} color="#5865F2" />
                            </View>
                            <Text className="text-discord-text mr-6">
                                {stats?.exerciseCount} exercises
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-discord-accent/10 w-8 h-8 rounded-lg items-center justify-center mr-2">
                                <MaterialCommunityIcons name="timer-outline" size={18} color="#5865F2" />
                            </View>
                            <Text className="text-discord-text">
                                {stats?.totalSets} sets
                            </Text>
                        </View>
                    </View>
                )}

                {!hasExercises && (
                    <View className="mt-3 pt-3 border-t border-discord-background/30">
                        <Text className="text-discord-muted">
                            Tap to add exercises
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default WorkoutCard;
