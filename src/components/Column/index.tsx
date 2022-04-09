import React, { MouseEvent, useContext }from 'react';
import { Card, dragable } from '../../libs/game';
import SingleCard from '../SingleCard';
import {CardsContext} from '../../libs/state';
const Column: React.FunctionComponent<{cards: Card[], index: number}> = ({cards, index}) => {
    const { dispatch } = useContext(CardsContext)

    return (
    <div 
    className="column">
        {cards.map((card, ind)=> 
        <SingleCard 
            card={card} 
            position={{col: index, row: ind}}
            draggable={dragable(cards.slice(ind))}
        />)}
  </div>)
}

export default Column;