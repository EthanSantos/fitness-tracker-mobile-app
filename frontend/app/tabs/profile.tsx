import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { showToast } from '../components/ShowToast';

import CustomHeader from '../components/Header';
import CustomPicker from '../components/CustomPicker';
import HeightPicker from '../components/HeightPicker';

type GenderOptions = 'Male' | 'Female' | '';
type ActivityLevelOptions = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | '';
type FitnessGoalOptions = 'Lose Weight' | 'Build Muscle' | 'Maintain Weight' | 'Increase Stamina' | 'Improve Flexibility' | 'Enhance Endurance' | '';

type HeightValue = {
    feet: number;
    inches: number;
}

const Profile: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [heightValue, setHeightValue] = useState<HeightValue>({ feet: 5, inches: 0 });
    const [gender, setGender] = useState<GenderOptions>('');
    const [activityLevel, setActivityLevel] = useState<ActivityLevelOptions>('');
    const [fitnessGoal, setFitnessGoal] = useState<FitnessGoalOptions>('');

    const handleHeightChange = (feet: number, inches: number) => {
        setHeightValue({ feet, inches });
    };

    const handleSave = async () => {
        if (!name || !age || !weight || !heightValue || !gender || !activityLevel || !fitnessGoal) {
            showToast("error", "Incomplete Data", "Please fill in all fields.")
            return;
        }

        const updatedProfileData = {
            name,
            age,
            weight,
            height: heightValue,
            gender,
            activityLevel,
            fitnessGoal,
        };

        try {
            const storedData = await AsyncStorage.getItem('userProfile');
            const parsedStoredData = storedData ? JSON.parse(storedData) : null;

            if (parsedStoredData && JSON.stringify(parsedStoredData) === JSON.stringify(updatedProfileData)) {
                showToast("error", "No Changes Detected", "Your profile is already up-to-date.")
                return;
            }

            // send user data to backend fastify api

            const jsonValue = JSON.stringify(updatedProfileData);
            await AsyncStorage.setItem('userProfile', jsonValue);

            showToast("success", "Profile Saved", "Your profile successfully saved!")
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'There was a problem saving your profile.');
        }
    };

    const loadProfile = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem('userProfile');
            if (savedProfile) {
                const profileData = JSON.parse(savedProfile);

                setName(profileData.name || '');
                setAge(profileData.age || '');
                setWeight(profileData.weight || '');
                setHeightValue(profileData.height || { feet: 5, inches: 0 });
                setGender(profileData.gender || '');
                setActivityLevel(profileData.activityLevel || '');
                setFitnessGoal(profileData.fitnessGoal || '');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            Alert.alert('Error', 'There was a problem loading your profile.');
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    // will run whenever th escreen comes into focus (including the first time)
    useFocusEffect(
        useCallback(() => {
            loadProfile();
        }, [])
    );

    return (
        <View style={{ flex: 1 }} className="bg-discord-background">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1">
                        <CustomHeader title="Profile" titleAlign="center" />

                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 160, flexGrow: 1 }}
                            className="flex-1 p-4"
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* Personal Information Section */}
                            <View className="bg-discord-card rounded-xl p-4 mb-6">
                                <Text className="text-discord-text text-2xl font-semibold mb-6">
                                    Personal Information
                                </Text>

                                <Text className="text-discord-text text-lg font-semibold mb-2">
                                    Name
                                </Text>
                                <TextInput
                                    className="bg-discord-background text-discord-text text-lg p-4 rounded-lg mb-6"
                                    placeholder="Enter your name"
                                    placeholderTextColor="#72767D"
                                    value={name}
                                    onChangeText={setName}
                                />

                                <Text className="text-discord-text text-lg font-semibold mb-2">
                                    Age
                                </Text>
                                <TextInput
                                    className="bg-discord-background text-discord-text text-lg p-4 rounded-lg mb-6"
                                    placeholder="Enter your age"
                                    placeholderTextColor="#72767D"
                                    keyboardType="number-pad"
                                    value={age}
                                    onChangeText={setAge}
                                />
                                <CustomPicker
                                    label="Gender"
                                    selectedValue={gender}
                                    onValueChange={setGender}
                                    options={['Male', 'Female']}
                                />
                            </View>

                            {/* Physical Details Section */}
                            <View className="bg-discord-card rounded-xl p-6 mb-6">
                                <Text className="text-discord-text text-2xl font-semibold mb-6">
                                    Physical Details
                                </Text>

                                <Text className="text-discord-text text-lg font-semibold mb-2">
                                    Weight (lbs)
                                </Text>
                                <TextInput
                                    className="bg-discord-background text-discord-text text-lg p-4 rounded-lg mb-6"
                                    placeholder="Enter your weight"
                                    placeholderTextColor="#72767D"
                                    keyboardType="decimal-pad"
                                    value={weight}
                                    onChangeText={setWeight}
                                />

                                <HeightPicker
                                    feet={heightValue.feet}
                                    inches={heightValue.inches}
                                    onHeightChange={handleHeightChange}
                                />
                            </View>

                            {/* Preferences Section */}
                            <View className="bg-discord-card rounded-xl p-6">
                                <Text className="text-discord-text text-2xl font-semibold mb-6">
                                    Preferences
                                </Text>

                                <CustomPicker
                                    label="Activity Level"
                                    selectedValue={activityLevel}
                                    onValueChange={setActivityLevel}
                                    options={['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']}
                                />

                                <CustomPicker
                                    label="Fitness Goal"
                                    selectedValue={fitnessGoal}
                                    onValueChange={setFitnessGoal}
                                    options={[
                                        'Lose Weight',
                                        'Build Muscle',
                                        'Maintain Weight',
                                        'Increase Stamina',
                                        'Improve Flexibility',
                                        'Enhance Endurance',
                                    ]}
                                />
                            </View>
                        </ScrollView>

                        {/* Save Button */}
                        <View className="absolute bottom-0 left-0 right-0 bg-discord-background p-4 border-t border-discord-card">
                            <TouchableOpacity
                                className="bg-discord-accent px-8 py-4 rounded-xl active:opacity-80"
                                onPress={handleSave}
                            >
                                <Text className="text-xl font-semibold text-white text-center">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Profile;
