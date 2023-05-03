import {clamp} from 'lodash';
import {Dimensions} from 'react-native';

const basicScreenWidth = 375;
const maxLayoutScale = 1.1;
export const layoutScale = clamp(Dimensions.get('screen').width / basicScreenWidth, maxLayoutScale);
