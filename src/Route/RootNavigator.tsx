import React from 'react';
import RouteName from './RouteName';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {MemoryGame, SplashScreen, GameHome} from '../Screens';

/**
 *
 * @description create a stack navigator
 */
const RootStack = createStackNavigator();

class RootNavigator extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen
            component={SplashScreen}
            name={RouteName.Screens.SplashScreen}
          />
          <RootStack.Screen
            component={GameHome}
            name={RouteName.Screens.GameHome}
          />
          <RootStack.Screen
            component={MemoryGame}
            name={RouteName.Screens.MemoryGame}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

/**
 * @exports RootNavigator
 * @description export rootnavigator
 */
export default RootNavigator;
