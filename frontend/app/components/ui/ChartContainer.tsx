import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { ChartData } from '../../types';

interface ChartContainerProps {
    title?: string;
    data: ChartData[];
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, data }) => (
    <View className="bg-discord-dark p-4 rounded-lg">
        {title &&
            <Text className="text-discord-text text-lg font-bold mb-4">{title}</Text>
        }
        <LineChart
            data={data}
            thickness={3}
            color="#5865F2"
            hideDataPoints={false}
            dataPointsColor="#5865F2"
            dataPointsRadius={5}
            yAxisColor="rgba(220, 221, 222, 0.2)"
            xAxisColor="rgba(220, 221, 222, 0.2)"
            verticalLinesColor="rgba(220, 221, 222, 0.1)"
            yAxisTextStyle={{ color: '#DCDDDE', fontSize: 12 }}
            xAxisLabelTextStyle={{ color: '#DCDDDE', fontSize: 12 }}
            noOfSections={4}
            maxValue={Math.ceil(Math.max(...data.map(item => item.value)) / 10) * 10}
            initialSpacing={20}
            spacing={50}
            hideRules
            height={200}
            width={300}
            areaChart
            startFillColor="rgb(88, 101, 242)"
            startOpacity={0.8}
            endFillColor="rgb(88, 101, 242)"
            endOpacity={0.0}
            isAnimated
            animationDuration={1200}
            showVerticalLines
        />
    </View>
);

export default ChartContainer;

