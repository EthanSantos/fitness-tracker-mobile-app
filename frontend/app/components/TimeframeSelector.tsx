import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface TimeframeSelectorProps {
    selectedTimeframe: 'day' | 'week';
    onSelectTimeframe: (timeframe: 'day' | 'week') => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selectedTimeframe, onSelectTimeframe }) => (
    <View className="flex-row bg-discord-dark rounded-lg p-1">
        {['day', 'week'].map((timeframe) => (
            <TouchableOpacity
                key={timeframe}
                onPress={() => onSelectTimeframe(timeframe as 'day' | 'week')}
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
