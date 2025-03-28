import React, { useCallback, useRef, useState, useEffect } from 'react';
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
    Animated,
    Dimensions,
    ActivityIndicator,
    PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { showToast } from '../ui/ShowToast';
import SetFrame from './SetFrame';
import { Exercise } from '@/app/types';

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
    setSelectedExercise: (exercise: Exercise | null) => void;
};

const { height } = Dimensions.get('window');

// Function to calculate one rep max (same as in SetFrame)
const calculateOneRepMax = (weight: number, reps: number): number => {
    if (reps <= 0) return weight;
    if (reps === 1) return weight;

    // Epley formula: weight * (1 + 0.0333 * reps)
    const epley = weight * (1 + 0.0333 * reps);
    
    // Brzycki formula: weight * 36 / (37 - reps)
    const brzycki = weight * 36 / (37 - reps);
    
    // Lander formula: 100 * weight / (101.3 - 2.67123 * reps)
    const lander = 100 * weight / (101.3 - 2.67123 * reps);
    
    // Average the formulas for better accuracy
    const average = (epley + brzycki + lander) / 3;
    
    // Round to nearest 0.5
    return Math.round(average * 2) / 2;
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
    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const repsInputRef = useRef<TextInput>(null);
    const weightInputRef = useRef<TextInput>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [setToDelete, setSetToDelete] = useState<number | null>(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    // Find the best set index
    const findBestSetIndex = useCallback(() => {
        if (!selectedExercise || selectedExercise.sets.length === 0) return -1;

        let bestIndex = 0;
        let bestOneRM = 0;

        selectedExercise.sets.forEach((set, index) => {
            const oneRM = calculateOneRepMax(set.weight, set.reps);
            if (oneRM > bestOneRM) {
                bestOneRM = oneRM;
                bestIndex = index;
            }
        });

        return bestIndex;
    }, [selectedExercise]);

    // Close modal with animation
    const closeModal = useCallback(() => {
        Keyboard.dismiss();
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start(() => {
            setModalVisible(false);
        });
    }, [fadeAnim, height, setModalVisible, slideAnim]);

    // Handle keyboard appearance
    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            e => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );

        const keyboardWillHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    // Configure pan responder for drag to dismiss
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                slideAnim.extractOffset();
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) { // Only allow downward drag
                    slideAnim.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                slideAnim.flattenOffset();

                // If dragged down more than 100 pixels, close the modal
                if (gestureState.dy > 100) {
                    closeModal();
                } else {
                    // Otherwise snap back to open position
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 50,
                        friction: 7
                    }).start();
                }
            },
        })
    ).current;

    // Handle modal animations
    useEffect(() => {
        if (modalVisible) {
            // Reset position before animation starts
            slideAnim.setValue(height);
            fadeAnim.setValue(0);

            // Slide up animation
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    damping: 20,
                    stiffness: 90
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.5,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [modalVisible, slideAnim, fadeAnim, height]);

    // Handle delete set
    const handleDeleteSet = useCallback(
        (indexToDelete: number) => {
            setSetToDelete(indexToDelete);
        },
        []
    );

    // Confirm delete set
    const confirmDeleteSet = useCallback(() => {
        if (selectedExercise && setToDelete !== null) {
            const updatedSets = [...selectedExercise.sets];
            updatedSets.splice(setToDelete, 1);

            const updatedExercise = {
                ...selectedExercise,
                sets: updatedSets
            };

            const updatedExercises = exercises.map(exercise =>
                exercise.id === selectedExercise.id ? updatedExercise : exercise
            );

            setExercises(updatedExercises);
            setSelectedExercise(updatedExercise);
            setSetToDelete(null);

            showToast("error", "Set Removed", `Set ${setToDelete + 1} has been removed!`);
        }
    }, [selectedExercise, setToDelete, exercises, setExercises, setSelectedExercise]);

    // Cancel delete
    const cancelDelete = useCallback(() => {
        setSetToDelete(null);
    }, []);

    // Handle add set with validation
    const handleEnhancedAddSet = useCallback(async () => {
        if (!reps.trim() || !weight.trim()) {
            showToast("error", "Validation Error", "Please fill in both weight and reps");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate a brief delay to show the loading state
            await new Promise(resolve => setTimeout(resolve, 300));
            handleAddSet();

            // Dismiss keyboard after adding set instead of focusing on an input
            Keyboard.dismiss();
        } finally {
            setIsSubmitting(false);
        }
    }, [reps, weight, handleAddSet]);

    // Focus reps input
    const focusRepsInput = useCallback(() => {
        if (repsInputRef.current) {
            repsInputRef.current.focus();
        }
    }, []);

    // Get the best set index
    const bestSetIndex = findBestSetIndex();

    return (
        <Modal
            visible={modalVisible}
            animationType="none"
            transparent={true}
            onRequestClose={closeModal}
            statusBarTranslucent={true}
        >
            <View className="flex-1 justify-end">
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#000',
                        opacity: fadeAnim
                    }}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View className="flex-1" />
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View
                    style={{
                        transform: [{ translateY: slideAnim }],
                        maxHeight: '90%',
                        marginBottom: keyboardHeight > 0 ? keyboardHeight : 0
                    }}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'position' : undefined}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View className="bg-discord-modal rounded-t-3xl shadow-lg">
                                {/* Modal handle for better UX - draggable */}
                                <View {...panResponder.panHandlers}>
                                    <View className="items-center pt-2 pb-4">
                                        <View className="w-12 h-1.5 rounded-full bg-gray-500 opacity-50" />
                                    </View>
                                </View>

                                {selectedExercise ? (
                                    <View className="px-6 pb-8">
                                        <View className="flex-row justify-between items-center mb-4">
                                            <Text className="text-2xl font-bold text-discord-text">
                                                {selectedExercise.name}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={closeModal}
                                                className="p-2"
                                            >
                                                <Ionicons name="close-circle" size={28} color="#72767D" />
                                            </TouchableOpacity>
                                        </View>

                                        {/* Badge showing total sets */}
                                        <View className="mb-4 items-start">
                                            <View className="bg-gray-700 px-3 py-1 rounded-full">
                                                <Text className="text-gray-200 font-semibold">
                                                    {selectedExercise.sets.length} {selectedExercise.sets.length === 1 ? 'Set' : 'Sets'} Logged
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Sets List */}
                                        <View className="mb-4 max-h-60">
                                            <FlatList
                                                data={selectedExercise.sets}
                                                renderItem={({ item, index }) => (
                                                    <SetFrame
                                                        item={item}
                                                        index={index}
                                                        onDelete={handleDeleteSet}
                                                        isBestSet={index === bestSetIndex}
                                                    />
                                                )}
                                                keyExtractor={(_, index) => `set-${index}`}
                                                ListEmptyComponent={
                                                    <View className="py-6 items-center">
                                                        <Ionicons name="barbell-outline" size={40} color="#72767D" />
                                                        <Text className="text-discord-muted text-center mt-2">
                                                            No sets added yet.
                                                        </Text>
                                                    </View>
                                                }
                                                contentContainerStyle={{
                                                    paddingVertical: 4,
                                                }}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>

                                        {/* Input Controls */}
                                        <View className="p-4 bg-discord-card rounded-xl mb-5">
                                            <Text className="text-sm font-medium text-discord-muted mb-1">
                                                ADD NEW SET
                                            </Text>

                                            <View className="flex-row gap-3 mb-4">
                                                {/* Weight Input */}
                                                <View className="flex-1">
                                                    <Text className="text-discord-text font-semibold mb-1">
                                                        Weight (lbs)
                                                    </Text>
                                                    <TextInput
                                                        ref={weightInputRef}
                                                        className="border border-gray-700 rounded-lg px-4 py-3 text-discord-text text-lg bg-discord-modal"
                                                        placeholder="185"
                                                        placeholderTextColor="#72767D"
                                                        keyboardType="numeric"
                                                        value={weight}
                                                        onChangeText={setWeight}
                                                        returnKeyType="next"
                                                        onSubmitEditing={focusRepsInput}
                                                        blurOnSubmit={false}
                                                    />
                                                </View>

                                                {/* Reps Input */}
                                                <View className="flex-1">
                                                    <Text className="text-discord-text font-semibold mb-1">
                                                        Reps
                                                    </Text>
                                                    <TextInput
                                                        ref={repsInputRef}
                                                        className="border border-gray-700 rounded-lg px-4 py-3 text-discord-text text-lg bg-discord-modal"
                                                        placeholder="8"
                                                        placeholderTextColor="#72767D"
                                                        keyboardType="numeric"
                                                        value={reps}
                                                        onChangeText={setReps}
                                                        returnKeyType="done"
                                                        onSubmitEditing={handleEnhancedAddSet}
                                                    />
                                                </View>
                                            </View>

                                            {/* Add Button */}
                                            <TouchableOpacity
                                                className={`rounded-lg py-3.5 mb-1 ${isSubmitting ? 'bg-discord-accent bg-opacity-70' : 'bg-discord-accent'}`}
                                                onPress={handleEnhancedAddSet}
                                                disabled={isSubmitting}
                                            >
                                                <View className="flex-row justify-center items-center">
                                                    {isSubmitting ? (
                                                        <ActivityIndicator size="small" color="#ffffff" />
                                                    ) : (
                                                        <>
                                                            <Ionicons name="add-circle" size={20} color="#ffffff" />
                                                            <Text className="text-center text-white text-lg font-bold ml-2">
                                                                Add Set
                                                            </Text>
                                                        </>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Close button at bottom */}
                                        <TouchableOpacity
                                            className="py-3 mb-1 flex-row justify-center items-center"
                                            onPress={closeModal}
                                        >
                                            <Text className="text-center text-discord-muted text-lg font-medium">
                                                Close
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </Animated.View>

                {/* Custom Delete Set Confirmation Dialog */}
                {setToDelete !== null && selectedExercise && (
                    <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className="flex items-center justify-center">
                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} className="absolute inset-0" />
                        <View className="bg-discord-modal m-8 rounded-xl p-5 w-4/5 z-10">
                            <Text className="text-discord-text text-xl font-semibold text-center mb-4">
                                Delete Set {setToDelete + 1}?
                            </Text>
                            <Text className="text-discord-muted text-center mb-5">
                                This action cannot be undone.
                            </Text>
                            <View className="flex-row justify-between">
                                <TouchableOpacity
                                    className="flex-1 bg-gray-700 py-3 px-4 rounded-lg mr-3"
                                    onPress={cancelDelete}
                                >
                                    <Text className="text-white text-center font-medium">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="flex-1 bg-red-500 py-3 px-4 rounded-lg"
                                    onPress={confirmDeleteSet}
                                >
                                    <Text className="text-white text-center font-medium">Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
};

export default ExerciseModal;