import React, { useState, useEffect } from 'react';
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
import { useRouter, useSegments } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './components/Header';

type Workout = {
    id: string;
    name: string;
};

const Workouts: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [workoutName, setWorkoutName] = useState<string>('');
    const router = useRouter();
    const segments = useSegments(); // Get the current route segments

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

    const handleDeleteWorkout = (workoutId: string) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this workout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => {
                    const updatedWorkouts = workouts.filter((workout) => workout.id !== workoutId);
                    setWorkouts(updatedWorkouts);
                    saveWorkouts(updatedWorkouts); // Persist to AsyncStorage
                },
            },
        ]);
    };

    const navigateToWorkout = (workout: Workout) => {
        router.push({
            pathname: '/exercise',
            params: { workoutId: workout.id, workoutName: workout.name },
        });
    };

    // Load workouts on initial render
    useEffect(() => {
        loadWorkouts();
    }, []);

    // Reload workouts whenever the current route is /workouts
    useEffect(() => {
        if (segments[0] === 'workouts') {
            loadWorkouts();
        }
    }, [segments]);

    return (
        <SafeAreaView className="flex-1 bg-discord-background">
            {/* Custom Header */}
            <CustomHeader
                title="Workouts"
                onBack={() => router.back()}
            />

            <View className="p-4">

                <TextInput
                    className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
                    placeholder="Workout Name"
                    placeholderTextColor="#72767D"
                    value={workoutName}
                    onChangeText={setWorkoutName}
                />

                <TouchableOpacity
                    className="bg-discord-accent p-4 rounded-lg mb-6"
                    onPress={handleAddWorkout}
                >
                    <Text className="text-white text-center text-lg font-bold">
                        Add Workout
                    </Text>
                </TouchableOpacity>

                <FlatList
                    data={workouts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="flex-row justify-between items-center p-4 bg-gray-700 rounded-lg mb-3">
                            {/* Workout Name */}
                            <TouchableOpacity
                                className="flex-1"
                                onPress={() => navigateToWorkout(item)}
                            >
                                <Text className="text-base font-medium text-discord-text">
                                    {item.name}
                                </Text>
                                {/* I formatted the date using the ID that already uses Date.now() */}
                                <Text className="text-sm text-discord-muted">
                                    {new Date(parseInt(item.id)).toLocaleDateString()} 
                                </Text>
                            </TouchableOpacity>

                            {/* Delete Button */}
                            <TouchableOpacity
                                onPress={() => handleDeleteWorkout(item.id)}
                                className="bg-red-500 p-2 rounded-md ml-3"
                            >
                                <Text className="text-white font-bold">X</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default Workouts;
