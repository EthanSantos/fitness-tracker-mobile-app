// CustomPicker.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Platform,
    Pressable,
    ViewStyle,
    TextStyle,
    StyleProp,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

type CustomPickerProps<T extends string> = {
    label: string;
    selectedValue: T;
    onValueChange: (value: T) => void;
    options: T[];
    // styling props
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    pickerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    // Icon props
    iconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    iconColor?: string;
    iconSize?: number;
    // Class names for tailwind
    containerClassName?: string;
    pickerClassName?: string;
    labelClassName?: string;
    iconContainerClassName?: string;
};

const CustomPicker = <T extends string>({
    label,
    selectedValue,
    onValueChange,
    options,
    containerStyle,
    labelStyle,
    pickerStyle,
    textStyle,
    iconName,
    iconColor = "#5865F2",
    iconSize = 20,
    containerClassName = "",
    pickerClassName = "",
    labelClassName = "",
    iconContainerClassName = "",
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
        <View style={containerStyle} className={`mb-6 ${containerClassName}`}>
            <Text 
                style={labelStyle} 
                className={`text-discord-text text-base font-medium mb-2 ${labelClassName}`}
            >
                {label}
            </Text>

            <View className={`flex-row border border-discord-card rounded-xl overflow-hidden bg-discord-card/50 ${pickerClassName}`} style={[{ height: 42 }, pickerStyle]}>
                {iconName && (
                    <View className={`bg-discord-accent/10 h-full flex items-center justify-center px-3 ${iconContainerClassName}`}>
                        <MaterialCommunityIcons name={iconName} size={18} color={iconColor} />
                    </View>
                )}
                
                <Pressable
                    onPress={() => setModalVisible(true)}
                    className="flex-1 py-2 px-2 flex-row justify-between items-center"
                >
                    <Text 
                        style={textStyle}
                        className={`text-base ${selectedValue ? 'text-discord-text' : 'text-gray-500'}`}
                    >
                        {selectedValue || `Select ${label}`}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={22} color="#DCDDDE" />
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