import React, { useState } from 'react';
import CustomHeader from '../components/Header';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const Analytics: React.FC = () => {
    // Mock workout data with multiple days
    const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month'>('week');
    const workoutData = [
        {
            date: '12/20/2024',
            exercises: [
                { name: 'Lateral Raise', sets: [{ reps: 12, weight: 20.0 }, { reps: 10, weight: 25.0 }] },
                { name: 'Shoulder Press', sets: [{ reps: 8, weight: 40.0 }, { reps: 6, weight: 50.0 }] },
            ],
        },
        {
            date: '12/21/2024',
            exercises: [
                { name: 'Squat', sets: [{ reps: 10, weight: 80.0 }, { reps: 8, weight: 100.0 }] },
                { name: 'Leg Press', sets: [{ reps: 12, weight: 200.0 }, { reps: 10, weight: 220.0 }] },
            ],
        },
        {
            date: '12/22/2024',
            exercises: [
                { name: 'Deadlift', sets: [{ reps: 5, weight: 120.0 }, { reps: 4, weight: 140.0 }] },
                { name: 'Bent-over Row', sets: [{ reps: 8, weight: 60.0 }, { reps: 6, weight: 70.0 }] },
            ],
        },
        {
            date: '12/23/2024',
            exercises: [
                { name: 'Bench Press', sets: [{ reps: 10, weight: 100.0 }, { reps: 8, weight: 110.0 }] },
                { name: 'Incline Dumbbell Press', sets: [{ reps: 12, weight: 40.0 }, { reps: 10, weight: 45.0 }] },
            ],
        },
        {
            date: '12/24/2024',
            exercises: [
                { name: 'Pull-ups', sets: [{ reps: 10, weight: 0 }, { reps: 8, weight: 160 }] },
                { name: 'Chin-ups', sets: [{ reps: 8, weight: 0 }, { reps: 6, weight: 160 }] },
            ],
        },
        {
            date: '12/25/2024',
            exercises: [
                { name: 'Shoulder Press', sets: [{ reps: 10, weight: 0 }, { reps: 8, weight: 100 }] },
                { name: 'Dips', sets: [{ reps: 8, weight: 0 }, { reps: 6, weight: 200 }] },
            ],
        },
    ];

    // Calculate additional stats
    const totalWorkouts = workoutData.length;
    const totalExercises = workoutData.reduce((sum, workout) =>
        sum + workout.exercises.length, 0
    );
    const totalVolume = workoutData.reduce((sum, workout) =>
        sum + workout.exercises.reduce((exerciseSum, exercise) =>
            exerciseSum + exercise.sets.reduce((setSum, set) =>
                setSum + (set.weight * set.reps), 0
            ), 0
        ), 0
    );

    const chartData = workoutData.map((workout) => {
        const [month, day] = workout.date.split('/'); // Split the date into components
        const formattedDate = `${month}/${day}`; // Format as month/day
        const totalWeight = workout.exercises.reduce((sum, exercise) => {
            return sum + exercise.sets.reduce((setSum, set) => setSum + set.weight, 0);
        }, 0);
        const totalSets = workout.exercises.reduce((sum, exercise) => sum + exercise.sets.length, 0);
        const averageWeight = totalSets > 0 ? totalWeight / totalSets : 0;
        return { value: Math.round(averageWeight), label: formattedDate };
    });

    return (
        <ScrollView className="flex-1 bg-discord-background">
            <CustomHeader title="Analytics" titleAlign="center" />

            {/* Main Content Container */}
            <View className="px-4">
                {/* Stats Cards */}
                <View className="flex-row justify-between mb-6">
                    <View className="bg-discord-dark p-4 rounded-lg flex-1 mr-2">
                        <Text className="text-discord-text text-sm opacity-80">Workouts</Text>
                        <Text className="text-discord-text text-xl font-bold">{totalWorkouts}</Text>
                    </View>
                    <View className="bg-discord-dark p-4 rounded-lg flex-1 mx-2">
                        <Text className="text-discord-text text-sm opacity-80">Exercises</Text>
                        <Text className="text-discord-text text-xl font-bold">{totalExercises}</Text>
                    </View>
                    <View className="bg-discord-dark p-4 rounded-lg flex-1 ml-2">
                        <Text className="text-discord-text text-sm opacity-80">Volume</Text>
                        <Text className="text-discord-text text-xl font-bold">{Math.round(totalVolume)}</Text>
                    </View>
                </View>

                {/* Timeframe Selector */}
                <View className="flex-row mb-6 bg-discord-dark rounded-lg p-1">
                    <TouchableOpacity
                        onPress={() => setSelectedTimeframe('week')}
                        className={`flex-1 p-2 rounded-md ${selectedTimeframe === 'week' ? 'bg-discord-accent' : ''}`}
                    >
                        <Text className={`text-center text-discord-text ${selectedTimeframe === 'week' ? 'font-bold' : 'opacity-80'}`}>
                            Week
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedTimeframe('month')}
                        className={`flex-1 p-2 rounded-md ${selectedTimeframe === 'month' ? 'bg-discord-accent' : ''}`}
                    >
                        <Text className={`text-center text-discord-text ${selectedTimeframe === 'month' ? 'font-bold' : 'opacity-80'}`}>
                            Month
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Chart Container */}
                <View className="bg-discord-dark p-4 rounded-lg mb-6">
                    <Text className="text-discord-text text-lg font-bold mb-4">
                        Average Weight Per Session
                    </Text>
                    <LineChart
                        data={chartData}
                        thickness={3}
                        color="#5865F2"
                        hideDataPoints={false}
                        dataPointsColor="#5865F2"
                        dataPointsRadius={5}
                        yAxisColor="rgba(220, 221, 222, 0.2)"
                        xAxisColor="rgba(220, 221, 222, 0.2)"
                        verticalLinesColor="rgba(220, 221, 222, 0.1)"
                        yAxisTextStyle={{ color: '#DCDDDE', fontSize: 12 }}
                        xAxisLabelTextStyle={{ color: '#DCDDDE', fontSize: 12 }}
                        noOfSections={4}
                        curved
                        maxValue={Math.ceil(Math.max(...chartData.map(data => data.value)) / 10) * 10}
                        initialSpacing={20}
                        spacing={50}
                        hideRules
                        height={200}
                        width={300}
                    />
                </View>

                {/* Recent Strongest Lifts */}
                <View className="bg-discord-dark p-4 rounded-lg mb-6">
                    <Text className="text-discord-text text-lg font-bold mb-4">Recent Strongest Lifts</Text>
                    {workoutData.slice(0, 2).flatMap((workout) =>
                        workout.exercises.map((exercise) => {
                            const heaviestSet = exercise.sets.reduce((maxSet, currentSet) =>
                                currentSet.weight > maxSet.weight ? currentSet : maxSet
                            );
                            return {
                                name: exercise.name,
                                maxWeight: heaviestSet.weight,
                                reps: heaviestSet.reps,
                            };
                        })
                    )
                        .sort((a, b) => b.maxWeight - a.maxWeight) // Sort by max weight in descending order
                        .map((lift, index) => (
                            <View key={index} className="flex-row justify-between items-center mb-3">
                                <Text className="text-discord-text font-semibold">{lift.name}</Text>
                                <Text className="text-discord-text opacity-80">
                                    {lift.maxWeight} lbs @ {lift.reps} reps
                                </Text>
                            </View>
                        ))}
                </View>

            </View>
        </ScrollView>
    );
};

export default Analytics;