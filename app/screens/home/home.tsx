import React, {useState} from 'react';

import {Screens} from '@app/constants';
import {onNavigationToScreen, showReviewOverlay} from '@app/navigation/navigation';
import {counterActions} from '@app/store/actions';
import type {BaseScreens} from '@typings/screens/navigation';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useMemoizedCallback, useMount} from '@app/hooks';
import {DatabaseService} from '@app/database';
import {logInfo} from '@app/utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIntl} from 'react-intl';
import {postActions} from '@app/store/actions/post.action';
import {isPostFetchingSelector, postListSelector} from '@app/store/selectors/post.selector';
import {PostModel} from '@app/database/models';

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

    console.log(postList);
    console.log(isFetch);

    const init = useMemoizedCallback(async () => {
        reduxDispatch(
            postActions.fetchPostIfNeeded({
                onStart: () => {
                },
                onComplete: (data?: PostModel[]) => {
                },
                onError: (error: unknown) => {
                },
            })
        );
    }, []);

    useMount(init);

    return (
        <View style={styles.container}>
            <View style={{height: 200}} />
            <Icon
                name="camera"
                size={35}
                color={'#EEEFEF'}
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
