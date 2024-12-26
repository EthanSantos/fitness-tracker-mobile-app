// CustomPicker.tsx
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
import { MaterialIcons } from '@expo/vector-icons';

type CustomPickerProps<T extends string> = {
    label: string;
    selectedValue: T;
    onValueChange: (value: T) => void;
    options: T[];
};

const CustomPicker = <T extends string>({
    label,
    selectedValue,
    onValueChange,
    options,
}: CustomPickerProps<T>) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tempValue, setTempValue] = useState(selectedValue);

    const handleConfirm = () => {
        onValueChange(tempValue);
        setModalVisible(false);
    };

    const handleCancel = () => {
        setTempValue(selectedValue);
        setModalVisible(false);
    };

    return (
        <View className="mb-6">
            <Text className="text-discord-text text-lg font-semibold mb-2">{label}</Text>

            <Pressable
                onPress={() => setModalVisible(true)}
                className="bg-discord-background flex-row items-center justify-between p-4 rounded-lg"
            >
                <Text className={`text-lg ${selectedValue ? 'text-discord-text' : 'text-gray-500'}`}>
                    {selectedValue || `Select ${label}`}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="#DCDDDE" />
            </Pressable>

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
                            <Text className="text-discord-text text-xl font-semibold">Select {label}</Text>
                            <TouchableOpacity onPress={handleConfirm}>
                                <Text className="text-discord-accent text-xl font-semibold">Done</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Picker Container */}
                        <View className="bg-discord-card">
                            <Picker
                                selectedValue={tempValue}
                                onValueChange={(value) => setTempValue(value as T)}
                                itemStyle={{ color: '#ffffff', fontSize: 18, height: 350 }}
                            >
                                {options.map((value) => (
                                    <Picker.Item
                                        key={value}
                                        label={value}
                                        value={value}
                                        color={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default CustomPicker;