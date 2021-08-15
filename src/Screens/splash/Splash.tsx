import RouteName from '../../Route/RouteName';
import {Colors, Images} from '../../Constants';
import React, {useEffect, useState} from 'react';
import {View, Animated, StyleSheet, StatusBar} from 'react-native';

interface Props {
  navigation: any;
  route: any;
}
const SplashScreen = React.memo(function SplashScreen(props: Props) {
  /**
   * @description initilize an animated value
   */
  const [animatedValue] = useState(new Animated.Value(0));

  /**
   * @description start an animation
   * @function useEffect
   */
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        props.navigation.navigate(RouteName.Screens.GameHome);
      }, 1500);
    });
  }, []);

  /** creating animation style for scaling image size*/
  const scaleImage = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 1.5],
  });

  const logoStyle = [
    styles.imageStyle,
    {
      width: 100,
      height: 100,
      opacity: animatedValue,
      transform: [{scale: scaleImage}],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.transparent} />
      <Animated.Image source={Images.leapClub} style={logoStyle} />
    </View>
  );
});

/**
 *
 * @description Defining styles for Splash screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  imageStyle: {resizeMode: 'contain'},
});

/**
 * @exports export SplashScreen Components
 */
export default SplashScreen;
