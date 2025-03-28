import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomPicker from '../../ui/CustomPicker';
import { GenderOptions } from '@/app/types';

interface PersonalSectionProps {
    name: string;
    age: string;
    gender: GenderOptions;
    onNameChange: (value: string) => void;
    onAgeChange: (value: string) => void;
    onGenderChange: (value: GenderOptions) => void;
    onNextTab: () => void;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
    name,
    age,
    gender,
    onNameChange,
    onAgeChange,
    onGenderChange,
    onNextTab
}) => {
    return (
        <View>
            <View className="mb-5">
                <Text className="text-discord-text text-base font-medium mb-2">Full Name</Text>
                <View className="flex-row items-center border border-discord-card rounded-xl overflow-hidden bg-discord-card/50" style={{ height: 46 }}>
                    <View className="bg-discord-accent/10 h-full flex items-center justify-center px-3">
                        <MaterialCommunityIcons name="account" size={18} color="#5865F2" />
                    </View>
                    <TextInput
                        className="flex-1 py-2 px-3 text-discord-text"
                        placeholder="Enter your name"
                        placeholderTextColor="#72767D"
                        value={name}
                        onChangeText={onNameChange}
                    />
                </View>
            </View>

            <View className="mb-5">
                <Text className="text-discord-text text-base font-medium mb-2">Age</Text>
                <View className="flex-row items-center border border-discord-card rounded-xl overflow-hidden bg-discord-card/50" style={{ height: 46 }}>
                    <View className="bg-discord-accent/10 h-full flex items-center justify-center px-3">
                        <MaterialCommunityIcons name="calendar" size={18} color="#5865F2" />
                    </View>
                    <TextInput
                        className="flex-1 py-2 px-3 text-discord-text"
                        placeholder="Enter your age"
                        placeholderTextColor="#72767D"
                        keyboardType="number-pad"
                        value={age}
                        onChangeText={onAgeChange}
                    />
                    <View className="pr-4">
                        <Text className="text-discord-text/70">years</Text>
                    </View>
                </View>
            </View>

            <CustomPicker
                label="Gender"
                selectedValue={gender}
                onValueChange={onGenderChange}
                options={['Male', 'Female']}
                iconName="gender-male-female"
                iconColor="#5865F2"
            />

            <TouchableOpacity 
                className="items-center py-3 bg-discord-accent/10 rounded-xl mt-4 flex-row justify-center"
                onPress={onNextTab}
            >
                <Text className="text-discord-accent font-semibold">Next: Physical Details</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#5865F2" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
        </View>
    );
};

export default PersonalSection;