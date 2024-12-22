import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

import { useFocusEffect } from '@react-navigation/native';


type Workout = {
    id: string;
    name: string;
};

const Workouts: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [workoutName, setWorkoutName] = useState<string>('');
    const router = useRouter();

    const showToast = (type: string, text1: string, text2: string) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    };

    // Load workouts from AsyncStorage
    const loadWorkouts = async () => {
        try {
            const savedWorkouts = await AsyncStorage.getItem('workouts');
            if (savedWorkouts) {
                setWorkouts(JSON.parse(savedWorkouts));
                console.log('Workouts loaded:', JSON.parse(savedWorkouts)); // Debug log
            }
        } catch (error) {
            console.error('Error loading workouts:', error);
        }
    };

    // Save workouts to AsyncStorage
    const saveWorkouts = async (updatedWorkouts: Workout[]) => {
        try {
            await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
            console.log('Workouts saved:', updatedWorkouts); // Debug log
        } catch (error) {
            console.error('Error saving workouts:', error);
        }
    };

    const handleAddWorkout = () => {
        if (!workoutName.trim()) {
            Alert.alert('Error', 'Please enter a workout name.');
            return;
        }

        showToast("success", "Success", workoutName + " has been added to your workout!")

        const newWorkout: Workout = {
            id: Date.now().toString(),
            name: workoutName.trim(),
        };

        const updatedWorkouts = [...workouts, newWorkout];
        setWorkouts(updatedWorkouts);
        saveWorkouts(updatedWorkouts); // Persist to AsyncStorage
        setWorkoutName('');
        Keyboard.dismiss();
    };

    const deleteWorkout = (workoutId: string) => {
        console.log("Deleted workoutId: ", workoutId)
        const updatedWorkouts = workouts.filter((workout) => workout.id !== workoutId);
        setWorkouts(updatedWorkouts);
        saveWorkouts(updatedWorkouts); // Persist to AsyncStorage
    }

    const handleDeleteWorkout = (workoutId: string, name: string) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this workout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => {
                    deleteWorkout(workoutId)
                    showToast("error", "Workout Removed", name + " has been successfully removed from your list.")
                },
            },
        ]);
    };

    const navigateToWorkout = (workout: Workout) => {
        router.push({
            pathname: '/pages/exercise',
            params: { workoutId: workout.id, workoutName: workout.name },
        });
    };

    // will run whenever th escreen comes into focus (including the first time)
    useFocusEffect(
        useCallback(() => {
            loadWorkouts();
        }, [])
    );

    return (
        <SafeAreaView edges={['left', 'right']} className="flex-1 bg-discord-background">
            {/* Header */}
            <CustomHeader title="Workouts" titleAlign="center" />

            {/* Content Container */}
            <View className="p-4">
                {/* Input Section */}
                <Text className="text-discord-text text-lg font-semibold mb-2">
                    Workout Name
                </Text>
                <TextInput
                    className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
                    placeholder="Enter workout name"
                    placeholderTextColor="#72767D"
                    value={workoutName}
                    onChangeText={setWorkoutName}
                />

                <TouchableOpacity
                    className="bg-discord-accent p-4 rounded-lg mb-6 active:opacity-80"
                    onPress={handleAddWorkout}
                >
                    <Text className="text-white text-center text-lg font-bold tracking-wide">
                        + Add Workout
                    </Text>
                </TouchableOpacity>

                {/* Workout List */}
                <FlatList
                    data={workouts}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => (
                        <Text className="text-discord-muted text-center mt-10">
                            No workouts added yet. Start by adding one!
                        </Text>
                    )}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center justify-between p-4 bg-discord-card rounded-lg mb-3">
                            {/* Workout Details */}
                            <TouchableOpacity
                                className="flex-1"
                                onPress={() => navigateToWorkout(item)}
                            >
                                <Text className="text-lg font-semibold text-discord-text tracking-tight">
                                    {item.name}
                                </Text>
                                <Text className="text-sm text-discord-muted mt-1">
                                    {new Date(parseInt(item.id)).toLocaleDateString()}
                                </Text>
                            </TouchableOpacity>

                            {/* Delete Button */}
                            <TouchableOpacity
                                onPress={() => handleDeleteWorkout(item.id, item.name)}
                                className="bg-discord-error rounded-md justify-center items-center"
                                style={{ width: 36, height: 36 }}
                            >
                                <AntDesign name="minus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>

    );
};

export default Workouts;
