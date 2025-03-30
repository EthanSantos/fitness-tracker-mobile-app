import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import showToast from '../ui/ShowToast';
import { GenderOptions, ActivityLevelOptions, FitnessGoalOptions, HeightValue, ProfileData } from '@/app/types';

export const useProfileState = () => {
    // Initialize state with default empty values
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [heightValue, setHeightValue] = useState<HeightValue>({ feet: 5, inches: 0 });
    const [gender, setGender] = useState<GenderOptions>('');
    const [activityLevel, setActivityLevel] = useState<ActivityLevelOptions>('');
    const [fitnessGoal, setFitnessGoal] = useState<FitnessGoalOptions>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Start with false
    const [activeTab, setActiveTab] = useState<'personal' | 'physical' | 'goals'>('personal');
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    
    // Initialize originalData with an empty profile instead of null
    const emptyProfile: ProfileData = {
        name: '',
        age: '',
        weight: '',
        height: { feet: 5, inches: 0 },
        gender: '',
        activityLevel: '',
        fitnessGoal: '',
    };
    
    const [originalData, setOriginalData] = useState<ProfileData>(emptyProfile);

    // Handler for height changes
    const handleHeightChange = useCallback((feet: number, inches: number) => {
        setHeightValue({ feet, inches });
    }, []);

    // Check if current form data differs from saved data
    const checkForChanges = useCallback(() => {
        // Check individual fields to avoid unnecessary string conversions
        return (
            name !== originalData.name ||
            age !== originalData.age || 
            weight !== originalData.weight ||
            heightValue.feet !== originalData.height.feet ||
            heightValue.inches !== originalData.height.inches ||
            gender !== originalData.gender ||
            activityLevel !== originalData.activityLevel ||
            fitnessGoal !== originalData.fitnessGoal
        );
    }, [name, age, weight, heightValue, gender, activityLevel, fitnessGoal, originalData]);

    // Update changes status whenever form data changes
    useEffect(() => {
        setHasChanges(checkForChanges());
    }, [name, age, weight, heightValue, gender, activityLevel, fitnessGoal, checkForChanges]);

    // Save profile data
    const handleSave = async () => {

        setIsSaving(true);

        const updatedProfileData: ProfileData = {
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

    // Discard changes and revert to original data
    const handleDiscard = () => {
        Alert.alert(
            "Discard Changes",
            "Are you sure you want to discard all changes?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Discard",
                    onPress: () => {
                        // Reset form to original data
                        if (originalData) {
                            setName(originalData.name);
                            setAge(originalData.age);
                            setWeight(originalData.weight);
                            setHeightValue(originalData.height);
                            setGender(originalData.gender);
                            setActivityLevel(originalData.activityLevel);
                            setFitnessGoal(originalData.fitnessGoal);
                            setHasChanges(false);
                            
                            showToast("info", "Discarded Changes", "Your changes have been discarded");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    // Load profile from storage
    const loadProfile = useCallback(async () => {
        try {
            setIsLoading(true);
            
            const savedProfile = await AsyncStorage.getItem('userProfile');
            
            // Create default empty profile
            const emptyDefaults: ProfileData = {
                name: '',
                age: '',
                weight: '',
                height: { feet: 5, inches: 0 },
                gender: '',
                activityLevel: '',
                fitnessGoal: '',
            };
            
            if (savedProfile) {
                try {
                    const profileData = JSON.parse(savedProfile);
                    
                    // Create a normalized version of the data with defaults for missing values
                    const normalizedData: ProfileData = {
                        name: profileData.name || '',
                        age: profileData.age || '',
                        weight: profileData.weight || '',
                        height: profileData.height || { feet: 5, inches: 0 },
                        gender: (profileData.gender as GenderOptions) || '',
                        activityLevel: (profileData.activityLevel as ActivityLevelOptions) || '',
                        fitnessGoal: (profileData.fitnessGoal as FitnessGoalOptions) || '',
                    };
                    
                    // Set all state variables at once
                    setName(normalizedData.name);
                    setAge(normalizedData.age);
                    setWeight(normalizedData.weight);
                    setHeightValue(normalizedData.height);
                    setGender(normalizedData.gender);
                    setActivityLevel(normalizedData.activityLevel);
                    setFitnessGoal(normalizedData.fitnessGoal);
                    
                    // Store original data for change detection
                    setOriginalData(normalizedData);
                } catch (parseError) {
                    console.error('Error parsing profile data:', parseError);
                    // If parsing fails, use empty defaults
                    setOriginalData(emptyDefaults);
                }
            } else {
                // If no saved profile, use empty defaults
                setOriginalData(emptyDefaults);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            // Set original data to empty defaults even on error
            const emptyDefaults: ProfileData = {
                name: '',
                age: '',
                weight: '',
                height: { feet: 5, inches: 0 },
                gender: '',
                activityLevel: '',
                fitnessGoal: '',
            };
            setOriginalData(emptyDefaults);
            Alert.alert('Error', 'There was a problem loading your profile.');
        } finally {
            // Always set isLoading to false when done
            setIsLoading(false);
        }
    }, []);

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

    // Calculate total completion percentage
    const getTotalCompletion = () => {
        const personalCompletion = getSectionCompletion('personal');
        const physicalCompletion = getSectionCompletion('physical');
        const goalsCompletion = getSectionCompletion('goals');
        return Math.round((personalCompletion + physicalCompletion + goalsCompletion) / 3);
    };

    // Handle tab switching with confirmation when there are unsaved changes
    const handleTabSwitch = (newTab: 'personal' | 'physical' | 'goals') => {
        if (hasChanges) {
            Alert.alert(
                "Unsaved Changes",
                "You have unsaved changes. What would you like to do?",
                [
                    {
                        text: "Stay Here",
                        style: "cancel"
                    },
                    {
                        text: "Discard Changes",
                        onPress: () => {
                            // Reset form to original data and switch tab
                            if (originalData) {
                                setName(originalData.name);
                                setAge(originalData.age);
                                setWeight(originalData.weight);
                                setHeightValue(originalData.height);
                                setGender(originalData.gender);
                                setActivityLevel(originalData.activityLevel);
                                setFitnessGoal(originalData.fitnessGoal);
                                setHasChanges(false);
                            }
                            setActiveTab(newTab);
                        },
                        style: "destructive"
                    },
                    {
                        text: "Save Changes",
                        onPress: async () => {
                            await handleSave();
                            setActiveTab(newTab);
                        }
                    }
                ]
            );
        } else {
            setActiveTab(newTab);
        }
    };

    return {
        // State
        name,
        setName,
        age,
        setAge,
        weight,
        setWeight,
        heightValue,
        gender,
        setGender,
        activityLevel,
        setActivityLevel,
        fitnessGoal,
        setFitnessGoal,
        isSaving,
        isLoading,
        activeTab,
        hasChanges,
        
        // Derived values
        personalCompletion: getSectionCompletion('personal'),
        physicalCompletion: getSectionCompletion('physical'),
        goalsCompletion: getSectionCompletion('goals'),
        totalCompletion: getTotalCompletion(),
        
        // Methods
        handleHeightChange,
        handleSave,
        handleDiscard,
        loadProfile,
        handleTabSwitch,
    };
};

export default useProfileState;