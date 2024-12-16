import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HeaderProps = {
    title: string;
};

const CustomHeader: React.FC<HeaderProps> = ({ title }) => {
    return (
        <SafeAreaView edges={['top', 'left', 'right']} className="bg-discord-background">
            <View className="px-4 py-4 flex justify-center">
                <Text className="text-discord-text font-bold text-4xl tracking-wide leading-none">
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;
