import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import RouteName from '../../Route/RouteName';
import RNExitApp from 'react-native-exit-app';
import {Colors, Strings} from '../../Constants';

/**
 * @interface Props
 * @description define all required props
 */
interface Props {
  route: any;
  navigation: any;
}

/**
 * @function GameHome
 * @description Creating a GameHome Component
 */
const GameHome = React.memo(function GameHome(props: Props) {
  /**
   * @function onCloseApp
   * @description calling this function to close an app
   */
  const onCloseApp = () => {
    RNExitApp.exitApp();
  };

  /**
   * @function useEffect
   * @description applied hooks to add back handler event to close an app
   */
  useEffect(() => {
    const eventListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onCloseApp();
        return true;
      },
    );
    return () => eventListener.remove();
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.transparent} />
      <Text style={styles.memoryGameTitle}>{Strings.memoryGame}</Text>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(RouteName.Screens.MemoryGame)
          }
          activeOpacity={0.5}
          style={styles.gameActionContainer}>
          <Text style={styles.actionTitle}>{Strings.play}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCloseApp}
          activeOpacity={0.5}
          style={styles.gameActionContainer}>
          <Text style={styles.actionTitle}>{Strings.exit}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

/**
 *
 * @description Defining styles for GameHome
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  subContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 20,
    color: Colors.white,
  },
  gameActionContainer: {
    width: 200,
    height: 50,
    shadowRadius: 1,
    shadowOpacity: 0.26,
    marginBottom: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadowColor,
    backgroundColor: Colors.royalBlue,
    shadowOffset: {width: 0, height: 0},
  },
  memoryGameTitle: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GameHome;
