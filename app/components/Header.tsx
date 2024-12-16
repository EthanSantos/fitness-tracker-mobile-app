import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type HeaderProps = {
    title: string;
    onBack?: () => void;
};

const CustomHeader: React.FC<HeaderProps> = ({ title, onBack }) => {
    return (
        <SafeAreaView edges={['top', 'left', 'right']} className="bg-discord-background">
            <View className="flex-row items-center px-4 py-4">
                {/* Back Button */}
                {onBack && (
                    <TouchableOpacity onPress={onBack} className="mr-4">
                        {/* Icon rendered directly */}
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                )}

                {/* Title */}
                <Text className="text-discord-text font-bold text-4xl tracking-wide leading-none">
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;
