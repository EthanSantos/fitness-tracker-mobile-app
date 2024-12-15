import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HeaderProps = {
    title: string;
};

const CustomHeader: React.FC<HeaderProps> = ({ title }) => {
    return (
        <SafeAreaView className="bg-discord-background">
            <View className="px-4 py-2">
                <Text className="text-discord-text font-semibold text-3xl tracking-wide">
                    {title}
                </Text>
            </View>
        </SafeAreaView>


    );
};

export default CustomHeader;
