import React from 'react';
import { FlatList } from 'react-native';
import { Exercise } from '@/app/types';
import ExerciseCard from './ExerciseCard';
import EmptyExerciseList from './EmptyExerciseList';

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
                    <ExerciseCard item={item} handleExerciseSelect={handleExerciseSelect} handleDeleteExercise={handleDeleteExercise} />
                );
            }}
            keyExtractor={item => item.id}
            ListEmptyComponent={EmptyExerciseList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
};

export default ExerciseList;