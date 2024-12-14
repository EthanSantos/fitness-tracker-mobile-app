import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import "../../global.css"

type Workout = {
    id: string;
    exercise: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

type WorkoutModalProps = {
    workouts: Workout[];
    handleWorkoutSelect: (item: Workout) => void;
    handleDeleteWorkout: (id: string) => void;
};

const WorkoutModal: React.FC<WorkoutModalProps> = ({ workouts, handleWorkoutSelect, handleDeleteWorkout }) => {
    return (
        <FlatList
            data={workouts}
            renderItem={({ item }) => (
                <View className="flex-row justify-between items-center p-4 bg-gray-50 rounded-md mb-3">
                    <TouchableOpacity
                        className="flex-1"
                        onPress={() => handleWorkoutSelect(item)}
                    >
                        <View>
                            <Text className="text-lg font-medium text-black">{item.exercise}</Text>
                            <Text className="text-sm text-gray-500">{item.date}</Text>
                        </View>
                        <Text className="text-sm text-blue-500">{item.sets.length} sets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="ml-4 bg-red-500 rounded-md px-3 py-2"
                        onPress={() => handleDeleteWorkout(item.id)}
                    >
                        <Text className="text-white">X</Text>
                    </TouchableOpacity>
                </View>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
                <Text className="text-gray-500 text-center mt-6 text-lg">
                    No workouts logged yet. Start adding your first workout!
                </Text>
            }
        />
    )
}

export default WorkoutModal
