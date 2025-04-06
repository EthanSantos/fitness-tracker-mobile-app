import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EmptyWorkoutList: React.FC = () => {
    return (
        <View className="bg-discord-card rounded-xl p-4 items-center justify-center" style={{ height: 150 }}>
            <MaterialCommunityIcons name="calendar-blank" size={40} color="#5865F2" style={{ marginBottom: 10 }} />
            <Text className="text-discord-text text-lg font-semibold">No workouts for this day</Text>
            <Text className="text-discord-muted text-sm text-center mt-1">
                Add a new workout or select another date
            </Text>
        </View>
    );
};

export default EmptyWorkoutList;
