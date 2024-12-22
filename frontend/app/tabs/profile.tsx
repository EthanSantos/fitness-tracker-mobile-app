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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import CustomHeader from '../components/Header';
import CustomPicker from '../components/CustomPicker';

type GenderOptions = 'Male' | 'Female' | '';
type ActivityLevelOptions = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | '';
type FitnessGoalOptions = 'Lose Weight' | 'Build Muscle' | 'Maintain Weight' | 'Increase Stamina' | 'Improve Flexibility' | 'Enhance Endurance' | '';

const Profile: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [gender, setGender] = useState<GenderOptions>('');
    const [activityLevel, setActivityLevel] = useState<ActivityLevelOptions>('');
    const [fitnessGoal, setFitnessGoal] = useState<FitnessGoalOptions>('');

    const showToast = (type: string, text1: string, text2: string) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    };


    const handleSave = async () => {
        if (!name || !age || !weight || !height || !gender || !activityLevel || !fitnessGoal) {
            showToast("error", "Incomplete Data", "Please fill in all fields.")
            return;
        }

        const profileData = {
            name,
            age,
            weight,
            height,
            gender,
            activityLevel,
            fitnessGoal,
        };

        try {
            const jsonValue = JSON.stringify(profileData);

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

                console.log("Profile loaded", profileData)

                // Update state variables with loaded data
                setName(profileData.name || '');
                setAge(profileData.age || '');
                setWeight(profileData.weight || '');
                setHeight(profileData.height || '');
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
        <>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View className="flex-1 bg-discord-background">
                    <CustomHeader title="Profile" titleAlign="center" />

                    <ScrollView
                        contentContainerStyle={{
                            paddingBottom: 80, // Adjust for navigation bar height
                        }}
                    >
                        <View className="px-6 py-10 space-y-8">
                            {/* Personal Information Section */}
                            <View>
                                <Text className="text-discord-text text-2xl font-semibold mb-4">
                                    Personal Information
                                </Text>

                                <Text className="text-discord-text text-lg font-semibold mb-2">
                                    Name
                                </Text>
                                <TextInput
                                    className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
                                    placeholder="Enter your name"
                                    placeholderTextColor="#72767D"
                                    value={name}
                                    onChangeText={setName}
                                />

                                <Text className="text-discord-text text-lg font-semibold mb-2">
                                    Age
                                </Text>
                                <TextInput
                                    className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
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
                            <View>
                                <Text className="text-discord-text text-2xl font-semibold mb-4">
                                    Physical Details
                                </Text>

                                <Text className="text-discord-text text-lg font-semibold mb-2">
                                    Weight (lbs)
                                </Text>
                                <TextInput
                                    className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
                                    placeholder="Enter your weight"
                                    placeholderTextColor="#72767D"
                                    keyboardType="decimal-pad"
                                    value={weight}
                                    onChangeText={setWeight}
                                />

                                <Text className="text-discord-text text-lg font-semibold mb-2">
                                    Height (inches)
                                </Text>
                                <TextInput
                                    className="bg-discord-card text-discord-text text-lg p-4 rounded-lg mb-4"
                                    placeholder="Enter your height"
                                    placeholderTextColor="#72767D"
                                    keyboardType="decimal-pad"
                                    value={height}
                                    onChangeText={setHeight}
                                />
                            </View>

                            {/* Preferences Section */}
                            <View>
                                <Text className="text-discord-text text-2xl font-semibold mb-4">
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

                            {/* Save Button */}
                            <TouchableOpacity
                                className="bg-discord-accent px-8 py-4 rounded-xl active:opacity-80 shadow-lg"
                                onPress={handleSave}
                            >
                                <Text className="text-xl font-semibold text-white text-center">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>

        </>
    );
};

export default Profile;
