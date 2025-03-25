import React, { useState, useCallback, useEffect } from 'react';
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
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { showToast } from '../components/ShowToast';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

type ProfileData = {
    name: string;
    age: string;
    weight: string;
    height: HeightValue;
    gender: GenderOptions;
    activityLevel: ActivityLevelOptions;
    fitnessGoal: FitnessGoalOptions;
}

const Profile: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [heightValue, setHeightValue] = useState<HeightValue>({ feet: 5, inches: 0 });
    const [gender, setGender] = useState<GenderOptions>('');
    const [activityLevel, setActivityLevel] = useState<ActivityLevelOptions>('');
    const [fitnessGoal, setFitnessGoal] = useState<FitnessGoalOptions>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<'personal' | 'physical' | 'goals'>('personal');
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [originalData, setOriginalData] = useState<ProfileData | null>(null);

    const handleHeightChange = (feet: number, inches: number) => {
        setHeightValue({ feet, inches });
    };

    // Check if current form data differs from saved data
    const checkForChanges = useCallback(() => {
        if (!originalData) return false;
        
        const currentData = {
            name,
            age,
            weight,
            height: heightValue,
            gender,
            activityLevel,
            fitnessGoal,
        };
        
        return JSON.stringify(currentData) !== JSON.stringify(originalData);
    }, [name, age, weight, heightValue, gender, activityLevel, fitnessGoal, originalData]);

    // Update changes status whenever form data changes
    useEffect(() => {
        setHasChanges(checkForChanges());
    }, [name, age, weight, heightValue, gender, activityLevel, fitnessGoal, checkForChanges]);

    const handleSave = async () => {
        if (!name || !age || !weight || !heightValue || !gender || !activityLevel || !fitnessGoal) {
            showToast("error", "Incomplete Data", "Please fill in all fields.")
            return;
        }

        setIsSaving(true);

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
            // send user data to backend fastify api
            // API call would go here

            const jsonValue = JSON.stringify(updatedProfileData);
            await AsyncStorage.setItem('userProfile', jsonValue);
            
            // Update original data to match current data
            setOriginalData(updatedProfileData);
            setHasChanges(false);

            showToast("success", "Profile Saved", "Your profile has been successfully saved!")
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'There was a problem saving your profile.');
        } finally {
            setIsSaving(false);
        }
    };

    const loadProfile = async () => {
        setIsLoading(true);
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
                
                // Store original data for change detection
                setOriginalData(profileData);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            Alert.alert('Error', 'There was a problem loading your profile.');
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to get completion percentage for each section
    const getSectionCompletion = (section: 'personal' | 'physical' | 'goals') => {
        let filled = 0;
        let total = 0;
        
        if (section === 'personal') {
            total = 3;
            filled = (name ? 1 : 0) + (age ? 1 : 0) + (gender ? 1 : 0);
        } else if (section === 'physical') {
            total = 2;
            filled = (weight ? 1 : 0) + ((heightValue.feet || heightValue.inches) ? 1 : 0);
        } else if (section === 'goals') {
            total = 2;
            filled = (activityLevel ? 1 : 0) + (fitnessGoal ? 1 : 0);
        }
        
        return Math.round((filled / total) * 100);
    };

    // will run whenever the screen comes into focus (including the first time)
    useFocusEffect(
        useCallback(() => {
            loadProfile();
        }, [])
    );

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-discord-background">
                <ActivityIndicator size="large" color="#5865F2" />
                <Text className="mt-4 text-discord-text">Loading your profile...</Text>
            </View>
        );
    }

    // Calculate current step progress
    const personalCompletion = getSectionCompletion('personal');
    const physicalCompletion = getSectionCompletion('physical');
    const goalsCompletion = getSectionCompletion('goals');
    const totalCompletion = Math.round((personalCompletion + physicalCompletion + goalsCompletion) / 3);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 bg-discord-background">
                    {/* Top Profile Card */}
                    <View className="bg-discord-accent pt-16 pb-6 px-5 rounded-b-3xl shadow-md">
                        <View className="flex-row items-center justify-between">
                            <View>
                                <Text className="text-white text-2xl font-bold">
                                    {name ? `Hello, ${name.split(' ')[0]}!` : 'Your Profile'}
                                </Text>
                                <Text className="text-white/80 mt-1">
                                    {totalCompletion < 100 
                                        ? `Your profile is ${totalCompletion}% complete` 
                                        : 'Your profile is complete!'}
                                </Text>
                                {hasChanges && (
                                    <Text className="text-white/70 text-sm mt-1 italic">
                                        You have unsaved changes
                                    </Text>
                                )}
                            </View>
                            <View className="h-16 w-16 bg-white/20 rounded-full items-center justify-center shadow-sm">
                                <MaterialCommunityIcons name="account" size={32} color="#fff" />
                            </View>
                        </View>
                        
                        {/* Progress bar */}
                        <View className="mt-4 bg-white/20 h-3 rounded-full overflow-hidden">
                            <View 
                                className="h-full bg-white"
                                style={{ width: `${totalCompletion}%` }}
                            />
                        </View>
                    </View>
                    
                    {/* Tab Navigation */}
                    <View className="flex-row mt-4 mx-4 mb-2 bg-discord-card/50 rounded-xl overflow-hidden">
                        <TouchableOpacity 
                            className={`flex-1 py-3 px-2 items-center ${activeTab === 'personal' ? 'bg-discord-accent/10' : ''}`}
                            onPress={() => setActiveTab('personal')}
                        >
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons 
                                    name="account-details" 
                                    size={20} 
                                    color={activeTab === 'personal' ? '#5865F2' : '#72767D'} 
                                />
                                <Text className={`ml-1 ${activeTab === 'personal' ? 'text-discord-accent font-medium' : 'text-discord-text/70'}`}>
                                    Personal
                                </Text>
                            </View>
                            {personalCompletion < 100 && (
                                <View className="w-2 h-2 absolute top-1 right-1 bg-discord-accent rounded-full" />
                            )}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            className={`flex-1 py-3 px-2 items-center ${activeTab === 'physical' ? 'bg-discord-accent/10' : ''}`}
                            onPress={() => setActiveTab('physical')}
                        >
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons 
                                    name="scale-bathroom" 
                                    size={20} 
                                    color={activeTab === 'physical' ? '#5865F2' : '#72767D'} 
                                />
                                <Text className={`ml-1 ${activeTab === 'physical' ? 'text-discord-accent font-medium' : 'text-discord-text/70'}`}>
                                    Physical
                                </Text>
                            </View>
                            {physicalCompletion < 100 && (
                                <View className="w-2 h-2 absolute top-1 right-1 bg-discord-accent rounded-full" />
                            )}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            className={`flex-1 py-3 px-2 items-center ${activeTab === 'goals' ? 'bg-discord-accent/10' : ''}`}
                            onPress={() => setActiveTab('goals')}
                        >
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons 
                                    name="target" 
                                    size={20} 
                                    color={activeTab === 'goals' ? '#5865F2' : '#72767D'} 
                                />
                                <Text className={`ml-1 ${activeTab === 'goals' ? 'text-discord-accent font-medium' : 'text-discord-text/70'}`}>
                                    Goals
                                </Text>
                            </View>
                            {goalsCompletion < 100 && (
                                <View className="w-2 h-2 absolute top-1 right-1 bg-discord-accent rounded-full" />
                            )}
                        </TouchableOpacity>
                    </View>

                    <ScrollView 
                        className="flex-1 px-5 pt-2"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        {/* Personal Tab */}
                        {activeTab === 'personal' && (
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
                                            onChangeText={setName}
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
                                            onChangeText={setAge}
                                        />
                                        <View className="pr-4">
                                            <Text className="text-discord-text/70">years</Text>
                                        </View>
                                    </View>
                                </View>

                                <CustomPicker
                                    label="Gender"
                                    selectedValue={gender}
                                    onValueChange={setGender}
                                    options={['Male', 'Female']}
                                    iconName="gender-male-female"
                                    iconColor="#5865F2"
                                />

                                <TouchableOpacity 
                                    className="items-center py-3 bg-discord-accent/10 rounded-xl mt-4 flex-row justify-center"
                                    onPress={() => setActiveTab('physical')}
                                >
                                    <Text className="text-discord-accent font-semibold">Next: Physical Details</Text>
                                    <MaterialCommunityIcons name="arrow-right" size={20} color="#5865F2" style={{ marginLeft: 4 }} />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Physical Tab */}
                        {activeTab === 'physical' && (
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
                                            onChangeText={setWeight}
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
                                        onHeightChange={handleHeightChange}
                                    />
                                </View>

                                <View className="flex-row justify-between mt-4">
                                    <TouchableOpacity 
                                        className="py-3 bg-discord-card rounded-xl px-5 flex-row items-center"
                                        onPress={() => setActiveTab('personal')}
                                    >
                                        <MaterialCommunityIcons name="arrow-left" size={20} color="#72767D" style={{ marginRight: 4 }} />
                                        <Text className="text-discord-text font-medium">Back</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        className="py-3 bg-discord-accent/10 rounded-xl px-5 flex-row items-center"
                                        onPress={() => setActiveTab('goals')}
                                    >
                                        <Text className="text-discord-accent font-medium">Next: Goals</Text>
                                        <MaterialCommunityIcons name="arrow-right" size={20} color="#5865F2" style={{ marginLeft: 4 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {/* Goals Tab */}
                        {activeTab === 'goals' && (
                            <View>
                                <CustomPicker
                                    label="Activity Level"
                                    selectedValue={activityLevel}
                                    onValueChange={setActivityLevel}
                                    options={['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']}
                                    iconName="run-fast"
                                    iconColor="#5865F2"
                                />
                                
                                {activityLevel && (
                                    <View className="mt-0 mb-5 bg-discord-accent/5 p-3 rounded-lg">
                                        <Text className="text-discord-text text-sm">
                                            {activityLevel === 'Sedentary' && 'Little to no regular exercise'}
                                            {activityLevel === 'Lightly Active' && 'Light exercise 1-3 days per week'}
                                            {activityLevel === 'Moderately Active' && 'Moderate exercise 3-5 days per week'}
                                            {activityLevel === 'Very Active' && 'Hard exercise 6-7 days per week'}
                                        </Text>
                                    </View>
                                )}

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
                                    iconName="trophy-outline"
                                    iconColor="#5865F2"
                                />

                                <View className="flex-row justify-start mt-4">
                                    <TouchableOpacity 
                                        className="py-3 bg-discord-card rounded-xl px-5 flex-row items-center"
                                        onPress={() => setActiveTab('physical')}
                                    >
                                        <MaterialCommunityIcons name="arrow-left" size={20} color="#72767D" style={{ marginRight: 4 }} />
                                        <Text className="text-discord-text font-medium">Back</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    {/* Fixed Save Button - Only visible when there are changes */}
                    {hasChanges && (
                        <View className="absolute bottom-0 left-0 right-0 p-4 bg-discord-background/95 border-t border-discord-card">
                            <TouchableOpacity
                                className="bg-discord-accent py-3 rounded-xl flex-row justify-center items-center shadow-sm"
                                onPress={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <ActivityIndicator color="#FFFFFF" size="small" />
                                ) : (
                                    <>
                                        <MaterialCommunityIcons name="content-save-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                                        <Text className="text-white font-semibold text-base">Save Profile</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Profile;