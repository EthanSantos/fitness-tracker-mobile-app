import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeightPicker from '../HeightPicker';
import { HeightValue } from '@/app/types';

interface PhysicalSectionProps {
    weight: string;
    heightValue: HeightValue;
    onWeightChange: (value: string) => void;
    onHeightChange: (feet: number, inches: number) => void;
    onNextTab: () => void;
    onPrevTab: () => void;
}

const PhysicalSection: React.FC<PhysicalSectionProps> = ({
    weight,
    heightValue,
    onWeightChange,
    onHeightChange,
    onNextTab,
    onPrevTab
}) => {
    return (
        <View>
            <View className="mb-5">
                <Text className="text-discord-text text-base font-medium mb-2">Weight</Text>
                <View className="flex-row items-center border border-discord-card rounded-xl overflow-hidden bg-discord-card/50" style={{ height: 46 }}>
                    <View className="bg-discord-accent/10 h-full flex items-center justify-center px-3">
                        <MaterialCommunityIcons name="weight" size={18} color="#5865F2" />
                    </View>
                    <TextInput
                        className="flex-1 py-2 px-3 text-discord-text"
                        placeholder="Enter your weight"
                        placeholderTextColor="#72767D"
                        keyboardType="decimal-pad"
                        value={weight}
                        onChangeText={onWeightChange}
                    />
                    <View className="pr-4">
                        <Text className="text-discord-text/70">lbs</Text>
                    </View>
                </View>
            </View>

            <View className="mb-5">
                <Text className="text-discord-text text-base font-medium mb-2">Height</Text>
                <HeightPicker
                    feet={heightValue.feet}
                    inches={heightValue.inches}
                    onHeightChange={onHeightChange}
                />
            </View>

            <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                    className="py-3 bg-discord-card rounded-xl px-5 flex-row items-center"
                    onPress={onPrevTab}
                >
                    <MaterialCommunityIcons name="arrow-left" size={20} color="#72767D" style={{ marginRight: 4 }} />
                    <Text className="text-discord-text font-medium">Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="py-3 bg-discord-accent/10 rounded-xl px-5 flex-row items-center"
                    onPress={onNextTab}
                >
                    <Text className="text-discord-accent font-medium">Next: Goals</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="#5865F2" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PhysicalSection;