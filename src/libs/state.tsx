import React from 'react';
import { Card, generateCards, dropable } from './game';

interface GameProps {
    columns: Card[][],
    unSettled: Card[],
    resolved: boolean[];
    movingCard: {col: number, row: number} | null,
    startPos: {cardX: number, cardY: number, mousePosX: number, mousePosY: number} | null
}

type ActionInterface = {
    type: 'resize'
} | {
    type: 'init'
} | {
    type: 'moveStart',
    data: {col: number, row: number, mousePosX: number, mousePosY: number}
} | {
    type: 'moving',
    data: {mousePosX: number, mousePosY: number}
} | {
    type: 'moveEnd',
    data: {mousePageX: number, mousePageY: number}
}

interface ContextProps {
    state: GameProps,
    dispatch: React.Dispatch<ActionInterface>
}

export const initialState: GameProps = {
  columns: [],
  unSettled: [],
  movingCard: null,
  startPos: null,
  resolved: new Array(8).fill(false),
};

export function reducer (draft: GameProps, action: ActionInterface): void {
  let cards;
  switch (action.type) {
  case 'init':
    cards = generateCards();
    for(let i = 0; i < 10; i++) {
      draft.columns.push([]);
    }
    for(let i = 0; i < 44; i++) {
      draft.columns[i % 10].push({...cards[i], status: 'unOpened', posY: -Math.floor(i / 10) * window.innerWidth / 10.5})
    }
    for(let i = 44; i < 54; i++) {
      draft.columns[i % 10].push({...cards[i], status: 'opened', posY: -Math.floor(i / 10) * window.innerWidth / 10.5})
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
    draft.movingCard = {col: action.data.col, row: action.data.row}
    draft.startPos = {
      cardX: draft.columns[draft.movingCard.col][draft.movingCard.row].posX,
      cardY: draft.columns[draft.movingCard.col][draft.movingCard.row].posY,
      mousePosX: action.data.mousePosX,
      mousePosY: action.data.mousePosY
    }
    return;
  case 'moving':
    //TODO: 这个卡后面的所有卡片都要跟着移动
    if(draft.movingCard && draft.startPos) {
      console.log(action.data.mousePosX - draft.startPos.mousePosX, action.data.mousePosY - draft.startPos.mousePosY)
      draft.columns[draft.movingCard.col][draft.movingCard.row].posX =
            draft.startPos.cardX + action.data.mousePosX - draft.startPos.mousePosX;
      draft.columns[draft.movingCard.col][draft.movingCard.row].posY =
            draft.startPos.cardY
            + action.data.mousePosY - draft.startPos.mousePosY;
    }
    return;
  case 'moveEnd':
    if(draft.movingCard && draft.startPos) {
      const columnWidth = window.innerWidth / 10;
      //TODO: 应该算上卡片的长度，来确切计算应该落在哪一列
      //如果落在边界外面也要处理
      const stopInColumn = Math.round(action.data.mousePageX / columnWidth);
      if(dropable(stopInColumn, draft.movingCard.col, draft.columns[draft.movingCard.col][draft.movingCard.row])) {
        draft.columns[stopInColumn] = draft.columns[stopInColumn].concat(draft.columns[draft.movingCard.col].slice(draft.movingCard.row));
        draft.columns[draft.movingCard.col] = draft.columns[draft.movingCard.col].slice(0,draft.movingCard.row)
        console.log(stopInColumn);
        draft.columns[stopInColumn].forEach((card, ind)=>{
          card.posX = 0;
          card.posY = -ind * window.innerWidth / 10.5
        })
      }else{
        draft.columns[draft.movingCard.col].forEach((card, ind)=>{
          card.posX = 0;
          card.posY = -ind * window.innerWidth / 10.5
        })
      }
    }
    draft.movingCard = null;
    draft.startPos = null;
    return;
  }
}

export const CardsContext = React.createContext({} as ContextProps);