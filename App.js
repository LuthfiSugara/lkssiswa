/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import Navigation from './src/navigation/navigation';
import { Store } from './src/redux/store';
import SplashScreen from  "react-native-splash-screen";


const App = ({route}) => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={Store}>
        <Navigation/>
    </Provider>
  )
};

export default App;
