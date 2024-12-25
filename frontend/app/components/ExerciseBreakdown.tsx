import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

type ChartData = {
    value: number;
    label: string;
};

interface Props {
    exercises: string[];
    getExerciseChartData: (exerciseName: string) => ChartData[];
}

const ExerciseGrid: React.FC<Props> = ({ exercises, getExerciseChartData }) => {
    const router = useRouter();

    const navigateToExerciseChart = (exercise: string) => {
        router.push({
            pathname: '/exercise-chart',
            params: {
                exercise: exercise,
                data: JSON.stringify(getExerciseChartData(exercise)),
            },
        });
    };

    const renderExerciseCard = ({ item: exercise }: { item: string }) => {
        const data = getExerciseChartData(exercise);

        // Calculate max value
        const maxValue = Math.max(...data.map(item => item.value));

        // Calculate percent change from the last two entries
        const latestValue = data[data.length - 1]?.value || 0;
        const previousValue = data[data.length - 2]?.value || 0;
        const percentChange = previousValue
            ? ((latestValue - previousValue) / previousValue) * 100
            : 0;

        return (
            <TouchableOpacity
                onPress={() => navigateToExerciseChart(exercise)}
                className="flex-1 m-2 p-4 bg-discord-card rounded-lg min-w-[45%]"
            >
                <View className="flex-1">
                    <Text
                        className="text-discord-text font-bold text-base leading-5 flex-1"
                        numberOfLines={2}
                    >
                        {exercise}
                    </Text>
                    <Text className="text-discord-muted font-medium text-sm mt-2">
                        Max: {maxValue} lbs
                    </Text>
                </View>
                <View className={`absolute bottom-2 right-2 px-2 py-1 rounded-lg  ${percentChange >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <Text
                        className={`text-xs font-semibold ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                    >
                        {percentChange > 0 ? '+' : ''}
                        {percentChange.toFixed(1)}%
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-discord-background">
            {/* Exercise Grid */}
            <View className="px-4">
                <Text className="text-discord-text text-2xl font-bold mb-4">Exercise Breakdown</Text>
            </View>
            <View className="px-2">
                <FlatList
                    data={exercises}
                    renderItem={renderExerciseCard}
                    keyExtractor={(item) => item}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingBottom: 8 }}
                    className="flex-1"
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-discord-muted text-base">
                                No exercises available. Start tracking your progress!
                            </Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
};

export default ExerciseGrid;
