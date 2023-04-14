import { LoveStoryApp } from './app/initialize';
import { Navigation } from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(async () => {
  LoveStoryApp();
});
