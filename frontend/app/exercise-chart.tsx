import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ChartContainer from './components/ChartContainer';
import CustomHeader from './components/Header';

import { ChartData } from './types';

const ExerciseChart: React.FC = () => {
    const { exercise, data } = useLocalSearchParams();
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

    function dateComparison(a: ChartData, b: ChartData) {
        const [monthA, dayA] = a.label.split('/').map(Number);
        const [monthB, dayB] = b.label.split('/').map(Number);
    
        // Compare months first, then days
        return monthB - monthA || dayB - dayA;
    }

    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(data as string);
                setChartData(parsedData);
                console.log(parsedData)
            } catch (error) {
                console.error('Error parsing chart data:', error);
            }
        }
    }, [data]);

    if (!exercise || !data) {
        return (
            <View className="flex-1 items-center justify-center bg-discord-background">
                <Text className="text-discord-text">No workout data available.</Text>
            </View>
        );
    }

    const latestValue = chartData[chartData.length - 1]?.value;
    const earliestValue = chartData[0]?.value;
    const personalRecord = Math.max(...chartData.map(item => item.value));
    const totalChange = latestValue && earliestValue ? latestValue - earliestValue : 0;
    const percentageChange = latestValue && earliestValue ? ((latestValue - earliestValue) / earliestValue * 100).toFixed(2) : 0;

    return (
        <View className="flex-1 bg-discord-background">
            <CustomHeader
                title={exercise as string}
                onBack={() => router.back()}
            />
            <ScrollView className="flex-1 px-4 pt-4">
                <View className="bg-discord-card rounded-lg p-4 mb-4">
                    <Text className="text-discord-text text-xl font-bold mb-4">{exercise} 1RM Progress</Text>
                    <ChartContainer data={chartData} key={JSON.stringify(chartData)} />
                </View>
                <View className="bg-discord-card rounded-lg p-4 mb-4">
                    <Text className="text-discord-text text-lg font-semibold mb-4">Workout Stats</Text>
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-discord-muted">Personal Record (1RM):</Text>
                        <Text className="text-green-500 font-bold">{personalRecord} lbs</Text>
                    </View>
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-discord-muted">Latest 1RM:</Text>
                        <Text className="text-discord-text font-bold">{latestValue} lbs</Text>
                    </View>
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-discord-muted">Starting 1RM:</Text>
                        <Text className="text-discord-text font-bold">{earliestValue} lbs</Text>
                    </View>
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-discord-muted">Total Strength Gain:</Text>
                        <Text className={`font-bold ${totalChange >= 0 ? 'text-discord-accent' : 'text-discord-error'}`}>
                            {totalChange >= 0 ? '+' : ''}{totalChange} lbs
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-discord-muted">Strength Improvement:</Text>
                        <Text className={`font-bold ${Number(percentageChange) >= 0 ? 'text-discord-accent' : 'text-discord-error'}`}>
                            {Number(percentageChange) >= 0 ? '+' : ''}{percentageChange}%
                        </Text>
                    </View>
                </View>
                <View className="bg-discord-card rounded-lg overflow-hidden mb-4">
                    <TouchableOpacity 
                        className="flex-row justify-between items-center p-4" 
                        onPress={() => setIsHistoryExpanded(!isHistoryExpanded)}
                    >
                        <Text className="text-discord-text text-lg font-semibold">Workout History</Text>
                        <Ionicons 
                            name={isHistoryExpanded ? "chevron-up" : "chevron-down"} 
                            size={24} 
                            color="#DCDDDE" 
                        />
                    </TouchableOpacity>
                    {isHistoryExpanded && (
                        <View className="p-4 pt-0">
                            <View className="border-b border-discord-muted pb-2 mb-2">
                                <View className="flex-row justify-between">
                                    <Text className="text-discord-muted font-semibold">Date</Text>
                                    <Text className="text-discord-muted font-semibold">1RM (lbs)</Text>
                                </View>
                            </View>
                            {chartData.sort(dateComparison).map((item, index) => (
                                <View key={index} className="flex-row justify-between py-2">
                                    <Text className="text-discord-text">{item.label}</Text>
                                    <Text className="text-discord-text font-bold">{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default ExerciseChart;

