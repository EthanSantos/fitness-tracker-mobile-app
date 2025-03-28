import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomPicker from '../../ui/CustomPicker';
import { ActivityLevelOptions, FitnessGoalOptions } from '@/app/types';

interface GoalsSectionProps {
    activityLevel: ActivityLevelOptions;
    fitnessGoal: FitnessGoalOptions;
    onActivityLevelChange: (value: ActivityLevelOptions) => void;
    onFitnessGoalChange: (value: FitnessGoalOptions) => void;
    onPrevTab: () => void;
}

const GoalsSection: React.FC<GoalsSectionProps> = ({
    activityLevel,
    fitnessGoal,
    onActivityLevelChange,
    onFitnessGoalChange,
    onPrevTab
}) => {
    // Helper to get activity level description
    const getActivityLevelDescription = (level: ActivityLevelOptions) => {
        switch (level) {
            case 'Sedentary':
                return 'Little to no regular exercise';
            case 'Lightly Active':
                return 'Light exercise 1-3 days per week';
            case 'Moderately Active':
                return 'Moderate exercise 3-5 days per week';
            case 'Very Active':
                return 'Hard exercise 6-7 days per week';
            default:
                return '';
        }
    };

    return (
        <View>
            <CustomPicker
                label="Activity Level"
                selectedValue={activityLevel}
                onValueChange={onActivityLevelChange}
                options={['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']}
                iconName="run-fast"
                iconColor="#5865F2"
            />

            {activityLevel && (
                <View className="mt-0 mb-5 bg-discord-accent/5 p-3 rounded-lg">
                    <Text className="text-discord-text text-sm">
                        {getActivityLevelDescription(activityLevel)}
                    </Text>
                </View>
            )}

            <CustomPicker
                label="Fitness Goal"
                selectedValue={fitnessGoal}
                onValueChange={onFitnessGoalChange}
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
                    onPress={onPrevTab}
                >
                    <MaterialCommunityIcons name="arrow-left" size={20} color="#72767D" style={{ marginRight: 4 }} />
                    <Text className="text-discord-text font-medium">Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GoalsSection;