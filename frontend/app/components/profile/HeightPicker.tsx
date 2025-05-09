// HeightPicker.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Platform,
    Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeightPickerProps {
    feet: number;
    inches: number;
    onHeightChange: (feet: number, inches: number) => void;
}

const HeightPicker: React.FC<HeightPickerProps> = ({ feet, inches, onHeightChange }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tempFeet, setTempFeet] = useState(feet.toString());
    const [tempInches, setTempInches] = useState(inches.toString());

    const feetArray = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
    const inchesArray = Array.from({ length: 12 }, (_, i) => i.toString());

    const handleConfirm = () => {
        onHeightChange(parseInt(tempFeet, 10), parseInt(tempInches, 10));
        setModalVisible(false);
    };

    const handleCancel = () => {
        setTempFeet(feet.toString());
        setTempInches(inches.toString());
        setModalVisible(false);
    };

    const displayValue = `${feet}' ${inches}"`;

    return (
        <View className="mb-6">

            <View className="flex-row border border-discord-card rounded-xl overflow-hidden bg-discord-card/50" style={{ height: 42 }}>
                <View className="bg-discord-accent/10 h-full flex items-center justify-center px-3">
                    <MaterialCommunityIcons name="human-male-height" size={18} color="#5865F2" />
                </View>
                
                <Pressable
                    onPress={() => setModalVisible(true)}
                    className="flex-1 py-2 px-2 flex-row justify-between items-center"
                >
                    <Text className="text-discord-text text-base">
                        {displayValue}
                    </Text>
                    <View className="pr-2">
                        <MaterialCommunityIcons name="chevron-down" size={18} color="#5865F2" />
                    </View>
                </Pressable>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCancel}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={handleCancel}
                >
                    <Pressable
                        className="w-11/12 max-w-xl bg-discord-background rounded-lg overflow-hidden"
                        onPress={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <View className="flex-row justify-between items-center p-6 border-b border-discord-card">
                            <TouchableOpacity onPress={handleCancel}>
                                <Text className="text-discord-accent text-xl">Cancel</Text>
                            </TouchableOpacity>
                            <Text className="text-discord-text text-xl font-semibold">Select Height</Text>
                            <TouchableOpacity onPress={handleConfirm}>
                                <Text className="text-discord-accent text-xl font-semibold">Done</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Picker Container */}
                        <View className="flex-row justify-around bg-discord-card py-8">
                            {/* Feet Picker */}
                            <View className="flex-1">
                                <Picker
                                    selectedValue={tempFeet}
                                    onValueChange={(value) => setTempFeet(value)}
                                    itemStyle={{ color: '#ffffff', fontSize: 20 }}
                                >
                                    {feetArray.map((value) => (
                                        <Picker.Item
                                            key={`feet-${value}`}
                                            label={`${value} ft`}
                                            value={value}
                                            color={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            {/* Inches Picker */}
                            <View className="flex-1">
                                <Picker
                                    selectedValue={tempInches}
                                    onValueChange={(value) => setTempInches(value)}
                                    itemStyle={{ color: '#ffffff', fontSize: 20 }}
                                >
                                    {inchesArray.map((value) => (
                                        <Picker.Item
                                            key={`inches-${value}`}
                                            label={`${value} in`}
                                            value={value}
                                            color={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default HeightPicker;