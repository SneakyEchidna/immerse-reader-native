import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import HomeScreen from '../containers/HomeScreen';
import ReaderScreen from '../containers/ReaderScreen';
import DefinitionScreen from '../containers/DefinitionScreen';
import BooksScreen from '../containers/BooksScreen';
import BooksUploadScreen from '../containers/BooksUploadScreen';
import AuthLoadingScreen from '../containers/AuthLoadingScreen';

const BooksDrawer = createDrawerNavigator(
  { Books: BooksScreen },
  { contentComponent: BooksUploadScreen }
);
const ReaderDrawer = createDrawerNavigator(
  { Reader: ReaderScreen },
  { contentComponent: DefinitionScreen }
);
const AppStack = createStackNavigator({
  BooksDrawer,
  ReaderDrawer
});
const AuthStack = createStackNavigator({
  Home: HomeScreen
});

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: 'AuthLoading'
  }
);
