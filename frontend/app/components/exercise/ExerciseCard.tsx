import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Exercise } from '@/app/types';
import { findBestSetIndex, calculateAvgWeight } from '@/app/utils/fitness';

type ExerciseCardProps = {
    item: Exercise;
    handleExerciseSelect: (item: Exercise) => void;
    handleDeleteExercise: (id: string, name: string) => void;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({
    item, handleDeleteExercise, handleExerciseSelect
}) => {
    // Find the best set index
    const bestSetIndex = findBestSetIndex(item.sets);
    
    // Animation for press feedback (matching WorkoutCard behavior)
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

    const hasNoSets = item.sets.length === 0;

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }} className="mb-4">
            <TouchableOpacity
                onPress={() => handleExerciseSelect(item)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
                className="bg-discord-card rounded-2xl overflow-hidden border border-discord-card shadow-sm"
            >
                {/* Top section with name and delete */}
                <View className="px-5 py-4">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-1 mr-3">
                            <Text className="text-discord-text text-xl font-bold tracking-tight">
                                {item.name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleDeleteExercise(item.id, item.name)}
                            className="bg-discord-error/10 rounded-lg p-2.5"
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="trash-outline" size={20} color="#ED4245" />
                        </TouchableOpacity>
                    </View>

                    {/* Stats row - Only show if there are sets */}
                    {!hasNoSets && (
                        <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-discord-background/30">
                            <View className="flex-row items-center">
                                <View className="bg-discord-accent/10 w-9 h-9 rounded-xl items-center justify-center mr-2">
                                    <Ionicons name="layers-outline" size={18} color="#5865F2" />
                                </View>
                                <View>
                                    <Text className="text-discord-text font-bold text-base">
                                        {item.sets.length}
                                    </Text>
                                    <Text className="text-discord-muted text-xs">
                                        {item.sets.length === 1 ? "Set" : "Sets"}
                                    </Text>
                                </View>
                            </View>
                            
                            <View className="flex-row items-center">
                                <View className="bg-discord-accent/10 w-9 h-9 rounded-xl items-center justify-center mr-2">
                                    <MaterialCommunityIcons name="weight" size={18} color="#5865F2" />
                                </View>
                                <View>
                                    <Text className="text-discord-text font-bold text-base">
                                        {Math.max(...item.sets.map(s => s.weight))}
                                    </Text>
                                    <Text className="text-discord-muted text-xs">
                                        Max (lbs)
                                    </Text>
                                </View>
                            </View>
                            
                            <View className="flex-row items-center">
                                <View className="bg-discord-accent/10 w-9 h-9 rounded-xl items-center justify-center mr-2">
                                    <MaterialCommunityIcons name="calculator-variant-outline" size={18} color="#5865F2" />
                                </View>
                                <View>
                                    <Text className="text-discord-text font-bold text-base">
                                        {calculateAvgWeight(item.sets)}
                                    </Text>
                                    <Text className="text-discord-muted text-xs">
                                        Avg (lbs)
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Sets or Add Set CTA */}
                    {hasNoSets ? (
                        <View className="mt-4 pt-4 border-t border-discord-background/30">
                            <TouchableOpacity 
                                className="flex-row items-center justify-center py-3 px-4 bg-discord-accent/10 rounded-xl"
                                onPress={() => handleExerciseSelect(item)}
                            >
                                <Ionicons name="add-circle-outline" size={20} color="#5865F2" />
                                <Text className="text-discord-accent font-medium ml-2">
                                    Tap to add your first set
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="mt-4">

                            
                            {/* Sets listing */}
                            {item.sets.map((set, index) => (
                                <View 
                                    key={index} 
                                    className={`flex-row items-center justify-between py-3 ${
                                        index !== item.sets.length - 1 ? 'border-b border-discord-background/20' : ''
                                    }`}
                                >
                                    <View className="flex-row items-center">
                                        <View className={`${index === bestSetIndex ? 'bg-green-600' : 'bg-discord-accent/20'} w-8 h-8 rounded-lg items-center justify-center mr-3`}>
                                            <Text className={`${index === bestSetIndex ? 'text-white' : 'text-discord-accent'} font-bold text-sm`}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        
                                        {index === bestSetIndex && (
                                            <View className="bg-green-600/10 px-2 py-1 rounded-md">
                                                <Text className="text-green-600 text-xs font-bold">BEST SET</Text>
                                            </View>
                                        )}
                                    </View>
                                    
                                    <View className="flex-row items-center">
                                        <View className="bg-discord-background px-3 py-1.5 rounded-lg mr-2">
                                            <Text className="text-discord-text font-medium text-sm">{set.reps} reps</Text>
                                        </View>
                                        <View className="bg-discord-background px-3 py-1.5 rounded-lg">
                                            <Text className="text-discord-text font-medium text-sm">{set.weight} lbs</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                            
                            {/* Add another set button - Now with transparent background */}
                            <TouchableOpacity 
                                className="flex-row items-center justify-center mt-4 py-3 bg-discord-accent/10 rounded-xl"
                                onPress={() => handleExerciseSelect(item)}
                            >
                                <Ionicons name="add-circle-outline" size={20} color="#5865F2" />
                                <Text className="text-discord-accent font-medium ml-2">
                                    Add another set
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default ExerciseCard;