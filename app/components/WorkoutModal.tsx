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
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedWorkout: Workout | null;
    reps: string;
    setReps: (reps: string) => void;
    weight: string;
    setWeight: (weight: string) => void;
    handleAddSet: () => void;
  };

const WorkoutModal: React.FC<WorkoutModalProps> = ({modalVisible, setModalVisible, selectedWorkout, reps, setReps, weight, setWeight, handleAddSet}) => {
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 justify-end">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className="bg-white rounded-t-3xl p-6 mb-10"
                    >
                        {selectedWorkout && (
                            <>
                                <Text className="text-2xl font-bold text-black mb-4 text-center">
                                    {selectedWorkout.exercise}
                                </Text>
                                <FlatList
                                    data={selectedWorkout.sets}
                                    renderItem={({ item, index }) => (
                                        <View className="flex-row justify-between p-4 bg-gray-50 rounded-xl mb-3">
                                            <Text className="text-base font-medium text-black">Set {index + 1}</Text>
                                            <Text className="text-sm text-gray-600">
                                                {item.reps} reps @ {item.weight} lbs
                                            </Text>
                                        </View>
                                    )}
                                    keyExtractor={(_, index) => `set-${index}`}
                                    ListEmptyComponent={
                                        <Text className="text-gray-500 text-center mb-4">
                                            No sets added yet.
                                        </Text>
                                    }
                                    style={{ maxHeight: '40%' }} // Adjusted to prevent modal from being too large
                                    keyboardShouldPersistTaps="handled"
                                />
                                <TextInput
                                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-black text-lg"
                                    placeholder="Reps"
                                    placeholderTextColor="#6B7280"
                                    keyboardType="numeric"
                                    value={reps}
                                    onChangeText={setReps}
                                />
                                <TextInput
                                    className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-black text-lg"
                                    placeholder="Weight (lbs)"
                                    placeholderTextColor="#6B7280"
                                    keyboardType="numeric"
                                    value={weight}
                                    onChangeText={setWeight}
                                />
                                <TouchableOpacity
                                    className="bg-blue-500 rounded-lg py-3 mb-4 active:opacity-80"
                                    onPress={handleAddSet}
                                >
                                    <Text className="text-center text-white text-lg">Add Set</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-gray-500 rounded-lg py-3 active:opacity-80"
                                    onPress={() => {
                                        setModalVisible(false);
                                        Keyboard.dismiss();
                                    }}
                                >
                                    <Text className="text-center text-white text-lg">Close</Text>
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
