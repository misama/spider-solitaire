import React from 'react';
import { Card, generateCards } from '../../libs/game';
import {MovingInterface} from '../../libs/interfaces';

interface GameProps {
    columns: Card[][],
    resolved: Card[][];
    tempPlace: Card[]; //right-top four place
    movingCard: {col: number, row: number} | null,
    movingStartPos: {cardX: number, cardY: number, mousePosX: number, mousePosY: number} | null
}

type ActionInterface = {
    type: 'resize'
} | {
    type: 'init'
} | MovingInterface;

interface ContextProps {
    state: GameProps,
    dispatch: React.Dispatch<ActionInterface>
}

export const initialState: GameProps = {
  columns: [],
  movingCard: null,
  movingStartPos: null,
  tempPlace: new Array(4).fill(null),
  resolved: new Array(4).fill([]),
};

export function reducer (draft: GameProps, action: ActionInterface): void {
  let cards;
  switch (action.type) {
  case 'init':
    cards = generateCards(4);
    console.log(cards)
    for(let i = 0; i < 8; i++) {
      draft.columns.push([]);
    }
    for(let i = 0; i < 52; i++) {
      draft.columns[i % 8].push({...cards[i], status: 'opened', posY: -Math.floor(i / 8) * window.innerWidth / 10.5})
    }
    return;
  case 'resize':
    for(let i = 0; i < draft.columns.length; i++) {
      for(let j = 0; j < draft.columns[i].length; j++) {
        draft.columns[i][j] = {...draft.columns[i][j], posY: -j * window.innerWidth / 10.5}
      }
    }
    return;
  case 'moveStart':
    return;
  case 'moving':

    return;
  case 'moveEnd':

    return;
  }
}

export const FreeCellContext = React.createContext({} as ContextProps);