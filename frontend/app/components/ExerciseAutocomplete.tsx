import React, { useState, useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Keyboard } from "react-native";
import "../../global.css";
import { exerciseSuggestions } from './ExerciseSuggestions';

type Suggestion = string;

type ExerciseAutocompleteProps = {
    exerciseName: string;
    setExerciseName: (name: string) => void;
};

const ExerciseAutocomplete: React.FC<ExerciseAutocompleteProps> = ({
    exerciseName,
    setExerciseName,
}) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
    const inputRef = useRef<TextInput>(null);

    const handleInputChange = (text: string) => {
        setExerciseName(text);
        if (text.length > 0) {
            const filtered = exerciseSuggestions.filter((exercise) =>
                exercise.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionPress = (suggestion: Suggestion) => {
        setExerciseName(suggestion);
        setFilteredSuggestions([]);
        Keyboard.dismiss();
        inputRef.current?.blur();
    };

    return (
        <View>
            <TextInput
                ref={inputRef}
                className="bg-discord-card text-white text-lg p-4 rounded-lg mb-2"
                placeholder="Enter Exercise Name"
                placeholderTextColor="#9CA3AF"
                value={exerciseName}
                onChangeText={handleInputChange}
            />

            {filteredSuggestions.length > 0 && (
                <FlatList
                    data={filteredSuggestions}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => handleSuggestionPress(item)}
                            // Each item has padding, vertical spacing, and a border between them.
                            className={`p-4 flex-row items-center ${index < filteredSuggestions.length - 1 ? 'border-b border-discord-card' : ''
                                }`}
                        >
                            <Text className="text-discord-text text-base">{item}</Text>
                        </TouchableOpacity>
                    )}
                    // The list container has a slight border, rounded corners, and a limited height.
                    className="rounded-lg max-h-40 mb-4 bg-discord-modal border border-discord-card"
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
};

export default ExerciseAutocomplete;
