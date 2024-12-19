import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface NavigationBarProps {
    visible: boolean;
}

const SLIDE_DURATION = 300;
const HIDDEN_POSITION = 100; // Distance below the screen before showing

const NavigationBar: React.FC<NavigationBarProps> = ({ visible }) => {
    const translateY = useRef(new Animated.Value(HIDDEN_POSITION)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : HIDDEN_POSITION,
            duration: SLIDE_DURATION,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
                position: 'absolute',
                bottom: 0,
                width: '100%',
            }}
        >
            <SafeAreaView className="bg-discord-background">
                <View className="flex-row h-16 border-t border-discord-card items-center justify-around">
                    <TouchableOpacity className="items-center">
                        <AntDesign name="bars" size={24} color="#DCDDDE" />
                        <Text className="text-sm text-discord-text">Workout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center">
                        <AntDesign name="user" size={24} color="#DCDDDE" />
                        <Text className="text-sm text-discord-text">Profile</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Animated.View>
    );
};

export default NavigationBar;
