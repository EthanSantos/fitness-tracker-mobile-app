import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ExerciseLibraryProps = {
    visible: boolean;
    closeExerciseScreen: () => void;
    handleAddExercise: (exerciseName: string) => void;
};

type ExerciseData = {
    id: string;
    exercise_name: string;
    muscle_groups: string;
}

const exercise_data: ExerciseData[] = [
    {
        id: '1',
        exercise_name: 'Bench Press',
        muscle_groups: 'Chest, Triceps'
    },
    {
        id: '2',
        exercise_name: 'Squat',
        muscle_groups: 'Quads, Hamstrings, Glutes'
    },
    {
        id: '3',
        exercise_name: 'Deadlift',
        muscle_groups: 'Back, Hamstrings, Glutes'
    },
    {
        id: '4',
        exercise_name: 'Pull-up',
        muscle_groups: 'Back, Biceps'
    },
    {
        id: '5',
        exercise_name: 'Overhead Press',
        muscle_groups: 'Shoulders, Triceps'
    },
    {
        id: '6',
        exercise_name: 'Romanian Deadlift',
        muscle_groups: 'Hamstrings, Lower Back'
    },
    {
        id: '7',
        exercise_name: 'Lat Pulldown',
        muscle_groups: 'Back, Biceps'
    },
    {
        id: '8',
        exercise_name: 'Leg Press',
        muscle_groups: 'Quads, Hamstrings, Glutes'
    },
    {
        id: '9',
        exercise_name: 'Dumbbell Row',
        muscle_groups: 'Back, Biceps'
    },
    {
        id: '10',
        exercise_name: 'Barbell Curl',
        muscle_groups: 'Biceps'
    }
];

type ExerciseProps = {
    item: ExerciseData;
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ visible, closeExerciseScreen, handleAddExercise }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(exercise_data);
    const [selectedExercise, setSelectedExercise] = useState('');

    const handleClose = () => {
        setSelectedExercise("");
        setSearchText("")
        closeExerciseScreen()
        setFilteredData(exercise_data);
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

    const search = (text: string) => {
        setSearchText(text);
        if (!text || text == '') { // if our search is empty, show all the exercises
            setFilteredData(exercise_data);
        }
        else {
            setFilteredData(exercise_data.filter(x => x.exercise_name.toLowerCase().includes(text.toLowerCase())))
        }
    }

    const renderItem = ({ item }: ExerciseProps) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedExercise(item.exercise_name)}
                activeOpacity={0.7}
            >
                <View className={`rounded-lg mb-4 p-5 bg-discord-card ${item.exercise_name === selectedExercise ? 'border-2 border-discord-accent' : ''}`}>
                    <Text className="text-discord-text text-xl font-medium mb-1">{item.exercise_name}</Text>
                    <Text className="text-discord-muted text-base">{item.muscle_groups}</Text>
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
                <View className="flex-1 p-6">
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-2xl font-bold text-discord-text">Exercise Library</Text>
                        <TouchableOpacity
                            onPress={handleClose}
                            className="p-2"
                        >
                            <Text className="text-discord-accent text-lg">Close</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Clean Filter Search Bar */}
                    <View className="mb-6">
                        <TextInput
                            className="bg-discord-card text-discord-text py-4 px-5 rounded-lg text-lg"
                            placeholderTextColor="#72767D"
                            placeholder="Search exercises..."
                            value={searchText}
                            onChangeText={search}
                        />
                    </View>

                    {/* Exercise List */}
                    <View className="flex-1">
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => '_listItem_' + index}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={addSelectedExercise}
                        className="bg-discord-accent py-5 rounded-lg items-center flex-row justify-center mt-4"
                    >
                        <Ionicons name="add" size={20} color="#ffffff" />
                        <Text className="text-white font-medium text-lg ml-2">Add Selected Exercise</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default ExerciseLibrary;