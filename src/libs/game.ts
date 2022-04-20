export interface Card {
    number: number;
    color: 'Spade'|'Heart'|'Club'|'Diamond';
    status: 'unSettled' | 'opened' | 'unOpened' | 'resolved',
    posX: number;
    posY: number;
}
//TODO: 根据参数生成四种/两种/一种不同的花色， 以及不同的套数
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
  //TODO: freecell 需要判断花色，不同花色才可以
  if(game === 'freecell') {
    return true;
  } else {
    return cards[targetColumn][cards[targetColumn].length - 1].number === card.number + 1;
  }

}

export const isValidSet = (cards: Card[]) => {
  //TODO: 如果cards的最后十三个number是1到13， 返回true，否则返回false
  console.log(cards)
}