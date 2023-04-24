import React from 'react';
import {IntlShape} from 'react-intl';
import {FlatList, Text, View} from 'react-native';

import {BlankSpacer} from '@app/components/alias';
import languages from '@app/localization/languages';
import {bottomSheet} from '@app/navigation/navigation';
import {makeStyleSheetFromTheme} from '@app/utils';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
    },
    item: {
        marginBottom: 12,
    },
    languageItem: {
        fontSize: 14,
    },
}));

export interface LanguageBottomSelectedProps {
    title: string;
    theme: Theme;
    intl: IntlShape;
}

export const showLanguageOptionsBottomSheet = ({theme, intl}: LanguageBottomSelectedProps) => {
    const {formatMessage} = intl;

    const styles = getStyleSheet(theme);

    const renderItem = ({item}: {item: string}) => (
        <View style={styles.item}>
            <Text style={styles.languageItem}>
                {formatMessage({id: `common.language.${item}`})}
            </Text>
        </View>
    );

    const renderContent = () => (
        <View style={styles.container}>
            <BlankSpacer height={4} />
            <Text style={styles.title}>Language</Text>
            <BlankSpacer height={10} />
            <FlatList
                keyExtractor={(item, index) => `${index}-${item}`}
                renderItem={item => renderItem(item)}
                data={Object.values(languages)}
            />
        </View>
    );

    bottomSheet({
        closeButtonId: 'close-language-id',
        renderContent,
        title: '',
    });
};
