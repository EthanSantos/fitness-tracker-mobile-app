import React, { useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type SetFrameProps = {
    item: { reps: number; weight: number };
    index: number;
    onDelete: (index: number) => void;
    isBestSet?: boolean;
};

// Function to calculate one rep max using multiple formulas and average them
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

const SetFrame: React.FC<SetFrameProps> = ({ item, index, onDelete, isBestSet = false }) => {
    const [isPressed, setIsPressed] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
    const oneRepMax = calculateOneRepMax(item.weight, item.reps);

    // Handle press animation
    const handlePressIn = () => {
        setIsPressed(true);
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                opacity: scaleAnim
            }}
            className="mb-2"
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <View className="bg-discord-card rounded-xl p-4 border border-discord-card">
                    <View className="flex-row justify-between items-center">
                        {/* Set number indicator */}
                        <View className="bg-gray-700 h-10 w-10 rounded-full items-center justify-center">
                            <Text className="text-white font-bold">
                                {index + 1}
                            </Text>
                        </View>
                        
                        {/* Weight and reps */}
                        <View className="flex-1 ml-3">
                            <View className="flex-row items-baseline">
                                <Text className="text-discord-text text-xl font-bold">
                                    {item.weight} 
                                </Text>
                                <Text className="text-discord-muted text-sm ml-1">
                                    lbs
                                </Text>
                                
                                <Text className="text-discord-text text-lg mx-2">
                                    ×
                                </Text>
                                
                                <Text className="text-discord-text text-xl font-bold">
                                    {item.reps}
                                </Text>
                                <Text className="text-discord-muted text-sm ml-1">
                                    reps
                                </Text>
                            </View>
                            
                            {/* Additional stats row */}
                            <View className="flex-row mt-1">
                                <Text className="text-discord-muted text-xs">
                                    Est. 1RM: {oneRepMax} lbs
                                </Text>
                            </View>
                        </View>
                        
                        {/* BEST SET badge */}
                        {isBestSet && (
                            <View className="bg-green-600 px-2 py-1 rounded mr-2">
                                <Text className="text-white text-xs font-bold">BEST SET</Text>
                            </View>
                        )}
                        
                        {/* Delete button - Using the consistent style */}
                        <TouchableOpacity
                            onPress={() => onDelete(index)}
                            className="bg-discord-error/10 rounded-lg p-2"
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <AntDesign name="delete" size={18} color="#ED4245" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default SetFrame;