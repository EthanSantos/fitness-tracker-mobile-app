import React, { useState, useEffect } from 'react';
import CustomHeader from '../components/ui/Header';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ChartContainer from '../components/ui/ChartContainer';
import ExerciseBreakdown from '../components/analytics/ExerciseBreakdown';
import StatsCard from '../components/analytics/StatsCard';
import StrongestLifts from '../components/analytics/StrongestLifts';
import TimeframeSelector from '../components/analytics/TimeframeSelector';

import { Workout, ChartData, WorkoutData } from '../types';

import { calculateOneRepMax } from '../utils/fitness';

const Analytics: React.FC = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week'>('day');
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load workout data from AsyncStorage
    useEffect(() => {
        const loadWorkoutData = async () => {
            try {
                setIsLoading(true);
                const savedData = await AsyncStorage.getItem('workout-data');
                if (savedData) {
                    const parsedData: WorkoutData = JSON.parse(savedData);
                    setWorkouts(parsedData.workouts || []);
                }
            } catch (error) {
                console.error('Error loading workout data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadWorkoutData();
    }, []);

    function parseDate(dateString: string): Date {
        // parse data in the correct date format
        const [month, day, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    }

    const getExerciseChartData = (exerciseName: string): ChartData[] => {
        // Extract exercises with the matching name from each workout
        const exerciseData = [...workouts]
            .map((workout) => {
                const exercise = workout.exercises.find((e) => e.name === exerciseName);
                if (exercise) {
                    const oneRepMax = Math.max(...exercise.sets.map((set) => calculateOneRepMax(set.weight, set.reps)));
                    const [week, day] = workout.date.split('/');
                    return { 
                        value: oneRepMax, 
                        label: `${week}/${day}`,
                        date: parseDate(workout.date)
                    };
                }
                return { 
                    value: 0, 
                    label: workout.date,
                    date: parseDate(workout.date)
                };
            })
            .filter((data) => data.value > 0); // Remove dates with 0 weight
            
        // Sort by date (oldest to newest)
        return exerciseData
            .sort((a, b) => a.date.valueOf() - b.date.valueOf())
            .map(({ value, label }) => ({ value, label })); // Remove the date property
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

    const getChartData = (workouts: Workout[], selectedTimeframe: 'day' | 'week'): ChartData[] => {
        // Use the exact same calculation logic, just change the sorting
        const groupedData: { [key: string]: { totalWeight: number; totalSets: number; date: Date } } = {};

        // Collect data and grouping by day/week with the original calculation logic
        for (const workout of workouts) {
            const [month, day, year] = workout.date.split('/');
            const date = new Date(`${year}-${month}-${day}`);

            let key = '';
            if (selectedTimeframe === 'day') {
                // Use the date as-is (formatted as MM/DD)
                key = `${month}/${day}`;
            } else if (selectedTimeframe === 'week') {
                // Get the week number
                const startOfWeek = new Date(date);
                startOfWeek.setDate(date.getDate() - date.getDay()); // Set to Sunday of the current week
                const formattedMonth = startOfWeek.toLocaleString('en-US', { month: 'short' });
                const formattedDay = startOfWeek.getDate();
                key = `${formattedMonth} ${formattedDay}`; // Format as "MMM DD"
            }

            if (!groupedData[key]) {
                groupedData[key] = { totalWeight: 0, totalSets: 0, date: date };
            }

            for (const exercise of workout.exercises) {
                for (const set of exercise.sets) {
                    groupedData[key].totalWeight += set.weight;
                }
                groupedData[key].totalSets += exercise.sets.length;
            }
        }

        // Calculate the same averages as before
        const dataWithDates = [];
        for (const [key, { totalWeight, totalSets, date }] of Object.entries(groupedData)) {
            const averageWeight = totalSets > 0 ? totalWeight / totalSets : 0;
            if (averageWeight > 0) {
                dataWithDates.push({ 
                    value: Math.round(averageWeight), // Same rounding as before
                    label: key,
                    date: date // Store date for sorting
                });
            }
        }

        // Sort chronologically (oldest to newest)
        return dataWithDates
            .sort((a, b) => a.date.valueOf() - b.date.valueOf())
            .map(({ value, label }) => ({ value, label })); // Return just value and label
    };

    const getStrongestLifts = (workouts: Workout[]) => {
        return workouts
            .sort((a, b) => new Date(parseInt(b.id)).getTime() - new Date(parseInt(a.id)).getTime()) // Sort by date descending
            .slice(0, 5) // Get the most recent 5 workouts
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
            .sort((a, b) => b.maxWeight - a.maxWeight) // Sort lifts by max weight in descending order
            .slice(0, 5); // Keep only the top 5 heaviest lifts
    };

    // Variables calculated using the functions
    const totalExercises = getTotalExercises(workouts); // Get total number of exercises
    const totalVolume = getTotalVolume(workouts);       // Get total volume lifted
    const strongestLifts = getStrongestLifts(workouts);
    const chartData = getChartData(workouts, selectedTimeframe);           // Get chart data

    // Calculate additional stats
    const totalWorkouts = workouts.length;

    const uniqueExercises = Array.from(new Set(workouts.flatMap((workout) => workout.exercises.map((e) => e.name)))) // get a list of all the unique exercises

    const renderItem = () => null;
    
    if (isLoading) {
        return (
            <View className="flex-1 bg-discord-background justify-center items-center">
                <ActivityIndicator size="large" color="#5865F2" />
                <Text className="text-discord-text mt-4">Loading workout data...</Text>
            </View>
        );
    }
    
    // Show message if no workouts found
    if (workouts.length === 0) {
        return (
            <View className="flex-1 bg-discord-background">
                <CustomHeader title="Analytics" titleAlign="center" />
                <View className="flex-1 justify-center items-center px-6">
                    <Text className="text-discord-text text-xl text-center mb-4">No workout data yet</Text>
                    <Text className="text-discord-muted text-center">
                        Start adding workouts to see your progress and analytics here.
                    </Text>
                </View>
            </View>
        );
    }
    
    return (
        <FlatList
            data={[]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} // Safe for an empty list
            className="flex-1 bg-discord-background"
            ListHeaderComponent={
                <>
                    <CustomHeader title="Analytics" titleAlign="center" />

                    <View className="px-4 py-6 space-y-6">
                        <View className="flex-row justify-between space-x-2">
                            <StatsCard title="Workouts" value={totalWorkouts} />
                            <StatsCard title="Exercises" value={totalExercises} />
                            <StatsCard title="Volume (lbs)" value={Math.round(totalVolume)} />
                        </View>

                        <TimeframeSelector
                            selectedTimeframe={selectedTimeframe}
                            onSelectTimeframe={setSelectedTimeframe}
                        />

                        <ChartContainer
                            title="Average Weight Per Session"
                            data={chartData}
                        />

                        <StrongestLifts lifts={strongestLifts} />

                        <ExerciseBreakdown
                            exercises={uniqueExercises}
                            getExerciseChartData={getExerciseChartData}
                        />
                    </View>
                </>
            }
        />
    );
};

export default Analytics;