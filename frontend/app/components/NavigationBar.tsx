import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

interface NavigationBarProps {
    visible: boolean;
}

const SLIDE_DURATION = 300;
const HIDDEN_POSITION = 100; // Distance below the screen before showing

const NavigationBar: React.FC<NavigationBarProps> = ({ visible }) => {
    const translateY = useRef(new Animated.Value(HIDDEN_POSITION)).current;
    const pathname = usePathname();

    // Determine which route is active
    const isWorkoutsActive = pathname === '/workouts';
    const isProfileActive = pathname === '/profile';

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

                    <Link href="/workouts" replace asChild>
                        <TouchableOpacity
                            className={`items-center ${!isWorkoutsActive ? 'opacity-50' : ''}`}
                            disabled={isWorkoutsActive}
                        >
                            <AntDesign
                                name="bars"
                                size={24}
                                color={isWorkoutsActive ? "#DCDDDE" : "#FFFFFF"}
                            />
                            <Text className={`text-sm ${isWorkoutsActive ? 'text-discord-text font-bold' : 'text-white font-bold'}`}>
                                Workout
                            </Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/profile" replace asChild>
                        <TouchableOpacity
                            className={`items-center ${!isProfileActive ? 'opacity-50' : ''}`}
                            disabled={isProfileActive}
                        >
                            <AntDesign
                                name="user"
                                size={24}
                                color={isProfileActive ? "#DCDDDE" : "#FFFFFF"}
                            />
                            <Text className={`text-sm ${isProfileActive ? 'text-discord-text font-bold' : 'text-white font-bold'}`}>
                                Profile
                            </Text>
                        </TouchableOpacity>
                    </Link>

                </View>
            </SafeAreaView>
        </Animated.View>
    );
};

export default NavigationBar;
