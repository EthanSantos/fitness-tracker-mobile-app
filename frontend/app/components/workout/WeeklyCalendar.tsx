import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type WeeklyCalendarProps = {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    currentWeekStart: Date;
    setCurrentWeekStart: (date: Date) => void;
};

const { width } = Dimensions.get('window');

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
    selectedDate,
    setSelectedDate,
    currentWeekStart,
    setCurrentWeekStart
}) => {
    // Get days for current week view
    const getDaysForWeek = (startDate: Date) => {
        const days = [];
        const currentDate = new Date(startDate);

        for (let i = 0; i < 7; i++) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    };

    const weekDays = getDaysForWeek(currentWeekStart);

    // Go to previous week
    const goToPreviousWeek = () => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(newStart.getDate() - 7);
        setCurrentWeekStart(newStart);
    };

    // Go to next week
    const goToNextWeek = () => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(newStart.getDate() + 7);
        setCurrentWeekStart(newStart);
    };

    // Check if two dates are the same day, ignoring time
    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const renderCalendarDay = (day: Date, index: number) => {
        const isSelected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, new Date());
        const dayName = day.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
        const dayNum = day.getDate();

        return (
            <TouchableOpacity
                onPress={() => setSelectedDate(day)}
                className={`items-center justify-center h-12 rounded-full 
          ${isSelected ? 'bg-discord-accent' : isToday ? 'border border-discord-accent' : 'border border-discord-background'}`}
                style={{ width: width * 0.12 }}
            >
                <Text className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-discord-text'}`}>
                    {dayName}
                </Text>
                <Text className={`text-xs ${isSelected ? 'text-white' : 'text-discord-muted'}`}>
                    {dayNum}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className="mb-4">
            <View className="flex-row items-center justify-between px-4 mb-2">
                <TouchableOpacity
                    onPress={goToPreviousWeek}
                    className="p-2"
                >
                    <MaterialCommunityIcons name="chevron-left" size={24} color="#5865F2" />
                </TouchableOpacity>

                <Text className="text-discord-muted">
                    {`${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                </Text>

                <TouchableOpacity
                    onPress={goToNextWeek}
                    className="p-2"
                >
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#5865F2" />
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-between px-1">
                {weekDays.map((day, index) => (
                    <View key={index} style={{ width: width / 7 - 2 }} className="items-center">
                        {renderCalendarDay(day, index)}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default WeeklyCalendar;