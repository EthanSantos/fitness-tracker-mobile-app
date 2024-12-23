import React from 'react';
import { View, Text } from 'react-native';

interface StatsCardProps {
    title: string;
    value: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => (
    <View className="bg-discord-dark p-4 rounded-lg flex-1">
        <Text className="text-discord-text text-sm opacity-80">{title}</Text>
        <Text className="text-discord-text text-xl font-bold">{value}</Text>
    </View>
);

export default StatsCard;