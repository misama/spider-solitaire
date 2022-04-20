import React from 'react';
import { Card, generateCards, dropable } from '../../libs/game';
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
  let originC;
  let originR;
  switch (action.type) {
  case 'init':
    cards = generateCards(4);
    console.log(cards)
    for(let i = 0; i < 8; i++) {
      draft.columns.push([]);
    }
    for(let i = 0; i < 52; i++) {
      draft.columns[i % 8].push({...cards[i], status: 'opened', posY: -Math.floor(i / 8) * window.innerWidth / 10})
    }
    return;
  case 'resize':
    for(let i = 0; i < draft.columns.length; i++) {
      for(let j = 0; j < draft.columns[i].length; j++) {
        draft.columns[i][j] = {...draft.columns[i][j], posY: -j * window.innerWidth / 10}
      }
    }
    return;
  case 'moveStart':
    draft.movingCard = {col: action.data.col, row: action.data.row}
    originC = action.data.col;
    originR = action.data.row;
    draft.movingStartPos = {
      cardX: draft.columns[originC][originR].posX,
      cardY: draft.columns[originC][originR].posY,
      mousePosX: action.data.mousePosX,
      mousePosY: action.data.mousePosY
    }
    return;
  case 'moving':
    //TODO: 这个卡后面的所有卡片都要跟着移动
    if(draft.movingCard && draft.movingStartPos) {
      originC = draft.movingCard.col;
      originR = draft.movingCard.row;
      console.log(action.data.mousePosX - draft.movingStartPos.mousePosX, action.data.mousePosY - draft.movingStartPos.mousePosY)
      draft.columns[originC][originR].posX =
            draft.movingStartPos.cardX + action.data.mousePosX - draft.movingStartPos.mousePosX;
      draft.columns[originC][originR].posY =
            draft.movingStartPos.cardY
            + action.data.mousePosY - draft.movingStartPos.mousePosY;
    }
    return;
  case 'moveEnd':
    console.log('1212121212', draft.movingCard?.col, draft.movingStartPos?.cardX)
    if(draft.movingCard && draft.movingStartPos) {
      const columnWidth = window.innerWidth / 8;
      originC = draft.movingCard.col;
      originR = draft.movingCard.row;
      //TODO: 应该算上卡片的长度，来确切计算应该落在哪一列
      //如果落在边界外面也要处理
      const stopInColumn = Math.round(action.data.mousePageX / columnWidth);
      if(dropable(draft.columns, stopInColumn, originC, draft.columns[originC][originR], 'freecell')) {
        draft.columns[stopInColumn] = draft.columns[stopInColumn].concat(draft.columns[originC].slice(originR));
        draft.columns[originC] = draft.columns[originC].slice(0,originR);
        console.log(stopInColumn);
        draft.columns[stopInColumn].forEach((card, ind)=>{
          card.posX = 0;
          card.posY = -ind * window.innerWidth / 10
        })
      }else{
        draft.columns[originC].forEach((card, ind)=>{
          card.posX = 0;
          card.posY = -ind * window.innerWidth / 10
        })
      }
    }
    draft.movingCard = null;
    draft.movingStartPos = null;
    return;
  }
}

export const FreeCellContext = React.createContext({} as ContextProps);