import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SaveDiscardFooterProps {
    hasChanges: boolean;
    isSaving: boolean;
    onSave: () => void;
    onDiscard: () => void;
}

const SaveDiscardFooter: React.FC<SaveDiscardFooterProps> = ({
    hasChanges,
    isSaving,
    onSave,
    onDiscard
}) => {
    if (!hasChanges) {
        return null;
    }

    return (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-discord-background/95 border-t border-discord-card">
            <View className="flex-row justify-between gap-4">
                <TouchableOpacity
                    className="flex-1 bg-discord-card py-3 rounded-xl flex-row justify-center items-center shadow-sm"
                    onPress={onDiscard}
                >
                    <MaterialCommunityIcons name="close" size={20} color="#72767D" style={{ marginRight: 8 }} />
                    <Text className="text-discord-text font-semibold text-base">Discard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 bg-discord-accent py-3 rounded-xl flex-row justify-center items-center shadow-sm"
                    onPress={onSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <>
                            <MaterialCommunityIcons name="content-save-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                            <Text className="text-white font-semibold text-base">Save</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SaveDiscardFooter;