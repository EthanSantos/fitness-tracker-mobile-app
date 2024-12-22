import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { View, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");
const tabCount = 3;
const tabWidth = width / tabCount;

export default function TabsLayout() {
    const indicatorPosition = useSharedValue(0);
    const indicatorWidth = tabWidth * 0.4;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withSpring(indicatorPosition.value, {
                    stiffness: 250, // Higher stiffness for a snappier response
                    damping: 15,    // Lower damping for less resistance
                    mass: 0.8,      // Lower mass for faster motion
                }),
            },
        ],
    }));

    return (
        <View className="flex-1 bg-[#2C2F33] relative">
            <Tabs
                screenListeners={{
                    state: (e) => {
                        const index = e.data.state.index;
                        // Calculate the left position to center the indicator under the label
                        const left = index * tabWidth + (tabWidth - indicatorWidth) / 2;
                        indicatorPosition.value = left;
                    },
                }}
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#2C2F33",
                        borderTopColor: "#23272A",
                        height: 80,
                    },
                    tabBarActiveTintColor: "#DCDDDE",
                    tabBarInactiveTintColor: "#72767D",
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="analytics"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="analytics" size={size} color={color} />
                        ),
                        tabBarLabel: "Analytics",
                    }}
                />
                <Tabs.Screen
                    name="workouts"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="bars" size={size} color={color} />
                        ),
                        tabBarLabel: "Workouts",
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="user" size={size} color={color} />
                        ),
                        tabBarLabel: "Profile",
                    }}
                />
            </Tabs>
            {/* Line indicator */}
            <Animated.View
                className="absolute h-1 bg-[#DCDDDE] rounded-full z-10"
                style={[
                    animatedStyle,
                    {
                        width: indicatorWidth,
                        left: 0, // translateX handles the horizontal position
                        bottom: 24, // Position the indicator closer to the label
                        pointerEvents: "none", // Allow touch events to pass through
                    },
                ]}
            />
        </View>
    );
}