import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type TabType = 'personal' | 'physical' | 'goals';

interface ProfileTabNavigationProps {
    activeTab: TabType;
    personalCompletion: number;
    physicalCompletion: number;
    goalsCompletion: number;
    onTabPress: (tab: TabType) => void;
}

const ProfileTabNavigation: React.FC<ProfileTabNavigationProps> = ({
    activeTab,
    personalCompletion,
    physicalCompletion,
    goalsCompletion,
    onTabPress
}) => {
    // Icon type from Material Community Icons
    type IconName = "account-details" | "scale-bathroom" | "target";
    
    // Tab configuration for cleaner rendering
    const tabs: Array<{
        id: TabType;
        label: string;
        icon: IconName;
        completion: number;
    }> = [
        {
            id: 'personal',
            label: 'Personal',
            icon: "account-details",
            completion: personalCompletion
        },
        {
            id: 'physical',
            label: 'Physical',
            icon: "scale-bathroom",
            completion: physicalCompletion
        },
        {
            id: 'goals',
            label: 'Goals',
            icon: "target",
            completion: goalsCompletion
        }
    ];

    return (
        <View className="flex-row mt-4 mx-4 mb-2 bg-discord-card/50 rounded-xl overflow-hidden">
            {tabs.map(tab => (
                <TouchableOpacity 
                    key={tab.id}
                    className={`flex-1 py-3 px-2 items-center ${activeTab === tab.id ? 'bg-discord-accent/10' : ''}`}
                    onPress={() => onTabPress(tab.id)}
                >
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons 
                            name={tab.icon} 
                            size={20} 
                            color={activeTab === tab.id ? '#5865F2' : '#72767D'} 
                        />
                        <Text className={`ml-1 ${activeTab === tab.id ? 'text-discord-accent font-medium' : 'text-discord-text/70'}`}>
                            {tab.label}
                        </Text>
                    </View>
                    {tab.completion < 100 && (
                        <View className="w-2 h-2 absolute top-1 right-1 bg-discord-accent rounded-full" />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ProfileTabNavigation;