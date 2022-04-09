export interface Card {
    number: number;
    color: 'Spade'|'Heart'|'Club'|'Diamond';
    status: 'unSettled' | 'opened' | 'unOpened' | 'resolved',
    posX?: number;
    posY?: number;
}

export const generateCards = (): Card[] => {
    const cards: Card[] = [];
    for(let i = 0; i < 8; i++){
        for(let j = 1; j <= 13; j++){
            cards.push({number: j, color: 'Spade', status: 'unSettled', posX:0,posY:0});
        }
    }
    cards.sort(()=> Math.random() - 0.5);
    return cards;
}

export const dragable = (cards: Card[]) => {
    for(let i = 1; i < cards.length; i++){
        if(cards[i].number != cards[i-1].number - 1){
            return false;
        }
    }
    return true;
}