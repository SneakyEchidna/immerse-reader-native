import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
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
BooksDrawer.navigationOptions = {
  headerTitle: 'Library'
};
const ReaderDrawer = createDrawerNavigator(
  { Reader: ReaderScreen },
  { contentComponent: DefinitionScreen }
);
ReaderDrawer.navigationOptions = {
  headerTitle: 'Reader'
};
const AppStack = createStackNavigator({
  BooksDrawer,
  ReaderDrawer
});
const AuthStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  { headerMode: 'none' }
);

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const mapStateToProps = state => ({
  state: state.nav
});

const rootNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
);

const App = reduxifyNavigator(rootNavigator, 'root');

const AppNavigator = connect(mapStateToProps)(App);

export { AppNavigator, middleware, rootNavigator };
