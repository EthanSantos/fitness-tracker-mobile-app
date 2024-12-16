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
import AntDesign from '@expo/vector-icons/AntDesign';


type Workout = {
    id: string;
    name: string;
};

const Workouts: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [workoutName, setWorkoutName] = useState<string>('');
    const router = useRouter();
    const segments = useSegments(); // use segments to reload workouts whenever the current route is /workouts

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

    const deleteWorkout = (workoutId: string) => {
        console.log("Deleted workoutId: ", workoutId)
        const updatedWorkouts = workouts.filter((workout) => workout.id !== workoutId);
        setWorkouts(updatedWorkouts);
        saveWorkouts(updatedWorkouts); // Persist to AsyncStorage
    }

    const handleDeleteWorkout = (workoutId: string) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this workout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => {
                    deleteWorkout(workoutId)
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
        <SafeAreaView edges={['left', 'right']} className="flex-1 bg-discord-background">
            {/* Header */}
            <CustomHeader title="Workouts" onBack={() => router.back()} titleAlign="center" />

            {/* Content Container */}
            <View className="p-4">
                {/* Input Section */}
                <Text className="text-discord-text text-lg font-semibold mb-2">
                    Workout Name
                </Text>
                <TextInput
                    className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4 shadow-sm"
                    placeholder="Enter workout name"
                    placeholderTextColor="#72767D"
                    value={workoutName}
                    onChangeText={setWorkoutName}
                />

                <TouchableOpacity
                    className="bg-discord-accent p-4 rounded-lg mb-6 shadow-sm active:opacity-80"
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
                        <View className="flex-row items-center justify-between p-4 bg-discord-card rounded-lg mb-3 shadow-sm">
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
                                onPress={() => handleDeleteWorkout(item.id)}
                                className="bg-discord-error rounded-md justify-center items-center shadow-md"
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
