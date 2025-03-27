import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EmptyWorkoutList: React.FC = () => {
    return (
        <View className="flex-1 items-center justify-center py-10">
            <MaterialCommunityIcons name="dumbbell" size={64} color="#72767D" />
            <Text className="text-discord-muted text-lg text-center mt-4 px-6">
                No workouts added yet.{'\n'}Start building your fitness journey!
            </Text>
        </View>

    );
};

export default EmptyWorkoutList;
