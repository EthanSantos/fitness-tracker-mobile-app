import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

type Exercise = {
    id: string;
    name: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

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
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="bg-discord-card rounded-lg p-4 mb-4 active:opacity-90"
                    onPress={() => handleExerciseSelect(item)}
                    activeOpacity={0.9}
                >
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-3">
                        <View>
                            <Text className="text-lg font-semibold text-discord-text leading-tight">
                                {item.name}
                            </Text>
                            <Text className="text-base text-discord-muted mt-1">
                                {item.date}
                            </Text>
                        </View>
                        <TouchableOpacity
                            className="bg-discord-error/10 rounded-lg p-2"
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            onPress={() => handleDeleteExercise(item.id, item.name)}
                        >
                            <AntDesign name="delete" size={18} color="#ED4245" />
                        </TouchableOpacity>
                    </View>

                    {/* Sets Section */}
                    <View className="bg-discord-extraCard rounded-md px-3 py-2">
                        {item.sets.length > 0 ? (
                            item.sets.map((set, index) => (
                                <View
                                    key={index}
                                    className="flex-row justify-between items-center py-2"
                                >
                                    <Text className="text-base font-medium text-discord-text">
                                        Set {index + 1}
                                    </Text>
                                    <Text className="text-base text-discord-accent font-semibold">
                                        {set.reps} reps @ {set.weight} lbs
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <View className="flex-row items-center justify-center py-1 px-2 rounded-xl">
                                <Ionicons name="add-circle-outline" size={20} color="#5865F2" />
                                <Text className="text-discord-accent font-medium ml-2">
                                    Tap to add a set
                                </Text>
                            </View>
                        )}
                    </View>


                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
                <Text className="text-discord-muted text-center mt-6 text-lg">
                    No exercises logged yet. Start adding your first exercise!
                </Text>
            }
        />
    );
};

export default ExerciseList;
