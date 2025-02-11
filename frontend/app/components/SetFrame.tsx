import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';

import "../../global.css";

type SetProps = {
    index: number;
    item: { reps: number; weight: number };
    onDelete: (index: number) => void;
};

const SetFrame: React.FC<SetProps> = ({ index, item, onDelete }) => {
    return (
        <SwipeRow
            rightOpenValue={-75} // Swipe distance for the delete button
            disableRightSwipe={true} // Prevent swiping to the right
        >
            {/* Hidden Row (Delete Button) */}
            <View className="bg-discord-error justify-center items-end px-4 rounded-lg mb-3">
                <TouchableOpacity
                    onPress={() => onDelete(index)}
                    className="justify-center items-center h-full"
                >
                    <Text className="text-white text-lg font-bold tracking-wide">Delete</Text>
                </TouchableOpacity>
            </View>

            {/* Visible Row */}
            <View className="flex-row justify-between items-center p-4 bg-discord-extraCard rounded-lg mb-3">
                <Text className="text-lg font-semibold text-discord-text">
                    Set {index + 1}
                </Text>
                <Text className="text-sm text-discord-muted">
                    {item.reps} reps @ {item.weight} lbs
                </Text>
            </View>
        </SwipeRow>

    );
};

export default SetFrame;
