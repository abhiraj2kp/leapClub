/**
 * @interface CardData
 * @description Create a schema modal for card item
 */
export interface CardData {
  id: string;
  title: string;
  disableCard: boolean;
  isCardVisible: boolean;
}

/**
 *
 * @description Create a static card items
 */
const cardData: Array<CardData> = [
  {
    id: '1',
    title: 'A',
    disableCard: false,
    isCardVisible: false,
  },
  {
    id: '2',
    title: 'B',
    disableCard: false,
    isCardVisible: false,
  },
  {
    id: '3',
    title: 'C',
    disableCard: false,
    isCardVisible: false,
  },
  {
    id: '4',
    title: 'D',
    disableCard: false,
    isCardVisible: false,
  },
  {
    id: '5',
    title: 'E',
    disableCard: false,
    isCardVisible: false,
  },
  {
    id: '6',
    title: 'F',
    disableCard: false,
    isCardVisible: false,
  },
  {
    id: '7',
    title: 'G',
    disableCard: false,
    isCardVisible: false,
  },
  {
    id: '8',
    title: 'H',
    disableCard: false,
    isCardVisible: false,
  },
];

/**
 *
 * @description export all static dataset
 */
export default {cardData};
