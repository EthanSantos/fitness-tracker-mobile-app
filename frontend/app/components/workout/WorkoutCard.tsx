import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Set } from '@/app/types';

type Workout = {
    id: string;
    name: string;
};

type Exercise = {
    id: string;
    name: string;
    sets: Set[];
    date: string;
}

type WorkoutCardProps = {
    item: Workout;
    exercises: Record<string, Exercise[]>;
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

    // Animation for press feedback
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const getTotalWeight = () => {
        return workoutExercises.reduce((total, exercise) => {
            return total + exercise.sets.reduce((setTotal, set) => setTotal + set.weight * set.reps, 0);
        }, 0);
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                className="bg-discord-card rounded-2xl mb-4 overflow-hidden border border-discord-card shadow-sm"
                onPress={() => navigateToWorkout(item)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <View className="px-5 py-4">
                    {/* Top Row - Name and Delete */}
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                            <Text className="text-discord-text text-xl font-bold tracking-tight mb-1">
                                {item.name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleDeleteWorkout(item.id, item.name)}
                            className="bg-discord-error/10 rounded-lg p-2.5"
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <AntDesign name="delete" size={20} color="#ED4245" />
                        </TouchableOpacity>
                    </View>

                    {/* Stats Row */}
                    {hasExercises ? (
                        <View className="flex-row items-center mt-4 pt-4 border-t border-discord-background/30">
                            <View className="flex-1 flex-row items-center">
                                <View className="bg-discord-accent/10 w-10 h-10 rounded-xl items-center justify-center mr-3">
                                    <MaterialCommunityIcons name="dumbbell" size={20} color="#5865F2" />
                                </View>
                                <View>
                                    <Text className="text-discord-text font-bold text-lg">
                                        {stats?.exerciseCount}
                                    </Text>
                                    <Text className="text-discord-muted text-sm">
                                        Exercises
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-1 flex-row items-center">
                                <View className="bg-discord-accent/10 w-10 h-10 rounded-xl items-center justify-center mr-3">
                                    <MaterialCommunityIcons name="timer-outline" size={20} color="#5865F2" />
                                </View>
                                <View>
                                    <Text className="text-discord-text font-bold text-lg">
                                        {stats?.totalSets}
                                    </Text>
                                    <Text className="text-discord-muted text-sm">
                                        {stats?.totalSets === 1 ? "Set" : "Sets"}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-1 flex-row items-center">
                                <View className="bg-discord-accent/10 w-10 h-10 rounded-xl items-center justify-center mr-3">
                                    <MaterialCommunityIcons name="weight" size={20} color="#5865F2" />
                                </View>
                                <View>
                                    <Text className="text-discord-text font-bold text-lg">
                                        {getTotalWeight()} lbs
                                    </Text>
                                    <Text className="text-discord-muted text-sm">
                                        Total Weight
                                    </Text>
                                </View>
                            </View>
                        </View>

                    ) : (
                        <View className="mt-4 pt-4 border-t border-discord-background/30">
                            <View className="flex-row items-center justify-center bg-discord-accent/5 py-3 px-4 rounded-xl">
                                <Ionicons name="add-circle-outline" size={20} color="#5865F2" />
                                <Text className="text-discord-accent font-medium ml-2">
                                    Tap to add exercises
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default WorkoutCard;
