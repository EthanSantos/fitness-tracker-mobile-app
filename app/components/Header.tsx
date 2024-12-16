import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

type HeaderProps = {
    title: string;
    onBack?: () => void;
    titleAlign?: 'left' | 'center'; // New optional prop for alignment
};

const CustomHeader: React.FC<HeaderProps> = ({ title, onBack, titleAlign = 'left' }) => {
    return (
        <SafeAreaView edges={['top', 'left', 'right']} className="bg-discord-background">
            <View className="flex-row items-center justify-between px-4 py-4">
                {/* Left Section: Back Button */}
                <View className="w-12">
                    {onBack ? (
                        <TouchableOpacity onPress={onBack} className="mr-4">
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                    ) : (
                        // Placeholder to maintain symmetry when no back button is present
                        <View style={{ width: 24, height: 24 }} />
                    )}
                </View>

                {/* Center Section: Title */}
                <View
                    className={`flex-1 items-${titleAlign === 'center' ? 'center' : 'flex-start'}`}
                >
                    <Text className="text-discord-text font-bold text-4xl tracking-wide leading-none">
                        {title}
                    </Text>
                </View>

                {/* Right Section: Placeholder for symmetry */}
                <View className="w-12">
                    {/* Future right-side buttons can be added here */}
                    {/* Currently empty to maintain symmetry */}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;
