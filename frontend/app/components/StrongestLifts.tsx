import React from 'react';
import { View, Text } from 'react-native';

interface Lift {
    name: string;
    maxWeight: number;
    reps: number;
}

interface StrongestLiftsProps {
    lifts: Lift[];
}

const StrongestLifts: React.FC<StrongestLiftsProps> = ({ lifts }) => (
    <View className="bg-discord-dark p-4 rounded-lg">
        <Text className="text-discord-text text-2xl font-bold mb-4">Recent Strongest Lifts</Text>
        {lifts.map((lift, index) => (
            <View key={index} className="flex-row justify-between items-center mb-3">
                <Text className="text-discord-text font-semibold">{lift.name}</Text>
                <Text className="text-discord-text opacity-80">
                    {lift.maxWeight} lbs @ {lift.reps} reps
                </Text>
            </View>
        ))}
    </View>
);

export default StrongestLifts;

