import React, { useCallback } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Components
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabNavigation from '../components/profile/ProfileTabNavigation';
import PersonalSection from '../components/profile/sections/PersonalSection';
import PhysicalSection from '../components/profile/sections/PhysicalSection';
import GoalsSection from '../components/profile/sections/GoalsSection';
import SaveDiscardFooter from '../components/profile/SaveDiscardFooter';

// Custom hook for state management
import useProfileState from '../components/profile/useProfileState';

const Profile: React.FC = () => {
    const profileState = useProfileState();
    
    // Destructure values from the hook
    const {
        name, setName,
        age, setAge,
        weight, setWeight,
        heightValue,
        gender, setGender,
        activityLevel, setActivityLevel,
        fitnessGoal, setFitnessGoal,
        isSaving,
        isLoading,
        activeTab,
        hasChanges,
        
        // Derived values
        personalCompletion,
        physicalCompletion,
        goalsCompletion,
        totalCompletion,
        
        // Methods
        handleHeightChange,
        handleSave,
        handleDiscard,
        loadProfile,
        handleTabSwitch,
    } = profileState;

    // Load profile data when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadProfile();
        }, [])
    );

    // Show loading indicator while profile data is being loaded
    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-discord-background">
                <ActivityIndicator size="large" color="#5865F2" />
                <Text className="mt-4 text-discord-text">Loading your profile...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 bg-discord-background">
                    {/* Header with profile info and progress */}
                    <ProfileHeader 
                        name={name} 
                        totalCompletion={totalCompletion}
                        hasChanges={hasChanges} 
                    />
                    
                    {/* Tab Navigation */}
                    <ProfileTabNavigation 
                        activeTab={activeTab}
                        personalCompletion={personalCompletion}
                        physicalCompletion={physicalCompletion}
                        goalsCompletion={goalsCompletion}
                        onTabPress={handleTabSwitch}
                    />

                    {/* Content Sections */}
                    <ScrollView 
                        className="flex-1 px-5 pt-2"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        {/* Personal Tab */}
                        {activeTab === 'personal' && (
                            <PersonalSection 
                                name={name}
                                age={age}
                                gender={gender}
                                onNameChange={setName}
                                onAgeChange={setAge}
                                onGenderChange={setGender}
                                onNextTab={() => handleTabSwitch('physical')}
                            />
                        )}

                        {/* Physical Tab */}
                        {activeTab === 'physical' && (
                            <PhysicalSection 
                                weight={weight}
                                heightValue={heightValue}
                                onWeightChange={setWeight}
                                onHeightChange={handleHeightChange}
                                onNextTab={() => handleTabSwitch('goals')}
                                onPrevTab={() => handleTabSwitch('personal')}
                            />
                        )}

                        {/* Goals Tab */}
                        {activeTab === 'goals' && (
                            <GoalsSection 
                                activityLevel={activityLevel}
                                fitnessGoal={fitnessGoal}
                                onActivityLevelChange={setActivityLevel}
                                onFitnessGoalChange={setFitnessGoal}
                                onPrevTab={() => handleTabSwitch('physical')}
                            />
                        )}
                    </ScrollView>

                    {/* Save/Discard Footer */}
                    <SaveDiscardFooter 
                        hasChanges={hasChanges}
                        isSaving={isSaving}
                        onSave={handleSave}
                        onDiscard={handleDiscard}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Profile;