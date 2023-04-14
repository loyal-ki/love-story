import fontelloConfig from '../../../assets/icons/config.json';

import {createIconSetFromFontello} from 'react-native-vector-icons';

const AppIcons = createIconSetFromFontello(fontelloConfig, 'fontello', 'fontello.ttf');

export default AppIcons;
