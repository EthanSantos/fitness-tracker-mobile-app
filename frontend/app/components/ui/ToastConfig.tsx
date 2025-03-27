import React from "react";
import { View, Text } from "react-native";
import { ToastConfig, BaseToastProps } from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons"; // Import Expo Vector Icons

// Custom Toast Config
export const toastConfig: ToastConfig = {
    success: ({ text1, text2 }: BaseToastProps) => (
        <View className="w-11/12 bg-discord-card p-4 rounded-lg shadow-lg mx-auto mt-4 flex-row items-center">
            {/* Icon */}
            <FontAwesome name="check-circle" size={28} color="#22C55E" />
            {/* Accent line */}
            <View className="w-1 bg-green-500 rounded-l-lg mx-2" />
            {/* Text Content */}
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-1">{text1}</Text>
                <Text className="text-gray-300 text-base">{text2}</Text>
            </View>
        </View>
    ),
    error: ({ text1, text2 }: BaseToastProps) => (
        <View className="w-11/12 bg-discord-card p-4 rounded-lg shadow-lg mx-auto mt-4 flex-row items-center">
            {/* Icon */}
            <FontAwesome name="times-circle" size={28} color="#EF4444" />
            {/* Accent line */}
            <View className="w-1 bg-red-500 rounded-l-lg mx-2" />
            {/* Text Content */}
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-1">{text1}</Text>
                <Text className="text-gray-300 text-base">{text2}</Text>
            </View>
        </View>
    ),
    info: ({ text1, text2 }: BaseToastProps) => (
        <View className="w-11/12 bg-discord-card p-4 rounded-lg shadow-lg mx-auto mt-4 flex-row items-center">
            {/* Icon */}
            <FontAwesome name="info-circle" size={28} color="#3B82F6" />
            {/* Accent line */}
            <View className="w-1 bg-blue-500 rounded-l-lg mx-2" />
            {/* Text Content */}
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-1">{text1}</Text>
                <Text className="text-gray-300 text-base">{text2}</Text>
            </View>
        </View>
    ),
};


export default toastConfig;