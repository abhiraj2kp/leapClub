import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {CardItem} from '../../Components';
import {CommonFunction} from '../../Utils';
import {CardData} from '../../Constants/StaticData';
import {Colors, StaticData, Strings} from '../../Constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 *
 * @description Defining all required props
 * @interface Props
 */
interface Props {
  navigation: any;
}

/**
 *
 * @description Defining all required internal state
 * @interface State
 */
interface State {
  totalScore: number;
  totalTurns: number;
  cardData: Array<CardData>;
}

/**
 *
 * @classdesc Creating a class component for Memory Game
 * @class MemoryGame
 * @extends {PureComponent<Props, State>}
 */
class MemoryGame extends React.PureComponent<Props, State> {
  /**
   * @description initilizing all the states values
   * @param {Props} props
   * @memberof MemoryGame
   */
  constructor(props: Props) {
    super(props);

    // Creating a copy of cardData i.e(A to H)
    let copyOfCardData = JSON.parse(JSON.stringify(StaticData.cardData));

    // Creating a pair of set for each alphabets i.e (A to H)
    let pairCardData = StaticData.cardData.concat(copyOfCardData).map(item => {
      item.id = (Math.random() * Math.random()).toString(20);
      item.isCardVisible = false;
      return item;
    });

    // Applied dynamic suffling on cards
    let shuffledData = CommonFunction.shuffleCardData(pairCardData);

    // Setting up initial states
    this.state = {
      totalScore: 0,
      totalTurns: 0,
      cardData: shuffledData,
    };
  }

  /**
   *
   * @function resetWholeCards
   * @description reset the internal state
   */
  resetWholeCards = () => {
    // Creating a copy of cardData i.e(A to H)
    let copyOfCardData = JSON.parse(JSON.stringify(StaticData.cardData));

    // Creating a pair of set for each alphabets i.e (A to H)
    let pairCardData = StaticData.cardData.concat(copyOfCardData).map(item => {
      item.id = (Math.random() * Math.random()).toString(20);
      item.isCardVisible = false;
      return item;
    });

    // Applied dynamic suffling on cards
    let shuffledData = CommonFunction.shuffleCardData(pairCardData);

    // Setting up initial states
    this.setState({
      totalScore: 0,
      totalTurns: 0,
      cardData: shuffledData,
    });
  };

  /**
   *
   * @description Handling on card item press
   * @function onCardPress
   * @param id
   */
  onCardPress = (id: String) => {
    const copyData: Array<CardData> = JSON.parse(
      JSON.stringify(this.state.cardData),
    );

    if (copyData.filter(item => item.isCardVisible).length === 2) {
      return;
    }
    const visibleIndex = copyData.findIndex(item => item.isCardVisible);
    const newVisibleIndex = copyData.findIndex(item => item.id === id);
    let totalTurns = this.state.totalTurns;

    if (newVisibleIndex != -1) {
      copyData[newVisibleIndex].isCardVisible = true;
      if (
        visibleIndex != -1 &&
        copyData[newVisibleIndex].title === copyData[visibleIndex].title
      ) {
        this.setState(
          {
            cardData: copyData,
            totalTurns: totalTurns + 1,
            totalScore:
              copyData.filter(item => item.isCardVisible).length === 2
                ? this.state.totalScore + 1
                : this.state.totalScore,
          },
          () => {
            if (this.state.totalScore === 8) {
              Alert.alert(
                Strings.won,
                Strings.you_did_it_in + this.state.totalTurns + Strings.turn_s,
              );
              this.setState(
                {
                  cardData: copyData.map(item => {
                    if (item.isCardVisible) {
                      item.title = '';
                      item.disableCard = true;
                      item.isCardVisible = false;
                    }
                    return item;
                  }),
                },
                this.resetWholeCards,
              );
              return;
            } else
              setTimeout(() => {
                this.setState({
                  cardData: copyData.map(item => {
                    if (item.isCardVisible) {
                      item.title = '';
                      item.disableCard = true;
                      item.isCardVisible = false;
                    }
                    return item;
                  }),
                });
              }, 300);
          },
        );
      } else {
        const itemVisible = copyData.filter(item => item.isCardVisible).length;
        if (itemVisible === 2) {
          this.setState(
            {
              cardData: copyData,
              totalTurns: totalTurns + 1,
              totalScore: this.state.totalScore,
            },
            () =>
              setTimeout(() => {
                this.setState({
                  cardData: copyData.map(item => {
                    item.isCardVisible = false;
                    return item;
                  }),
                  totalScore: this.state.totalScore,
                });
              }, 1000),
          );
        } else
          this.setState({
            cardData: copyData,
            totalScore: this.state.totalScore,
          });
      }
    }
  };

  /**
   *
   * @description render each card item
   * @function renderItem
   * @param param0
   */
  renderItem = ({item}: {item: CardData}) => {
    return (
      <CardItem
        cardId={item.id}
        disabled={
          this.state.cardData.filter(item => item.isCardVisible).length === 2 ||
          item.disableCard
        }
        title={item.title}
        onCardPress={this.onCardPress}
        isCardVisible={item.isCardVisible}
      />
    );
  };

  /**
   *
   * @description Handled the key extractor to uniquely identify each card item
   * @function renderKeyExtractor
   * @param item
   */
  renderKeyExtractor = (item: CardData) => {
    return item.id;
  };

  /**
   * @description Returning JSX of MemoryGarme component
   * @function render
   */
  render() {
    return (
      <SafeAreaView style={styles.parentContainer}>
        <View style={styles.topContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.actionContainer}>
            <Text
              style={
                styles.actionTitle
              }>{`${Strings.matches}\n${this.state.totalScore}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.actionContainer}>
            <Text
              style={
                styles.actionTitle
              }>{`${Strings.turns}\n${this.state.totalTurns}`}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={4}
          style={styles.listContainer}
          data={this.state.cardData}
          renderItem={this.renderItem}
          keyExtractor={this.renderKeyExtractor}
        />
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            activeOpacity={0.5}
            style={styles.actionContainer}>
            <Text style={styles.actionTitle}>{Strings.menu}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.resetWholeCards}
            activeOpacity={0.5}
            style={styles.actionContainer}>
            <Text style={styles.actionTitle}>{Strings.restart}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

/**
 *
 * @description Defining styles for MemoryGame
 */
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  actionContainer: {
    height: 50,
    width: 100,
    shadowRadius: 1,
    borderRadius: 15,
    shadowOpacity: 0.26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadowColor,
    backgroundColor: Colors.royalBlue,
    shadowOffset: {width: 0, height: 0},
  },
  actionTitle: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 30,
  },
  topContainer: {
    marginTop: 30,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
});

/**
 * @exports MemoryGame
 * @description export MemoryGame screen
 */
export default MemoryGame;
