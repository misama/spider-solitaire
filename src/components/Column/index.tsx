import React from 'react';
import { Card, dragable } from '../../libs/game';
import SingleCard from '../SingleCard';

const Column: React.FunctionComponent<{cards: Card[], index: number}> = ({cards, index}) => {
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