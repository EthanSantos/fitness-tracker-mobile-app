import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Animated, LayoutChangeEvent } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

interface NavigationBarProps {
    visible: boolean;
}

const SLIDE_DURATION = 300;
const HIDDEN_POSITION = 100; // Distance below the screen before showing
const ANIMATION_DURATION = 250; // Duration for indicator line move

const NavigationBar: React.FC<NavigationBarProps> = ({ visible }) => {
    const pathname = usePathname();
    const isWorkoutsActive = pathname === '/workouts';
    const isProfileActive = pathname === '/profile';

    // Animated values
    const translateY = useRef(new Animated.Value(HIDDEN_POSITION)).current;
    const indicatorX = useRef(new Animated.Value(0)).current;

    const [containerWidth, setContainerWidth] = useState(0);
    const numTabs = 2; // Update this if you add more tabs

    // Animate slide up/down on visibility change
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : HIDDEN_POSITION,
            duration: SLIDE_DURATION,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    // Calculate indicator line position
    const getIndicatorPosition = useCallback(() => {
        if (containerWidth === 0) return 0;

        // Each tab width
        const tabWidth = containerWidth / numTabs;

        // We want the line to be half the width of the tab
        const lineWidth = tabWidth / 2;

        // Determine which tab is active (0 for workouts, 1 for profile)
        const activeIndex = isWorkoutsActive ? 0 : 1;

        // The center of the active tab
        const centerOfTab = (activeIndex + 0.5) * tabWidth;

        // Position line so that it's centered under the active tab
        return centerOfTab - lineWidth / 2;
    }, [containerWidth, isWorkoutsActive]);

    useEffect(() => {
        Animated.timing(indicatorX, {
            toValue: getIndicatorPosition(),
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
    }, [getIndicatorPosition]);

    const onContainerLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
                position: 'absolute',
                bottom: 0,
                width: '100%',
            }}
        >
            <SafeAreaView className="bg-discord-background/90">
                <View
                    onLayout={onContainerLayout}
                    className="flex-row h-16 border-t border-discord-card items-center justify-around shadow-md"
                >
                    {/* Workouts Tab */}
                    <Link href="/workouts" replace asChild>
                        <TouchableOpacity
                            className={`items-center flex-1 ${!isWorkoutsActive ? 'opacity-50' : ''}`}
                            disabled={isWorkoutsActive}
                            activeOpacity={0.7}
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

                    {/* Profile Tab */}
                    <Link href="/profile" replace asChild>
                        <TouchableOpacity
                            className={`items-center flex-1 ${!isProfileActive ? 'opacity-50' : ''}`}
                            disabled={isProfileActive}
                            activeOpacity={0.7}
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

                    {/* Animated Indicator Line */}
                    {containerWidth > 0 && (
                        <Animated.View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                height: 2,
                                width: containerWidth / (numTabs * 2), // half tab width
                                backgroundColor: '#DCDDDE',
                                transform: [{ translateX: indicatorX }],
                            }}
                        />
                    )}
                </View>
            </SafeAreaView>
        </Animated.View>
    );
};

export default NavigationBar;
