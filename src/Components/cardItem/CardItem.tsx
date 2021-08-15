import React from 'react';
import {Colors} from '../../Constants';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

/**
 *
 * @description Defining all required props for CardItem
 * @interface Props
 */
interface Props {
  title: string;
  cardId: string;
  disabled: boolean;
  onCardPress: Function;
  isCardVisible: boolean;
}

/**
 * @function CardItem
 * @description Creating a CardItem Component
 */
class CardItem extends React.Component<Props> {
  render() {
    return (
      <TouchableHighlight
        style={
          this.props.title ? styles.parentContainer : styles.disableCarditem
        }
        underlayColor={Colors.shadowColor}
        disabled={this.props.disabled || this.props.isCardVisible}
        onPress={() => this.props.onCardPress(this.props.cardId)}>
        <Text style={styles.titleStyle}>
          {this.props.title
            ? this.props.isCardVisible
              ? this.props.title
              : 'x'
            : ''}
        </Text>
      </TouchableHighlight>
    );
  }
}

/**
 *
 * @description Defining styles for CardItem
 */
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    margin: 10,
    height: 100,
    elevation: 5,
    shadowRadius: 3,
    borderRadius: 10,
    shadowOpacity: 0.26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.shadowColor,
    shadowOffset: {width: 0, height: 1},
  },
  disableCarditem: {
    flex: 1,
    margin: 10,
    height: 100,
    opacity: 0.4,
    elevation: 5,
    shadowRadius: 3,
    borderRadius: 10,
    shadowOpacity: 0.26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.shadowColor,
    shadowOffset: {width: 0, height: 1},
  },
  titleStyle: {
    fontSize: 30,
  },
});

/**
 * @exports CardItem
 * @description export CardItem component
 */
export default CardItem;
