import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface TimeframeSelectorProps {
    selectedTimeframe: 'week' | 'month';
    onSelectTimeframe: (timeframe: 'week' | 'month') => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selectedTimeframe, onSelectTimeframe }) => (
    <View className="flex-row bg-discord-dark rounded-lg p-1">
        {['week', 'month'].map((timeframe) => (
            <TouchableOpacity
                key={timeframe}
                onPress={() => onSelectTimeframe(timeframe as 'week' | 'month')}
                className={`flex-1 p-2 rounded-md ${selectedTimeframe === timeframe ? 'bg-discord-accent' : ''}`}
            >
                <Text className={`text-center text-discord-text ${selectedTimeframe === timeframe ? 'font-bold' : 'opacity-80'}`}>
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default TimeframeSelector;
