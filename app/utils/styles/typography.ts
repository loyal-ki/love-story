import {FontsEnum} from './fonts-enum';
import {formatSize} from './format-size';

export const typography = {
    // Regular Font
    text12Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(12),
    },
    text14Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(14),
    },
    text16Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(16),
    },
    text18Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(18),
    },
    text20Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(20),
    },

    // Bold Font
    text12Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(12),
    },
    text14Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(14),
    },
    text16Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(16),
    },
    text18Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(18),
    },
    text20Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(20),
    },
};

interface FontStyles {
    fontFamily: string;
    fontSize: number;
}

export type Typography = Record<keyof typeof typography, FontStyles>;
