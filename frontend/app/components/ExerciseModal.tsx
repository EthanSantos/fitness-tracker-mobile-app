import React, { useCallback } from 'react';
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
import Toast from 'react-native-toast-message';
import SetFrame from './SetFrame';

import "../../global.css";

type Exercise = {
    id: string;
    name: string;
    sets: { reps: number; weight: number }[];
    date: string;
};

type ExerciseModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedExercise: Exercise | null;
    reps: string;
    setReps: (reps: string) => void;
    weight: string;
    setWeight: (weight: string) => void;
    handleAddSet: () => void;
    exercises: Exercise[];
    setExercises: (exercises: Exercise[]) => void;
    setSelectedExercise: (exercise: Exercise) => void;
};

const ExerciseModal: React.FC<ExerciseModalProps> = ({
    modalVisible,
    setModalVisible,
    selectedExercise,
    reps,
    setReps,
    weight,
    setWeight,
    handleAddSet,
    exercises,
    setExercises,
    setSelectedExercise,
}) => {

    const showToast = (type: string, text1: string, text2: string) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    };

    const handleDeleteSet = useCallback(
        (indexToDelete: number): void => {
            if (selectedExercise) {
                const updatedSets = selectedExercise.sets.filter((_, i) => i !== indexToDelete);

                const updatedExercise: Exercise = { ...selectedExercise, sets: updatedSets };

                const updatedExercises = exercises.map((exercise) =>
                    exercise.id === updatedExercise.id ? updatedExercise : exercise
                );

                setExercises(updatedExercises);
                setSelectedExercise({ ...selectedExercise, sets: updatedSets });

                showToast("error", "Set Removed", "Set has been removed!")

            }
        },
        [selectedExercise, exercises]
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 justify-end bg-transparent">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className="bg-discord-modal rounded-t-3xl p-6 pb-8" // Added extra padding-bottom
                    >
                        {selectedExercise && (
                            <>
                                <Text className="text-2xl font-bold text-discord-text mb-4 text-center">
                                    {selectedExercise.name}
                                </Text>
                                <FlatList
                                    data={selectedExercise?.sets}
                                    renderItem={({ item, index }) => (
                                        <SetFrame
                                            item={item}
                                            index={index}
                                            onDelete={(indexToDelete) => {
                                                handleDeleteSet(indexToDelete);
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
                                <Text className="text-lg font-semibold text-discord-text mb-2">
                                    Weight (lbs)
                                </Text>
                                <TextInput
                                    className="border border-gray-700 rounded-lg px-4 py-3 mb-4 text-discord-text text-lg bg-discord-card"
                                    placeholder="Enter weight"
                                    placeholderTextColor="#72767D"
                                    keyboardType="numeric"
                                    value={weight}
                                    onChangeText={setWeight}
                                    returnKeyType="done"
                                />

                                <Text className="text-lg font-semibold text-discord-text mb-2">
                                    Reps
                                </Text>
                                <TextInput
                                    className="border border-gray-700 rounded-lg px-4 py-3 mb-6 text-discord-text text-lg bg-discord-card"
                                    placeholder="Enter reps"
                                    placeholderTextColor="#72767D"
                                    keyboardType="numeric"
                                    value={reps}
                                    onChangeText={setReps}
                                    returnKeyType="done"
                                />
                                <TouchableOpacity
                                    className="bg-discord-accent rounded-lg py-3 mb-4 active:opacity-80"
                                    onPress={handleAddSet}
                                >
                                    <Text className="text-center text-white text-lg font-bold">+ Add Set</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-discord-extraCard rounded-lg py-3 mb-8 active:opacity-80"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text className="text-center text-gray-200 text-lg font-bold">Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ExerciseModal;
