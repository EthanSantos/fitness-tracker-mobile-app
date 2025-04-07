import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
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
    // Animation values for week transition
    const slideAnim = React.useRef(new Animated.Value(0)).current;
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

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

    // Go to previous week with animation
    const goToPreviousWeek = () => {
        // Animate slide out to right
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: width,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            })
        ]).start(() => {
            // Update week data
            const newStart = new Date(currentWeekStart);
            newStart.setDate(newStart.getDate() - 7);
            setCurrentWeekStart(newStart);
            
            // Reset animation values
            slideAnim.setValue(-width);
            fadeAnim.setValue(0);
            
            // Animate slide in from left
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true
                })
            ]).start();
        });
    };

    // Go to next week with animation
    const goToNextWeek = () => {
        // Animate slide out to left
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -width,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            })
        ]).start(() => {
            // Update week data
            const newStart = new Date(currentWeekStart);
            newStart.setDate(newStart.getDate() + 7);
            setCurrentWeekStart(newStart);
            
            // Reset animation values
            slideAnim.setValue(width);
            fadeAnim.setValue(0);
            
            // Animate slide in from right
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true
                })
            ]).start();
        });
    };

    // Go to today
    const goToToday = () => {
        const today = new Date();
        const todayStart = new Date(today);
        todayStart.setDate(today.getDate() - today.getDay()); // Get Sunday of current week
        todayStart.setHours(0, 0, 0, 0);
        
        // Only animate if changing weeks
        if (todayStart.getTime() !== currentWeekStart.getTime()) {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            }).start(() => {
                // Update week and date
                setCurrentWeekStart(todayStart);
                setSelectedDate(today);
                
                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true
                }).start();
            });
        } else {
            // Just update selected date if already on current week
            setSelectedDate(today);
        }
    };

    // Check if two dates are the same day, ignoring time
    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    // Check if we're viewing the current week
    const isCurrentWeek = () => {
        const today = new Date();
        const todayStart = new Date(today);
        todayStart.setDate(today.getDate() - today.getDay());
        todayStart.setHours(0, 0, 0, 0);
        return currentWeekStart.getTime() === todayStart.getTime();
    };

    // Enhanced calendar day rendering with better visual feedback
    const renderCalendarDay = (day: Date, index: number) => {
        const isSelected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, new Date());
        const dayName = day.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
        const dayNum = day.getDate();
        
        // Check if it's a different month than the week's start date
        const isDifferentMonth = day.getMonth() !== weekDays[0].getMonth();
        
        // Get month for first day of month
        const isFirstOfMonth = day.getDate() === 1;
        const monthLetter = isFirstOfMonth ? day.toLocaleDateString('en-US', { month: 'short' }).charAt(0) : null;

        return (
            <TouchableOpacity
                onPress={() => setSelectedDate(day)}
                className={`items-center justify-center h-14 rounded-xl py-2
                    ${isSelected ? 'bg-discord-accent' : 
                       isToday ? 'bg-discord-accent/10 border border-discord-accent' : 
                       'border border-transparent'}`}
                style={{ width: width * 0.125 }}
                activeOpacity={0.7}
            >
                {/* Day label */}
                <Text className={`text-xs font-medium mb-0.5 
                    ${isSelected ? 'text-white' : isDifferentMonth ? 'text-discord-muted' : 'text-discord-text'}`}>
                    {dayName}
                </Text>
                
                {/* Day number */}
                <Text className={`text-base font-semibold 
                    ${isSelected ? 'text-white' : 
                      isToday ? 'text-discord-accent' : 
                      isDifferentMonth ? 'text-discord-muted' : 'text-discord-text'}`}>
                    {dayNum}
                </Text>
                
                {/* Month indicator for first day of month */}
                {isFirstOfMonth && (
                    <Text className={`text-xs -mt-0.5 
                        ${isSelected ? 'text-white/80' : 'text-discord-accent'}`}>
                        {monthLetter}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View className="mb-6">
            <View className="flex-row items-center justify-between px-4 mb-3">
                <TouchableOpacity
                    onPress={goToPreviousWeek}
                    className="p-2"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <MaterialCommunityIcons name="chevron-left" size={28} color="#5865F2" />
                </TouchableOpacity>

                <View className="flex-row items-center">
                    <Text className="text-discord-text font-medium text-base">
                        {`${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                    </Text>
                    
                    {/* Today button */}
                    {!isCurrentWeek() && (
                        <TouchableOpacity 
                            onPress={goToToday}
                            className="ml-3 bg-discord-accent/10 px-3 py-1 rounded-full"
                        >
                            <Text className="text-discord-accent text-xs font-medium">Today</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity
                    onPress={goToNextWeek}
                    className="p-2"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <MaterialCommunityIcons name="chevron-right" size={28} color="#5865F2" />
                </TouchableOpacity>
            </View>

            <Animated.View 
                className="flex-row justify-between px-1"
                style={{ 
                    transform: [{ translateX: slideAnim }],
                    opacity: fadeAnim
                }}
            >
                {weekDays.map((day, index) => (
                    <View key={index} style={{ width: width / 7 - 2 }} className="items-center">
                        {renderCalendarDay(day, index)}
                    </View>
                ))}
            </Animated.View>
        </View>
    );
};

export default WeeklyCalendar;