import React, { useState } from 'react';
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

    const handleSave = () => {
        if (!name || !age || !weight || !height || !gender || !activityLevel || !fitnessGoal) {
            Alert.alert('Incomplete Data', 'Please fill in all fields.');
            return;
        }

        Alert.alert(
            'Profile Saved',
            `Name: ${name}\nAge: ${age}\nWeight: ${weight} lbs\nHeight: ${height} in\nGender: ${gender}\nActivity Level: ${activityLevel}\nFitness Goal: ${fitnessGoal}`
        );
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

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
                                <Text className="text-discord-text text-xl font-semibold mb-4">
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
                            </View>

                            {/* Physical Details Section */}
                            <View>
                                <Text className="text-discord-text text-xl font-semibold mb-4">
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
                                <Text className="text-discord-text text-xl font-semibold mb-4">
                                    Preferences
                                </Text>

                                <CustomPicker
                                    label="Gender"
                                    selectedValue={gender}
                                    onValueChange={setGender}
                                    options={['Male', 'Female']}
                                />

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
