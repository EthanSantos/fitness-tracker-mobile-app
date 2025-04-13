import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Set, Exercise } from '@/app/types';
import { findBestSetIndex, calculateAvgWeight } from '@/app/utils/fitness';

type ExerciseListProps = {
    exercises: Exercise[];
    handleExerciseSelect: (item: Exercise) => void;
    handleDeleteExercise: (id: string, name: string) => void;
};

const ExerciseList: React.FC<ExerciseListProps> = ({
    exercises,
    handleExerciseSelect,
    handleDeleteExercise,
}) => {
    
    return (
        <FlatList
            data={exercises}
            renderItem={({ item }) => {
                const bestSetIndex = findBestSetIndex(item.sets);
                
                return (
                    <View className="mb-5">
                        <TouchableOpacity
                            onPress={() => handleExerciseSelect(item)}
                            activeOpacity={0.9}
                            className="bg-discord-extraCard rounded-xl overflow-hidden"
                        >
                            {/* Top section with name and delete */}
                            <View className="bg-discord-card px-5 pt-5 pb-4">
                                <View className="flex-row justify-between items-start">
                                    <View className="flex-1 mr-3">
                                        <Text className="text-xl font-bold text-discord-text">
                                            {item.name}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleDeleteExercise(item.id, item.name)}
                                        className="bg-discord-error/10 rounded-xl h-9 w-9 items-center justify-center"
                                    >
                                        <Ionicons name="trash-outline" size={16} color="#ED4245" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            {/* Stats row */}
                            {item.sets.length > 0 && (
                                <View className="px-5 py-4 flex-row justify-between items-center bg-discord-card/30">
                                    <View className="items-center">
                                        <Text className="text-discord-muted text-xs uppercase">Sets</Text>
                                        <Text className="text-discord-text text-lg font-semibold">{item.sets.length}</Text>
                                    </View>
                                    
                                    <View className="h-8 w-px bg-discord-border/20" />
                                    
                                    <View className="items-center flex-1 px-2">
                                        <Text className="text-discord-muted text-xs uppercase whitespace-nowrap">Max Weight</Text>
                                        <Text className="text-discord-text text-lg font-semibold">
                                            {Math.max(...item.sets.map(s => s.weight))} lbs
                                        </Text>
                                    </View>
                                    
                                    <View className="h-8 w-px bg-discord-border/20" />
                                    
                                    <View className="items-center">
                                        <Text className="text-discord-muted text-xs uppercase">Avg Weight</Text>
                                        <Text className="text-discord-text text-lg font-semibold">
                                            {calculateAvgWeight(item.sets)} lbs
                                        </Text>
                                    </View>
                                </View>
                            )}
                            
                            {/* Sets listing */}
                            <View className="p-5">
                                {item.sets.length > 0 ? (
                                    <View>
                                        {item.sets.map((set, index) => (
                                            <View key={index} className={`mb-4 ${index === item.sets.length - 1 ? '' : 'pb-4 border-b border-discord-card/40'}`}>
                                                <View className="flex-row items-center justify-between">
                                                    <View className="flex-row items-center">
                                                        <View className="bg-discord-accent rounded-xl h-8 w-8 items-center justify-center mr-3">
                                                            <Text className="text-white text-sm font-bold">{index + 1}</Text>
                                                        </View>
                                                        <Text className="text-discord-text font-semibold">Set {index + 1}</Text>
                                                        
                                                        {/* Best Set Badge */}
                                                        {index === bestSetIndex && (
                                                            <View className="bg-green-600 ml-2 px-2 py-0.5 rounded-lg">
                                                                <Text className="text-white text-xs font-bold">BEST SET</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <View className="flex-row">
                                                        <View className="bg-discord-card px-3 py-2 rounded-xl mr-2">
                                                            <Text className="text-discord-text font-medium">{set.reps} reps</Text>
                                                        </View>
                                                        <View className="bg-discord-card px-3 py-2 rounded-xl">
                                                            <Text className="text-discord-text font-medium">{set.weight} lbs</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <View className="py-3 flex-row items-center justify-center">
                                        <View className="bg-discord-card/50 rounded-lg px-4 py-2.5 flex-row items-center">
                                            <Ionicons name="add-circle-outline" size={18} color="#5865F2" />
                                            <Text className="text-discord-accent text-sm font-medium ml-2">
                                                Add your first set
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }}
            keyExtractor={item => item.id}
            ListEmptyComponent={
                <View className="items-center justify-center py-12 px-6 bg-discord-card rounded-xl">
                    <Ionicons name="barbell-outline" size={36} color="#5865F2" />
                    <Text className="text-discord-text text-lg font-semibold mt-3 mb-1 text-center">
                        Ready to start training?
                    </Text>
                    <Text className="text-discord-muted text-center text-sm px-4">
                        Add your first exercise to begin tracking your workout progress
                    </Text>
                </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
};

export default ExerciseList;