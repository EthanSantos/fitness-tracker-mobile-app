import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Set, Exercise } from '@/app/types';
import { findBestSetIndex, calculateAvgWeight } from '@/app/utils/fitness';
import ExerciseCard from './ExerciseCard';

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
                return (
                    <ExerciseCard item={item} handleExerciseSelect={handleExerciseSelect} handleDeleteExercise={handleDeleteExercise}/>
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