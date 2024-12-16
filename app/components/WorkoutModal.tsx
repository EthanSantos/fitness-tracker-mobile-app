import React, {useCallback} from 'react';
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
import SetFrame from './SetFrame';

import "../../global.css"

type Workout = {
    id: string;
    exercise: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

type WorkoutModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedWorkout: Workout | null;
    reps: string;
    setReps: (reps: string) => void;
    weight: string;
    setWeight: (weight: string) => void;
    handleAddSet: () => void;
    workouts: Workout[];
    setWorkouts: (workouts: Workout[]) => void;
    setSelectedWorkout: (workout: Workout) => void;
};

const WorkoutModal: React.FC<WorkoutModalProps> = ({ modalVisible, setModalVisible, selectedWorkout, reps, setReps, weight, setWeight, handleAddSet, workouts, setWorkouts, setSelectedWorkout }) => {

    const handleDeleteSet = useCallback(
        (indexToDelete: number): void => {
            if (selectedWorkout) {
                console.log("Deleting set at index:", indexToDelete);
                const updatedSets = selectedWorkout.sets.filter((_, i) => i !== indexToDelete);
                
                // Create a new workout object with updated sets
                const updatedWorkout: Workout = { ...selectedWorkout, sets: updatedSets };
                
                // Update the workouts array immutably
                const updatedWorkouts = workouts.map(workout =>
                    workout.id === updatedWorkout.id ? updatedWorkout : workout
                );
                
                setWorkouts(updatedWorkouts);
                setSelectedWorkout({ ...selectedWorkout, sets: updatedSets });
                
            }
        },
        [selectedWorkout, workouts]
    );


    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true} 
            onRequestClose={() => {
                setModalVisible(false);
                Keyboard.dismiss();
            }}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    setModalVisible(false);
                    Keyboard.dismiss();
                }}
            >
                <View className="flex-1 justify-end bg-transparent mb-10">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className="bg-discord-card rounded-t-3xl p-6"
                    >
                        {selectedWorkout && (
                            <>
                                <Text className="text-2xl font-bold text-discord-text mb-4 text-center">
                                    {selectedWorkout.exercise}
                                </Text>
                                <FlatList
                                    data={selectedWorkout?.sets}
                                    renderItem={({ item, index }) => (
                                        <SetFrame
                                            item={item}
                                            index={index}
                                            onDelete={(indexToDelete) => {
                                                handleDeleteSet(indexToDelete)
                                            }}
                                        />
                                    )}
                                    keyExtractor={(_, index) => `set-${index}`}
                                    ListEmptyComponent={
                                        <Text className="text-discord-muted text-center mb-4">
                                            No sets added yet.
                                        </Text>
                                    }
                                />


                                <TextInput
                                    className="border border-gray-700 rounded-lg px-4 py-3 mb-4 text-discord-text text-lg bg-discord-card"
                                    placeholder="Reps"
                                    placeholderTextColor="#72767D"
                                    keyboardType="numeric"
                                    value={reps}
                                    onChangeText={setReps}
                                />
                                <TextInput
                                    className="border border-gray-700 rounded-lg px-4 py-3 mb-6 text-discord-text text-lg bg-discord-card"
                                    placeholder="Weight (lbs)"
                                    placeholderTextColor="#72767D"
                                    keyboardType="numeric"
                                    value={weight}
                                    onChangeText={setWeight}
                                />
                                <TouchableOpacity
                                    className="bg-discord-accent rounded-lg py-3 mb-4 active:opacity-80"
                                    onPress={handleAddSet}
                                >
                                    <Text className="text-center text-white text-lg">Add Set</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-gray-700 rounded-lg py-3 active:opacity-80"
                                    onPress={() => {
                                        setModalVisible(false);
                                        Keyboard.dismiss();
                                    }}
                                >
                                    <Text className="text-center text-gray-200 text-lg">Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default WorkoutModal
