import {CardData} from '../Constants/StaticData';

/**
 *
 * @description applied shuffling on card data
 * @function shuffleCardData
 * @param cardData
 */
const shuffleCardData = (cardData: Array<CardData>) => {
  var i = cardData.length,
    j,
    temp;
  if (i == 0) return cardData;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = cardData[i];
    cardData[i] = cardData[j];
    cardData[j] = temp;
  }

  return cardData;
};

/**
 * @exports CommonFunction
 * @description exporting collections of function
 */
export default {shuffleCardData};
