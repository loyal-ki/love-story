import React, {useCallback} from 'react';
import {View} from 'react-native';

import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';
import CheckIcon from '@assets/svg/check.svg';

import {useTheme} from '@context/theme';

const RADIO_SIZE = 24;
const getStyleSheet = makeStyleSheetFromTheme(theme => {
    return {
        ring: {
            height: RADIO_SIZE,
            width: RADIO_SIZE,
            borderRadius: RADIO_SIZE / 2,
            marginRight: 16,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inActive: {
            borderColor: changeOpacity('#3f4350', 0.56),
        },
        center: {
            height: RADIO_SIZE / 2,
            width: RADIO_SIZE / 2,
            borderRadius: RADIO_SIZE / 2,
            backgroundColor: '#FFFFFF',
        },
        checkedBodyContainer: {
            backgroundColor: '#FFFFFF',
        },
    };
});
export type RadioItemProps = {
    selected: boolean;
    checkedBody?: boolean;
    testID?: string;
};
const RadioItem = ({selected, checkedBody, testID}: RadioItemProps) => {
    const {theme} = useTheme();
    const styles = getStyleSheet(theme);

    const getBody = useCallback(() => {
        if (checkedBody) {
            return (
                <View style={styles.checkedBodyContainer}>
                    <CheckIcon color="#FFFFFF" width={RADIO_SIZE / 1.5} height={RADIO_SIZE / 1.5} />
                </View>
            );
        }

        return <View style={styles.center} />;
    }, [checkedBody, styles.center, styles.checkedBodyContainer]);

    return (
        <View style={[styles.ring, !selected && styles.inActive]} testID={testID}>
            {selected && getBody()}
        </View>
    );
};

export default RadioItem;
