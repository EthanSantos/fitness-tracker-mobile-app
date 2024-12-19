import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';
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
    const [searchText, setSearchText] = useState('');

    const handleSelect = (value: T) => {
        onValueChange(value);
        setModalVisible(false);
        setSearchText('');
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View className="mb-6">
            <Text className="text-discord-text text-lg font-semibold mb-2">{label}</Text>
            <TouchableOpacity
                className="bg-discord-card flex-row items-center justify-between p-4 rounded-lg border border-discord-muted"
                onPress={() => setModalVisible(true)}
                accessibilityLabel={`Select ${label}`}
                accessibilityRole="button"
            >
                <Text className={`text-lg ${selectedValue ? 'text-discord-text' : 'text-gray-500'}`}>
                    {selectedValue || `Select ${label}`}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="#DCDDDE" />
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View className="bg-discord-modal w-11/12 max-h-3/4 rounded-lg p-6">
                            <Text className="text-discord-text text-lg font-semibold mb-4">{label}</Text>

                            {/* Search Bar */}
                            <TextInput
                                className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
                                placeholder={`Search ${label}`}
                                placeholderTextColor="#72767D"
                                value={searchText}
                                onChangeText={setSearchText}
                            />

                            <FlatList
                                data={filteredOptions}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        className="py-3 border-b border-discord-muted"
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text className="text-discord-text text-lg">{item}</Text>
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={
                                    <Text className="text-discord-text text-center text-lg">
                                        No options found.
                                    </Text>
                                }
                            />

                            <TouchableOpacity
                                className="mt-4 bg-discord-accent px-6 py-3 rounded-lg items-center"
                                onPress={() => {
                                    setModalVisible(false);
                                    setSearchText('');
                                }}
                            >
                                <Text className="text-white text-lg font-semibold">Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default CustomPicker;
