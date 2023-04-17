import {createIconSetFromFontello} from 'react-native-vector-icons';

import fontelloConfig from '../../../assets/icons/config.json';

const AppIcons = createIconSetFromFontello(fontelloConfig, 'fontello', 'fontello.ttf');

export default AppIcons;
