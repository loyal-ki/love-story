import React from 'react';
import {IntlShape} from 'react-intl';
import {FlatList, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {BlankSpacer} from '@app/components/alias';
import languages from '@app/localization/languages';
import {bottomSheet, dismissBottomSheet} from '@app/navigation/navigation';
import {makeStyleSheetFromTheme} from '@app/utils';

import CheckIcon from '@assets/svg/check.svg';

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
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    languageItem: {
        fontSize: 14,
    },
}));

export interface LanguageBottomSelectedProps {
    title: string;
    theme: Theme;
    langSelected: string;
    onSelectedLanguage: (lang: string) => void;
    intl: IntlShape;
}

export const showLanguageOptionsBottomSheet = ({
    theme,
    intl,
    langSelected,
    onSelectedLanguage,
}: LanguageBottomSelectedProps) => {
    const {formatMessage} = intl;

    const styles = getStyleSheet(theme);
    const onUpdateLanguage = (lang: string) => {
        onSelectedLanguage(lang);
        dismissBottomSheet();
    };

    const renderItem = ({item}: {item: string}) => (
        <TouchableOpacity style={styles.item} onPress={() => onUpdateLanguage(item)}>
            <Text style={styles.languageItem}>
                {formatMessage({id: `common.language.${item}`})}
            </Text>
            {langSelected === item && <CheckIcon width={24} height={24} stroke={theme.primary} />}
        </TouchableOpacity>
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
