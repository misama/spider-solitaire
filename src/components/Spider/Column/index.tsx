import React, {useContext}from 'react';
import { Card, dragable } from '../../../libs/game';
import {SpiderContext} from '../state';
import SingleCard from '../../SingleCard';

const Column: React.FunctionComponent<{cards: Card[], index: number}> = ({cards, index}) => {

  const { dispatch } = useContext(SpiderContext);
  return (
    <div
      className="column">
      {cards.map((card, ind)=>
        <SingleCard
          card={card}
          position={{col: index, row: ind}}
          draggable={dragable(cards.slice(ind))}
          dispatch={dispatch}
        />)}
    </div>)
}

export default Column;