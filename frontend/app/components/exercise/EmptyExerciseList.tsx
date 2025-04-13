import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyExerciseList: React.FC = ({
}) => {
    return (
        <View className="items-center justify-center py-12 px-6 bg-discord-card rounded-xl">
            <Ionicons name="barbell-outline" size={36} color="#5865F2" />
            <Text className="text-discord-text text-lg font-semibold mt-3 mb-1 text-center">
                Ready to start training?
            </Text>
            <Text className="text-discord-muted text-center text-sm px-4">
                Add your first exercise to begin tracking your workout progress
            </Text>
        </View>
    )
};

export default EmptyExerciseList;