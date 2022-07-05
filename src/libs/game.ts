export interface Card {
    number: number;
    color: 'Spade'|'Heart'|'Club'|'Diamond';
    status: 'unSettled' | 'opened' | 'unOpened' | 'resolved',
    posX: number;
    posY: number;
}
//TODO: this is only for solitaire
export const generateCards = (setNum: number): Card[] => {
  const cards: Card[] = [];
  for(let i = 0; i < setNum; i++) {
    for(let j = 1; j <= 13; j++) {
      cards.push({number: j, color: 'Spade', status: 'unSettled', posX:0,posY:0});
    }
  }
  cards.sort(()=> Math.random() - 0.5);
  return cards;
}

export const dragable = (cards: Card[]): boolean => {
  for(let i = 1; i < cards.length; i++) {
    if(cards[i].number != cards[i - 1].number - 1) {
      return false;
    }
  }
  return true;
}

export const dropable = (cards: Card[][], targetColumn: number, oriColumn: number, card: Card, game: 'freecell' | 'spider'):boolean => {

  if (targetColumn === oriColumn) {
    return false;
  }
  if(cards[targetColumn].length === 0) {
    return true;
  }
  //TODO: freecell need to adjust colors，should be different color
  if(game === 'freecell') {
    return true;
  } else {
    return cards[targetColumn][cards[targetColumn].length - 1].number === card.number + 1;
  }

}

export const isValidSet = (cards: Card[]) => {
  //TODO: if the last 13 cards is 1 to 13， return true，otherwise false
  console.log(cards)
}