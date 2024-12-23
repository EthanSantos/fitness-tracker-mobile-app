import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Entypo from '@expo/vector-icons/Entypo';

import ChartContainer from './ChartContainer';

type ChartData = { value: number; label: string };

interface ExerciseBreakdownProps {
    exercises: string[];
    selectedExercise: string | null;
    toggleDropdown: (exerciseName: string) => void;
    getExerciseChartData: (exerciseName: string) => ChartData[];
}

interface ExerciseItemProps {
    exerciseName: string;
    isSelected: boolean;
    onToggle: () => void;
    chartData: ChartData[];
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exerciseName, isSelected, onToggle, chartData }) => {
    const animatedRotation = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.spring(animatedRotation, {
            toValue: isSelected ? 1 : 0,
            friction: 6, // Controls the "bounciness" of the animation
            tension: 60, // Controls the speed and stiffness of the spring
            useNativeDriver: true,
        }).start();
    }, [isSelected]);

    const rotateZ = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View className="mb-3">
            <TouchableOpacity
                onPress={onToggle}
                className="flex-row items-center justify-between p-3 bg-discord-accent rounded-lg"
            >
                <Text className="text-discord-text font-semibold text-lg">{exerciseName}</Text>
                <Animated.View style={{ transform: [{ rotateZ }] }}>
                    <Entypo name="chevron-down" size={24} color="white" />
                </Animated.View>
            </TouchableOpacity>
            {isSelected && (
                <View className="flex-1">
                    <View className="px-4 py-6 space-y-6">
                        <Text className="text-discord-text font-bold mb-4 text-center">
                            {exerciseName} 1 Rep Max Over Time
                        </Text>
                        <ChartContainer data={chartData} />
                    </View>
                </View>
            )}
        </View>
    );
};

const ExerciseBreakdown: React.FC<ExerciseBreakdownProps> = ({
    exercises,
    selectedExercise,
    toggleDropdown,
    getExerciseChartData,
}) => (
    <View className="bg-discord-dark p-4 rounded-lg">
        <Text className="text-discord-text text-lg font-bold mb-4">Exercise Breakdown</Text>
        {exercises.map((exerciseName, index) => (
            <ExerciseItem
                key={index}
                exerciseName={exerciseName}
                isSelected={selectedExercise === exerciseName}
                onToggle={() => toggleDropdown(exerciseName)}
                chartData={getExerciseChartData(exerciseName)}
            />
        ))}
    </View>
);

export default ExerciseBreakdown;

