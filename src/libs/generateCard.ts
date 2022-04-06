export interface Card {
    number: number;
    color: 'Spade'|'Heart'|'Club'|'Diamond'
}

export const generateCards = (): Card[] => {
    const cards: Card[] = [];
    for(let i = 0; i < 8; i++){
        for(let j = 1; j <= 13; j++){
            cards.push({number: j, color: 'Spade'});
        }
    }
    cards.sort(()=> Math.random() - 0.5);
    return cards;
}