import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import CustomHeader from './components/Header';

import "../global.css";

export default function Home() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const handleSave = () => {
        Alert.alert('Profile Saved', `Age: ${age}\nWeight: ${weight}\nHeight: ${height}`);
    };

    return (
        <View className="flex-1 bg-discord-background">
            <CustomHeader title="Profile" titleAlign="center" />

            <View className="px-6 py-10">
                <View className="mb-6">
                    <Text className="text-discord-text text-lg mb-2">Age</Text>
                    <TextInput
                        className="bg-discord-card text-discord-text px-4 py-2 rounded-md"
                        placeholder="Enter your age"
                        placeholderTextColor="#B9BBBE"
                        keyboardType="number-pad"
                        value={age}
                        onChangeText={setAge}
                    />
                </View>

                <View className="mb-6">
                    <Text className="text-discord-text text-lg mb-2">Weight (lbs)</Text>
                    <TextInput
                        className="bg-discord-card text-discord-text px-4 py-2 rounded-md"
                        placeholder="Enter your weight"
                        placeholderTextColor="#B9BBBE"
                        keyboardType="decimal-pad"
                        value={weight}
                        onChangeText={setWeight}
                    />
                </View>

                <View className="mb-10">
                    <Text className="text-discord-text text-lg mb-2">Height (inches)</Text>
                    <TextInput
                        className="bg-discord-card text-discord-text px-4 py-2 rounded-md"
                        placeholder="Enter your height"
                        placeholderTextColor="#B9BBBE"
                        keyboardType="decimal-pad"
                        value={height}
                        onChangeText={setHeight}
                    />
                </View>

                <TouchableOpacity
                    className="bg-discord-accent px-8 py-4 rounded-xl active:opacity-80 shadow-lg"
                    onPress={handleSave}
                >
                    <Text className="text-xl font-semibold text-white text-center">Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
