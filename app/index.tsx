import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import WorkoutModal from './components/WorkoutModal';
import WorkoutList from "./components/WorkoutList"
import WorkoutInput from "./components/WorkoutInput"
import CustomHeader from './components/Header';

import {API_URL} from "@env"
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

  useEffect(() => {

    const loadWorkouts = async (): Promise<void> => {
      try {
        const savedWorkouts = await AsyncStorage.getItem('workouts')

        if (savedWorkouts) {
          console.log(JSON.parse(savedWorkouts))
          setWorkouts(JSON.parse(savedWorkouts))
        }
      }
      catch (error) {
        console.error("Error saving data", error)
      }
    }

    loadWorkouts()
  }, [])

  const postWorkouts = async () => {
    console.log('Starting axios.post'); // Log before the call
    try {
      const response = await axios.post(API_URL + "/api/workouts", workouts, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Server response:', response.data); // Log the server response
    } catch (error) {
      console.error('Error in axios.post:', error); // Log any errors
    } finally {
      console.log('Finished axios.post'); // Log after the call
    }
  };

  useEffect(() => {
    saveWorkouts()
    postWorkouts();

  }, [workouts])

  const saveWorkouts = async (): Promise<void> => {
    try {
      console.log(workouts)
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
    } catch (error) {
      console.error('Error saving data', error);
    }
  }

  // Add a new workout
  const handleAddWorkout = async (): Promise<void> => {
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

    // add new workout here to async local storage

    setWorkouts([...workouts, newWorkout]);
    // save workouts
    saveWorkouts()
    console.log("Adding", newWorkout)
    console.log(workouts)
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

      setWorkouts((prevWorkouts) => // update that workout to hold the new set
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

  const clearWorkouts = async (): Promise<void> => {
    setWorkouts([])
    saveWorkouts()
  }

  const handleClearWorkouts = (): void => {
    Alert.alert('Confirm', 'Are you sure you want to clear all workouts?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => clearWorkouts() },
    ]);
  };

  return (
    // Dismiss keyboard when tapping outside input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-discord-background">
        {/* Header */}
        <CustomHeader title="Workouts" />

        {/* Input Section */}
        <View className="px-4 mt-4">
          <WorkoutInput
            exercise={exercise}
            setExercise={setExercise}
            handleAddWorkout={handleAddWorkout}
            handleClearWorkouts={handleClearWorkouts}
          />
        </View>

        {/* Workout List */}
        <View className="flex-1 px-4 mt-2">
          <WorkoutList
            workouts={workouts}
            handleWorkoutSelect={handleWorkoutSelect}
            handleDeleteWorkout={handleDeleteWorkout}
          />
        </View>

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
          workouts={workouts}
          setWorkouts={setWorkouts}
          setSelectedWorkout={setSelectedWorkout}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WorkoutLogger;
