import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { rootNavigator } from '../navigation';

const navReducer = createNavigationReducer(rootNavigator);

export default navReducer;
