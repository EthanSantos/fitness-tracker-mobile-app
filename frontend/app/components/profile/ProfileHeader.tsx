import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileHeaderProps {
    name: string;
    totalCompletion: number;
    hasChanges: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    totalCompletion,
    hasChanges
}) => {
    return (
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
    );
};

export default ProfileHeader;