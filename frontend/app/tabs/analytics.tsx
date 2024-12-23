import React, { useState } from 'react';
import CustomHeader from '../components/Header';
import { View, ScrollView } from 'react-native';

import ChartContainer from '../components/ChartContainer';
import ExerciseBreakdown from '../components/ExerciseBreakdown';
import StatsCard from '../components/StatsCard';
import StrongestLifts from '../components/StrongestLifts';
import TimeframeSelector from '../components/TimeframeSelector';

import { workoutData } from '../components/MockWorkoutData';

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
    const strongestLifts = getStrongestLifts(workoutData);
    const chartData = getChartData(workoutData);           // Get chart data

    // Calculate additional stats
    const totalWorkouts = workoutData.length;

    const uniqueExercises = Array.from(new Set(workoutData.flatMap((workout) => workout.exercises.map((e) => e.name)))) // get a list of all the unique exercises

    return (
        <ScrollView className="flex-1 bg-discord-background">
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
                    selectedExercise={selectedExercise}
                    toggleDropdown={toggleDropdown}
                    getExerciseChartData={getExerciseChartData}
                />
            </View>
        </ScrollView>
    );
};

export default Analytics;
