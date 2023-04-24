import React from 'react';
import {Platform} from 'react-native';

import OptionItem, {OptionItemProps} from '@components/option_item';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import {useTheme} from '@context/theme';

const getStyleSheet = makeStyleSheetFromTheme(theme => {
    return {
        container: {
            paddingHorizontal: 20,
        },
        optionLabelTextStyle: {
            color: '#3f4350',
            marginBottom: 4,
        },
        optionDescriptionTextStyle: {
            color: changeOpacity('#3f4350', 0.64),
        },
    };
});

const SettingOption = ({...props}: OptionItemProps) => {
    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    const useRadioButton = props.type === 'select' && Platform.OS === 'android';

    return (
        <OptionItem
            optionDescriptionTextStyle={styles.optionDescriptionTextStyle}
            optionLabelTextStyle={styles.optionLabelTextStyle}
            containerStyle={[styles.container, Boolean(props.description) && {marginVertical: 12}]}
            {...props}
            type={useRadioButton ? 'radio' : props.type}
        />
    );
};

export default SettingOption;
