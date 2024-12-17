import React, { useState, useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Keyboard } from "react-native";
import "../../global.css";

import { exerciseSuggestions } from './ExerciseSuggestions';

type Suggestion = string;

type ExerciseAutocompleteProps = {
    exerciseName: string,
    setExerciseName: (name: string) => void;
};

const ExerciseAutocomplete: React.FC<ExerciseAutocompleteProps> = ({
    exerciseName,
    setExerciseName,
}) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
    const inputRef = useRef<TextInput>(null); // Ref for TextInput

    // Handle Input Change
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

    // Handle Suggestion Click
    const handleSuggestionPress = (suggestion: Suggestion) => {
        setExerciseName(suggestion); // Replace input value
        setFilteredSuggestions([]); // Clear suggestions
        Keyboard.dismiss(); // Dismiss keyboard
        inputRef.current?.blur(); // Ensure input loses focus
    };

    return (
        <View>
            <TextInput
                ref={inputRef}
                className="bg-discord-card text-white text-lg p-4 rounded-lg mb-4"
                placeholder="Enter Exercise Name"
                placeholderTextColor="#9CA3AF"
                value={exerciseName}
                onChangeText={handleInputChange}
            />

            {/* Suggestions List */}
            {filteredSuggestions.length > 0 && (
                <FlatList
                    data={filteredSuggestions}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="p-4  bg-discord-modal"
                            onPress={() => handleSuggestionPress(item)}
                        >
                            <Text className="text-discord-text text-base">{item}</Text>
                        </TouchableOpacity>
                    )}
                    className="big-transparent rounded-lg max-h-40 mb-4"
                    keyboardShouldPersistTaps="handled" // Allows taps to work even when keyboard is open
                />
            )}
        </View >
    );
};

export default ExerciseAutocomplete;
