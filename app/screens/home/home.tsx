import {onNavigationToScreen, showReviewOverlay} from '@navigation/navigation';
import React from 'react';
import {useIntl} from 'react-intl';
import {Button, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

import {Screens} from '@app/constants';
import {useMemoizedCallback, useMount} from '@app/hooks';
import {PostModel} from '@app/models';
import {counterActions} from '@app/store/actions';
import {postActions} from '@app/store/actions/post.action';
import {isPostFetchingSelector, postListSelector} from '@app/store/selectors/post.selector';

import type {BaseScreens} from '@typings/screens/navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export interface HomeScreenProps {
    componentId: BaseScreens;
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    const reduxDispatch = useDispatch();
    const intl = useIntl();

    const {formatMessage} = intl;

    const postList = useSelector(postListSelector);
    const isFetch = useSelector(isPostFetchingSelector);

    const init = useMemoizedCallback(async () => {
        reduxDispatch(
            postActions.fetchPostIfNeeded({
                onStart: () => {},
                onComplete: (data?: PostModel[]) => {},
                onError: (error: unknown) => {},
            })
        );
    }, [reduxDispatch]);

    useMount(init);

    return (
        <View style={styles.container}>
            <View style={{height: 200}} />
            <Icon
                name="camera"
                size={35}
                color="#EEEFEF"
                style={{
                    alignSelf: 'center',
                }}
            />
            <Button
                title={formatMessage({id: 'home.page_title'})}
                onPress={() => {
                    reduxDispatch(counterActions.setCounter(100));
                    onNavigationToScreen({screen: Screens.LOGIN});
                }}
            />
            <Button
                title="show alert"
                onPress={() => {
                    showReviewOverlay();
                }}
            />
        </View>
    );
};
