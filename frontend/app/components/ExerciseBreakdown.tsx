import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type ChartData = {
    value: number;
    label: string;
};

interface Props {
    exercises: string[];
    getExerciseChartData: (exerciseName: string) => ChartData[];
}

const ExerciseGrid: React.FC<Props> = ({
    exercises,
    getExerciseChartData
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const filteredExercises = useMemo(() => {
        if (!searchQuery) return exercises;
        return exercises.filter(ex =>
            ex.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [exercises, searchQuery]);

    const navigateToExerciseChart = (exercise: string) => {
        router.push({
            pathname: '/exercise-chart',
            params: {
                exercise: exercise,
                data: JSON.stringify(getExerciseChartData(exercise))
            },
        });
    };

    const renderExerciseCard = ({ item: exercise }: { item: string }) => {
        const data = getExerciseChartData(exercise);
        console.log(data)
        const latestValue = data[data.length - 1]?.value || 0;
        const previousValue = data[data.length - 2]?.value || 0;
        const percentChange = previousValue ? ((latestValue - previousValue) / previousValue) * 100 : 0;

        return (
            <TouchableOpacity
                onPress={() => navigateToExerciseChart(exercise)}
                className="flex-1 m-2 p-4 bg-discord-card rounded-xl min-w-[45%]"
            >
                <View className="flex-row justify-between items-start">
                    <Text className="text-discord-text font-semibold flex-1" numberOfLines={1}>
                        {exercise}
                    </Text>
                    <View className={`
            ml-2 px-2 py-1 rounded-lg
            ${percentChange >= 0 ? 'bg-green-500/20' : 'bg-discord-error/20'}
          `}>
                        <Text className={`
              text-sm font-medium
              ${percentChange >= 0 ? 'text-green-500' : 'text-discord-error'}
            `}>
                            {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
                        </Text>
                    </View>
                </View>
                <Text className="text-discord-muted text-sm mt-2">
                    Last: {latestValue} lbs
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-discord-background">
            {/* Search Header */}
            <View className="p-4 border-b border-discord-card">
                <View className="flex-row items-center bg-discord-card rounded-lg px-4 py-2">
                    <MaterialIcons name="search" size={20} color="#72767D" />
                    <TextInput
                        className="flex-1 ml-2 text-discord-text"
                        placeholder="Search exercises..."
                        placeholderTextColor="#72767D"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <MaterialIcons name="close" size={20} color="#72767D" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Exercise Grid */}
            <FlatList
                data={filteredExercises}
                renderItem={renderExerciseCard}
                keyExtractor={(item) => item}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'flex-start' }}
                className="flex-1"
                contentContainerStyle={{ padding: 6 }}
            />
        </View>
    );
};


export default ExerciseGrid;