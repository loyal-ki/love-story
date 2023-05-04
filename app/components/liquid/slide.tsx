import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Svg, {RadialGradient, Defs, Rect, Stop} from 'react-native-svg';

import {changeOpacity, formatSize} from '@app/utils';
import {FontsEnum} from '@app/utils/styles/fonts-enum';

const {width, height} = Dimensions.get('screen');
const SIZE = width - 75;
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        padding: 75,
        paddingTop: 150,
        alignItems: 'center',
    },
    image: {
        width: SIZE,
        height: SIZE,
    },
    title: {
        fontSize: formatSize(48),
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: FontsEnum.quicksandBold,
    },
    description: {
        fontSize: formatSize(20),
        color: 'white',
        textAlign: 'center',
        fontFamily: FontsEnum.quicksandSemiBold,
    },
});

export interface SlideProps {
    theme: Theme;
    slide: {
        color: string;
        title: string;
        description: string;
        // picture: ReturnType<typeof require>;
    };
}

export const Slide = ({theme, slide: {color, title, description}}: SlideProps) => {
    const lighterColor = changeOpacity(theme.primary, 0.8);

    return (
        <>
            <Svg style={StyleSheet.absoluteFill}>
                <Defs>
                    <RadialGradient id="gradient" cx="50%" cy="35%">
                        <Stop offset="0%" stopColor={color} />
                        <Stop offset="100%" stopColor={color} />
                    </RadialGradient>
                </Defs>
                <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
            </Svg>
            <View style={styles.container}>
                {/* <Image source={picture} style={styles.image} /> */}
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        </>
    );
};
