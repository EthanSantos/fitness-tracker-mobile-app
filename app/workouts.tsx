import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './components/Header';

import "../global.css"

const AddWorkoutScreen: React.FC = () => {
    const router = useRouter();
    const [workoutName, setWorkoutName] = useState('');

    const handleAddWorkout = () => {
        if (!workoutName.trim()) {
            Alert.alert('Error', 'Please enter a workout name.');
            return;
        }

        // Save workout to AsyncStorage or global state here
        console.log(`Workout added: ${workoutName}`);

        // Clear the input and navigate back
        setWorkoutName('');
        router.push("/exercise");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 bg-discord-background">
                {/* Header with Back Button */}
                <CustomHeader title="Add Workout" onBack={() => router.back()} />

                {/* Content */}
                <KeyboardAvoidingView
                    behavior="padding"
                    className="flex-1 justify-center px-4"
                >
                    <Text className="text-discord-text text-2xl font-bold mb-6 text-center">
                        Add a New Workout
                    </Text>
                    <TextInput
                        className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
                        placeholder="Workout Name"
                        placeholderTextColor="#72767D"
                        value={workoutName}
                        onChangeText={setWorkoutName}
                    />
                    <TouchableOpacity
                        className="bg-discord-accent p-4 rounded-lg"
                        onPress={handleAddWorkout}
                    >
                        <Text className="text-white text-center text-lg font-bold">
                            Add Workout
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default AddWorkoutScreen;
