import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import "../../global.css";

type Exercise = {
    id: string;
    name: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

type ExerciseListProps = {
    exercises: Exercise[];
    handleExerciseSelect: (item: Exercise) => void;
    handleDeleteExercise: (id: string) => void;
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
                <View className="flex-row justify-between items-center p-4 bg-discord-card rounded-md mb-3">
                    <TouchableOpacity
                        className="flex-1"
                        onPress={() => handleExerciseSelect(item)}
                    >
                        <View>
                            <Text className="text-lg font-medium text-discord-text">
                                {item.name}
                            </Text>
                            <Text className="text-sm text-discord-muted">{item.date}</Text>
                        </View>
                        <Text className="text-sm text-discord-accent">
                            {item.sets.length} {item.sets.length === 1 ? 'set' : 'sets'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="ml-4 bg-discord-error rounded-md px-2 py-2 active:opacity-80"
                        onPress={() => handleDeleteExercise(item.id)}
                    >
                        <AntDesign name="minus" size={24} color="white" />
                    </TouchableOpacity>
                </View>
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
