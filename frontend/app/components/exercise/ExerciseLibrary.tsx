import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView, TextInput, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseData, exerciseLibraryData } from './ExerciseLibraryData';

type ExerciseLibraryProps = {
    visible: boolean;
    closeExerciseScreen: () => void;
    handleAddExercise: (exerciseName: string) => void;
};

type ExerciseProps = {
    item: ExerciseData;
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ visible, closeExerciseScreen, handleAddExercise }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(exerciseLibraryData);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const allMuscleGroups = exerciseLibraryData.flatMap(exercise => exercise.muscle_groups.split(', '));
    const categories = ["All", ...new Set(allMuscleGroups)]; // dynamically create the categories

    const handleClose = () => {
        setSelectedExercise("");
        setSearchText("")
        setSelectedCategory("All")
        closeExerciseScreen()
        setFilteredData(exerciseLibraryData);
    }

    const addSelectedExercise = () => {

        if (searchText != '' && filteredData.length == 0) {
            // create a custom exercise
            handleAddExercise(searchText)
        }
        else {
            // handle adding it normally 
            handleAddExercise(selectedExercise);
        }
        handleClose()
    }

    const applyFilters = (text: string, category: string) => {
        var newFilteredData = exerciseLibraryData;

        // filter by category first
        if (category !== "All") {
            newFilteredData = newFilteredData.filter(x =>
                x.muscle_groups.toLowerCase().includes(category.toLowerCase())
            );
        }

        // filter by search now
        if (text && text !== '') {
            newFilteredData = newFilteredData.filter(x =>
                x.exercise_name.toLowerCase().includes(text.toLowerCase())
            );
        }

        setFilteredData(newFilteredData);
    };

    const search = (text: string) => {
        setSearchText(text);
        applyFilters(text, selectedCategory);
    };

    const handleCategoryClick = (category: string) => () => {
        setSelectedCategory(category);
        applyFilters(searchText, category);
    };

    const renderItem = ({ item }: ExerciseProps) => {
        const isSelected = item.exercise_name === selectedExercise;
        
        return (
            <TouchableOpacity
                onPress={() => setSelectedExercise(item.exercise_name)}
                activeOpacity={0.7}
                className="mb-3"
            >
                <View 
                    className={`rounded-lg p-4 bg-discord-card ${isSelected ? 'border-2 border-discord-accent' : ''}`}
                >
                    <Text className={`text-discord-text text-lg ${isSelected ? 'font-bold' : 'font-medium'} mb-1`}>
                        {item.exercise_name}
                    </Text>
                    <Text className="text-discord-muted text-sm">{item.muscle_groups}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={handleClose}
        >
            <SafeAreaView className="flex-1 bg-discord-background">
                <View className="flex-1 px-5 py-4">
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-2xl font-bold text-discord-text">Exercise Library ({filteredData.length})</Text>
                        <TouchableOpacity
                            onPress={handleClose}
                            className="p-2 rounded-full hover:bg-discord-card"
                        >
                            <Ionicons name="close" size={24} color="#5865F2" />
                        </TouchableOpacity>
                    </View>

                    {/* Clean Filter Search Bar */}
                    <View className="mb-4">
                        <View className="flex-row items-center bg-discord-card rounded-lg px-3">
                            <Ionicons name="search" size={20} color="#72767D" />
                            <TextInput
                                className="flex-1 py-3 px-2 text-discord-text text-base"
                                placeholderTextColor="#72767D"
                                placeholder="Search exercises..."
                                value={searchText}
                                onChangeText={search}
                            />
                            {searchText ? (
                                <TouchableOpacity onPress={() => search('')}>
                                    <Ionicons name="close-circle" size={20} color="#72767D" />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>

                    <View className="mb-4">
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
                        >
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    onPress={handleCategoryClick(category)}
                                    className={`px-4 py-1.5 rounded-lg mr-2 min-w-[60px] items-center ${category === selectedCategory ? 'bg-discord-accent' : 'bg-discord-card'
                                        }`}
                                >
                                    <Text
                                        className={`font-medium ${category === selectedCategory ? 'text-white' : 'text-discord-text'
                                            }`}
                                    >
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    {/* Exercise List */}
                    <View className="flex-1 mb-4">
                        {filteredData.length === 0 && searchText ? (
                            <View className="py-4 px-3 bg-discord-card rounded-lg mb-3 items-center">
                                <Text className="text-discord-text text-base">No exercises found. Add "{searchText}" as custom exercise.</Text>
                            </View>
                        ) : null}
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => '_listItem_' + index}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 4 }}
                        />
                    </View>

                    {/* Add Button */}
                    <TouchableOpacity
                        onPress={addSelectedExercise}
                        disabled={!selectedExercise && (filteredData.length > 0 || !searchText)}
                        className={`py-4 rounded-lg items-center flex-row justify-center ${(!selectedExercise && (filteredData.length > 0 || !searchText))
                            ? 'bg-discord-muted'
                            : 'bg-discord-accent'
                            }`}
                    >
                        <Ionicons name="add" size={20} color="#ffffff" />
                        <Text className="text-white font-medium text-base ml-2">
                            {searchText !== '' && filteredData.length === 0
                                ? `Add "${searchText}" as Exercise`
                                : selectedExercise
                                    ? `Add ${selectedExercise}`
                                    : 'Select an Exercise'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default ExerciseLibrary;