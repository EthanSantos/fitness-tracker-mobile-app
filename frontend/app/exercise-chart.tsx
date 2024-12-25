import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import ChartContainer from './components/ChartContainer';
import CustomHeader from './components/Header';

type ChartData = { value: number; label: string };

const ExerciseChart: React.FC = () => {
    const { exercise, data } = useLocalSearchParams();
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(data as string);
                setChartData(parsedData);
            } catch (error) {
                console.error('Error parsing chart data:', error);
            }
        }
    }, [data]);

    if (!exercise || !data) {
        // shouldn't happen, but in the case that it does
        return (
            <View className="flex-1 items-center justify-center bg-discord-background">
                <Text className="text-discord-muted">No data available.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-discord-background">
            <CustomHeader
                title={exercise as string}
                onBack={() => router.back()}
            />
            <View className="flex-1 p-4">
                <ChartContainer title={exercise + " One Rep Max"} data={chartData} key={JSON.stringify(chartData)} />
            </View>
        </View>
    );
};

export default ExerciseChart;
