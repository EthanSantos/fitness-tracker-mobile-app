import React, { useState } from 'react';
import CustomHeader from '../components/Header';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

// Define a type for a single set
type Set = {
    reps: number;
    weight: number;
};

// Define a type for a single exercise
type Exercise = {
    name: string;
    sets: Set[];
};

// Define a type for a single workout
type Workout = {
    date: string; // Format: 'MM/DD/YYYY'
    exercises: Exercise[];
};

type ChartData = { value: number; label: string };

const workoutData: Workout[] = [
    {
        date: '12/20/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 90.0 }, { reps: 8, weight: 110.0 }] },
        ],
    },
    {
        date: '12/21/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 80.0 }, { reps: 8, weight: 100.0 }] },
        ],
    },
    {
        date: '12/22/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 5, weight: 120.0 }, { reps: 4, weight: 140.0 }] },
        ],
    },
    {
        date: '12/23/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 40.0 }, { reps: 8, weight: 50.0 }] },
        ],
    },
    {
        date: '12/24/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 100.0 }, { reps: 6, weight: 120.0 }] },
        ],
    },
    {
        date: '12/25/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 90.0 }, { reps: 6, weight: 110.0 }] },
        ],
    },
    {
        date: '12/26/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 5, weight: 130.0 }, { reps: 4, weight: 150.0 }] },
        ],
    },
    {
        date: '12/27/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 45.0 }, { reps: 6, weight: 55.0 }] },
        ],
    },
    {
        date: '12/28/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 95.0 }, { reps: 8, weight: 115.0 }] },
        ],
    },
    {
        date: '12/29/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 85.0 }, { reps: 8, weight: 105.0 }] },
        ],
    },
    {
        date: '12/30/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 125.0 }, { reps: 4, weight: 145.0 }] },
        ],
    },
    {
        date: '12/31/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 42.5 }, { reps: 8, weight: 52.5 }] },
        ],
    },
    {
        date: '01/01/2025',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 105.0 }, { reps: 6, weight: 125.0 }] },
        ],
    },
    {
        date: '01/02/2025',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 95.0 }, { reps: 6, weight: 115.0 }] },
        ],
    },
    {
        date: '01/03/2025',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 135.0 }, { reps: 4, weight: 155.0 }] },
        ],
    },
    {
        date: '01/04/2025',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 50.0 }, { reps: 6, weight: 60.0 }] },
        ],
    },
    {
        date: '01/05/2025',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 100.0 }, { reps: 8, weight: 120.0 }] },
        ],
    },
    {
        date: '01/06/2025',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 90.0 }, { reps: 8, weight: 110.0 }] },
        ],
    },
    {
        date: '01/07/2025',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 140.0 }, { reps: 4, weight: 160.0 }] },
        ],
    },
    {
        date: '01/08/2025',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 55.0 }, { reps: 6, weight: 65.0 }] },
        ],
    },
];


const Analytics: React.FC = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month'>('week');
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

    const toggleDropdown = (exerciseName: string) => {
        setSelectedExercise((prev) => (prev === exerciseName ? null : exerciseName));
    };

    // Calculate the one-rep max using the Epley formula: weight * (1 + reps / 30)
    const calculateOneRepMax = (weight: number, reps: number): number => {
        return Math.round(weight * (1 + reps / 30));
    };

    const getExerciseChartData = (exerciseName: string): ChartData[] => {
        return workoutData
            .map((workout) => {
                const exercise = workout.exercises.find((e) => e.name === exerciseName); // gets all the exercise data for the exerciseName we are looking for
                if (exercise) {
                    const oneRepMax = Math.max(...exercise.sets.map((set) => calculateOneRepMax(set.weight, set.reps))); // calculates the one rep max for every set that day and gets the highest one
                    const [month, day] = workout.date.split('/');
                    return { value: oneRepMax, label: `${month}/${day}` };
                }
                return { value: 0, label: workout.date };
            })
            .filter((data) => data.value > 0); // Remove dates with 0 weight
    };

    const getTotalExercises = (workouts: Workout[]): number => {
        let count = 0;
        for (const workout of workouts) {
            count += workout.exercises.length;
        }
        return count;
    };

    const getTotalVolume = (workouts: Workout[]): number => {
        let volume = 0;
        for (const workout of workouts) {
            for (const exercise of workout.exercises) {
                for (const set of exercise.sets) {
                    volume += set.weight * set.reps;
                }
            }
        }
        return volume;
    };

    const getChartData = (workouts: Workout[]): ChartData[] => {
        const data: ChartData[] = [];
        for (const workout of workouts) {
            const [month, day] = workout.date.split('/');
            const formattedDate = `${month}/${day}`;

            let totalWeight = 0;
            let totalSets = 0;

            for (const exercise of workout.exercises) {
                for (const set of exercise.sets) {
                    totalWeight += set.weight;
                }
                totalSets += exercise.sets.length;
            }

            const averageWeight = totalSets > 0 ? totalWeight / totalSets : 0;
            // value is the average weight and the label is the date 
            if (averageWeight > 0) {
                data.push({ value: Math.round(averageWeight), label: formattedDate });
            }
        }
        return data;
    };

    const getStrongestLifts = (workouts: Workout[]) => {
        return workouts
            .slice(0, 3)
            .flatMap((workout) =>
                workout.exercises.map((exercise) => {
                    const heaviestSet = exercise.sets.reduce((maxSet, currentSet) => {
                        return currentSet.weight > maxSet.weight ? currentSet : maxSet;
                    }, { weight: 0, reps: 0 }); // Provide a fallback in case `sets` is empty

                    return {
                        name: exercise.name,
                        maxWeight: heaviestSet.weight || 0, // Default to 0 if no weight
                        reps: heaviestSet.reps || 0, // Default to 0 if no reps
                    };
                })
            )
            .sort((a, b) => b.maxWeight - a.maxWeight); // Sort lifts by max weight in descending order
    };

    // Variables calculated using the functions
    const totalExercises = getTotalExercises(workoutData); // Get total number of exercises
    const totalVolume = getTotalVolume(workoutData);       // Get total volume lifted
    const chartData = getChartData(workoutData);           // Get chart data

    // Calculate additional stats
    const totalWorkouts = workoutData.length;

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
                        <Text className="text-discord-text text-sm opacity-80">Volume (lbs)</Text>
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
                        curved={false}
                        maxValue={Math.ceil(Math.max(...chartData.map(data => data.value)) / 10) * 10}
                        initialSpacing={20}
                        spacing={50}
                        hideRules
                        height={200}
                        width={300}
                        areaChart
                        startFillColor="rgb(88, 101, 242)" // Start with transparency
                        startOpacity={0.8}
                        endFillColor="rgb(88, 101, 242)" // End with full transparency
                        endOpacity={0.0}
                        isAnimated
                        animationDuration={1200}
                        showVerticalLines
                    />
                </View>

                {/* Recent Strongest Lifts */}
                < View className="bg-discord-dark p-4 rounded-lg" >
                    <Text className="text-discord-text text-lg font-bold mb-4">Recent Strongest Lifts</Text>
                    {getStrongestLifts(workoutData).map((lift, index) => (
                        <View key={index} className="flex-row justify-between items-center mb-3">
                            <Text className="text-discord-text font-semibold">{lift.name}</Text>
                            <Text className="text-discord-text opacity-80">
                                {lift.maxWeight} lbs @ {lift.reps} reps
                            </Text>
                        </View>
                    ))}
                </ View >


                {/* Exercise Breakdown Dropdown */}
                <View className="bg-discord-dark p-4 rounded-lg mb-6">
                    <Text className="text-discord-text text-lg font-bold mb-4">
                        Exercise Breakdown
                    </Text>
                    {Array.from(new Set(workoutData.flatMap((workout) => workout.exercises.map((e) => e.name))))
                        .map((exerciseName, index) => (
                            <View key={index} className="mb-3">
                                <TouchableOpacity
                                    onPress={() => toggleDropdown(exerciseName)}
                                    className="p-3 bg-discord-accent rounded-md"
                                >
                                    <Text className="text-discord-text font-semibold">{exerciseName}</Text>
                                </TouchableOpacity>
                                {selectedExercise === exerciseName && (
                                    <View className="mt-2 bg-discord-dark p-2 rounded-md">
                                        <Text className="text-discord-text font-bold mb-4">
                                            {exerciseName} 1 Rep Max Over Time
                                        </Text>
                                        <LineChart
                                            data={getExerciseChartData(exerciseName)}
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
                                            curved={false}
                                            maxValue={Math.ceil(Math.max(...getExerciseChartData(exerciseName).map((data) => data.value)) / 10) * 10}
                                            initialSpacing={20}
                                            spacing={50}
                                            hideRules
                                            height={200}
                                            width={300}
                                            areaChart
                                            startFillColor="rgb(88, 101, 242)"
                                            startOpacity={0.8}
                                            endFillColor="rgb(88, 101, 242)"
                                            endOpacity={0.0}
                                            isAnimated
                                            animationDuration={1200}
                                            showVerticalLines
                                        />
                                    </View>
                                )}
                            </View>
                        ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Analytics;
