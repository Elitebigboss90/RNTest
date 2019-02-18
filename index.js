/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import RNTest from './src/index.tsx';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => RNTest);
