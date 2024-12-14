import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import WorkoutModal from './components/WorkoutModal';

import "../global.css"

// Define the Workout data structure
type Workout = {
  id: string;
  exercise: string;
  sets: { reps: number; weight: number }[];
  date: string;
};

const WorkoutLogger: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [exercise, setExercise] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  // Add a new workout
  const handleAddWorkout = (): void => {
    if (!exercise.trim()) {
      Alert.alert('Error', 'Please enter an exercise name.');
      return;
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      exercise,
      sets: [],
      date: new Date().toLocaleDateString(),
    };

    setWorkouts([...workouts, newWorkout]);
    setExercise('');
    Keyboard.dismiss(); // Dismiss keyboard after adding workout
  };

  // Add a new set to the selected workout
  const handleAddSet = (): void => {
    if (!reps.trim() || !weight.trim()) {
      Alert.alert('Error', 'Please fill out both reps and weight.');
      return;
    }

    const parsedReps = parseInt(reps, 10);
    const parsedWeight = parseFloat(weight);

    if (isNaN(parsedReps) || isNaN(parsedWeight)) {
      Alert.alert('Error', 'Please enter valid numbers for reps and weight.');
      return;
    }

    if (selectedWorkout) {
      const updatedWorkout: Workout = {
        ...selectedWorkout,
        sets: [
          ...selectedWorkout.sets,
          { reps: parsedReps, weight: parsedWeight },
        ],
      };

      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout.id === selectedWorkout.id ? updatedWorkout : workout
        )
      );

      setReps('');
      setWeight('');
      setSelectedWorkout(updatedWorkout);
      Keyboard.dismiss(); // Dismiss keyboard after adding set
    }
  };

  // Delete a specific workout
  const handleDeleteWorkout = (id: string): void => {
    Alert.alert('Confirm', 'Are you sure you want to delete this workout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () =>
          setWorkouts((prevWorkouts) =>
            prevWorkouts.filter((workout) => workout.id !== id)
          ),
      },
    ]);
  };

  // Select a workout to view details
  const handleWorkoutSelect = (workout: Workout): void => {
    setSelectedWorkout(workout);
    setModalVisible(true);
  };

  // Clear all workouts
  const handleClearWorkouts = (): void => {
    Alert.alert('Confirm', 'Are you sure you want to clear all workouts?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => setWorkouts([]) },
    ]);
  };

  return (
    // Dismiss keyboard when tapping outside input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-gradient-to-b from-white to-gray-100 p-6">
        <Text className="text-4xl font-bold text-center text-black mb-8">
          Workout Logger
        </Text>

        {/* Input Section */}
        <View className="mb-6 p-6 bg-gray-50 rounded-2xl">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-900 text-lg"
            placeholder="Enter Exercise Name"
            placeholderTextColor="#6B7280"
            value={exercise}
            onChangeText={setExercise}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 mb-4 active:opacity-80"
            onPress={handleAddWorkout}
          >
            <Text className="text-center text-white text-lg">Add Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-3 active:opacity-80"
            onPress={handleClearWorkouts}
          >
            <Text className="text-center text-white text-lg">Clear All Workouts</Text>
          </TouchableOpacity>
        </View>

        {/* Workout List */}
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

        {/* Modal for Adding Sets */}
        <WorkoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedWorkout={selectedWorkout}
          reps={reps}
          setReps={setReps}
          weight={weight}
          setWeight={setWeight}
          handleAddSet={handleAddSet}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WorkoutLogger;
