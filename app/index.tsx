import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import WorkoutModal from './components/WorkoutModal';
import WorkoutList from "./components/WorkoutList"
import WorkoutInput from "./components/WorkoutInput"

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
    Keyboard.dismiss(); 
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
        <WorkoutInput
          exercise={exercise}
          setExercise={setExercise}
          handleAddWorkout={handleAddWorkout}
          handleClearWorkouts={handleClearWorkouts}
        />

        {/* Workout List */}
        <WorkoutList
          workouts={workouts}
          handleWorkoutSelect={handleWorkoutSelect}
          handleDeleteWorkout={handleDeleteWorkout}
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
