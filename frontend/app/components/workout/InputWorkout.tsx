import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type InputWorkoutProps = {
    workoutName: string;
    setWorkoutName: (name: string) => void;
    handleAddWorkout: () => void;
};

const InputWorkout: React.FC<InputWorkoutProps> = ({workoutName, setWorkoutName, handleAddWorkout}) => {
    return (
        <View className="bg-discord-card rounded-xl p-4 mb-6">
            <View className="flex-row items-center mb-4">
                <MaterialCommunityIcons
                    name="playlist-plus"
                    size={24}
                    color="#5865F2"
                    style={{ marginRight: 8 }}
                />
                <Text className="text-discord-text text-xl font-bold">
                    Add Workout
                </Text>
            </View>

            <TextInput
                className="bg-discord-background text-discord-text text-lg px-4 py-3 rounded-lg mb-3"
                placeholder="What's your workout plan?"
                placeholderTextColor="#72767D"
                value={workoutName}
                onChangeText={setWorkoutName}
                onSubmitEditing={handleAddWorkout}
            />

            <TouchableOpacity
                className="bg-discord-accent py-3 rounded-lg items-center justify-center flex-row space-x-2"
                onPress={handleAddWorkout}
            >
                <Text className="text-white font-bold text-lg">
                    Create Workout
                </Text>
            </TouchableOpacity>
        </View>

    );
};

export default InputWorkout;
