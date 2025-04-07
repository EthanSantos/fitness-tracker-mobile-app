import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Props type definition
type InputWorkoutProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  workoutName: string;
  setWorkoutName: (name: string) => void;
  handleAddWorkout: () => void;
};

const InputWorkout: React.FC<InputWorkoutProps> = ({
  visible,
  setVisible,
  workoutName,
  setWorkoutName,
  handleAddWorkout,
}) => {
  // Screen dimensions
  const { height } = Dimensions.get('window');

  // Animated values for slide and fade effects
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // State to track keyboard visibility
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Keyboard visibility listener
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // PanResponder for drag-to-dismiss gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        slideAnim.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        slideAnim.flattenOffset();
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  // Open modal animation
  const openModal = useCallback(() => {
    slideAnim.setValue(height);
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 150,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, fadeAnim, height]);

  // Close modal animation
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
      }),
    ]).start(() => {
      setVisible(false);
    });
  }, [height, slideAnim, fadeAnim, setVisible]);

  // Trigger open animation when modal becomes visible
  useEffect(() => {
    if (visible) {
      openModal();
    }
  }, [visible, openModal]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={closeModal}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <View className="flex-1 justify-end">
          {/* Dark faded background */}
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#000',
              opacity: fadeAnim,
            }}
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <View className="flex-1" />
            </TouchableWithoutFeedback>
          </Animated.View>
          
          {/* Bottom-up modal container */}
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
              maxHeight: '90%',
            }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={isKeyboardVisible}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="bg-discord-modal rounded-t-3xl p-6 pb-20">
                  {/* Draggable handle */}
                  <View {...panResponder.panHandlers}>
                    <View className="items-center pb-4">
                      <View className="w-12 h-1.5 rounded-full bg-gray-500 opacity-50" />
                    </View>
                  </View>
                  
                  {/* Close button */}
                  <TouchableOpacity
                    onPress={closeModal}
                    className="self-end mb-4"
                  >
                    <MaterialCommunityIcons name="close" size={24} color="#72767D" />
                  </TouchableOpacity>
                  
                  {/* Header */}
                  <View className="flex-row items-center mb-4">
                    <MaterialCommunityIcons
                      name="playlist-plus"
                      size={24}
                      color="#5865F2"
                      className="mr-2"
                    />
                    <Text className="text-discord-text text-xl font-bold">
                      Add Workout
                    </Text>
                  </View>
                  
                  {/* Input field */}
                  <TextInput
                    className="bg-discord-background text-discord-text text-lg px-4 py-3 rounded-lg mb-3"
                    placeholder="What's your workout plan? (E.g. - Chest Day)"
                    placeholderTextColor="#72767D"
                    value={workoutName}
                    onChangeText={setWorkoutName}
                    onSubmitEditing={handleAddWorkout}
                  />
                  
                  {/* Create Workout button */}
                  <TouchableOpacity
                    className="bg-discord-accent py-3 rounded-lg items-center justify-center flex-row space-x-2"
                    onPress={handleAddWorkout}
                  >
                    <Text className="text-white font-bold text-lg">
                      Create Workout
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InputWorkout;