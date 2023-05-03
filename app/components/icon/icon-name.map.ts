import {FC} from 'react';
import {SvgProps} from 'react-native-svg';

import {IconNameEnum} from './icon-name.enum';

import ArrowDownIcon from '@assets/svg/arrow-down.svg';
import ArrowLeftIcon from '@assets/svg/arrow-left.svg';
import ArrowRightIcon from '@assets/svg/arrow-right.svg';
import ArrowUpIcon from '@assets/svg/arrow-up.svg';
import CheckIcon from '@assets/svg/check.svg';
import LoveArrowLeftIcon from '@assets/svg/chevron_left.svg';
import LoveArrowRightIcon from '@assets/svg/chevron_right.svg';
import CloseCircleIcon from '@assets/svg/close_circle.svg';
import DarkModeIcon from '@assets/svg/dark_mode.svg';
import ErrorIcon from '@assets/svg/error.svg';
import StoryIcon from '@assets/svg/fileboard_love.svg';
import LanguageIcon from '@assets/svg/language.svg';
import NotificationIcon from '@assets/svg/notification.svg';
import SeenIcon from '@assets/svg/seen.svg';
import SendIcon from '@assets/svg/send.svg';
import SendingIcon from '@assets/svg/sending.svg';
import SentIcon from '@assets/svg/sent.svg';
import SettingIcon from '@assets/svg/setting.svg';
import ChatIcon from '@assets/svg/story.svg';
import WifiOffIcon from '@assets/svg/wifi_off.svg';

export const iconNameMap: Record<IconNameEnum, FC<SvgProps>> = {
    [IconNameEnum.ArrowUp]: ArrowUpIcon,
    [IconNameEnum.ArrowDown]: ArrowDownIcon,
    [IconNameEnum.ArrowRight]: ArrowRightIcon,
    [IconNameEnum.ArrowLeft]: ArrowLeftIcon,
    [IconNameEnum.LoveArrowLeftIcon]: LoveArrowLeftIcon,
    [IconNameEnum.LoveArrowRightIcon]: LoveArrowRightIcon,
    [IconNameEnum.ErrorIcon]: ErrorIcon,
    [IconNameEnum.SeenIcon]: SeenIcon,
    [IconNameEnum.SendingIcon]: SendingIcon,
    [IconNameEnum.SentIcon]: SentIcon,
    [IconNameEnum.CloseCircleIcon]: CloseCircleIcon,
    [IconNameEnum.WifiOffIcon]: WifiOffIcon,
    [IconNameEnum.StoryIcon]: StoryIcon,
    [IconNameEnum.SettingIcon]: SettingIcon,
    [IconNameEnum.ChatIcon]: ChatIcon,
    [IconNameEnum.SendIcon]: SendIcon,
    [IconNameEnum.DarkModeIcon]: DarkModeIcon,
    [IconNameEnum.LanguageIcon]: LanguageIcon,
    [IconNameEnum.NotificationIcon]: NotificationIcon,
    [IconNameEnum.CheckIcon]: CheckIcon,
};
