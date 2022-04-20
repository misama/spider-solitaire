import React from 'react';
import { Card, generateCards, dropable } from '../../libs/game';
import {MovingInterface } from '../../libs/interfaces';

interface GameProps {
    columns: Card[][],
    unSettled: Card[],
    resolved: boolean[];
    movingCard: {col: number, row: number} | null,
    movingStartPos: {cardX: number, cardY: number, mousePosX: number, mousePosY: number} | null
}

type ActionInterface = {
    type: 'resize'
} | {
    type: 'init'
} | {
  type: 'newCards'
} | MovingInterface;

interface SpiderContextProps {
    state: GameProps,
    dispatch: React.Dispatch<ActionInterface>
}

export const initialState: GameProps = {
  columns: [],
  unSettled: [],
  movingCard: null,
  movingStartPos: null,
  resolved: new Array(8).fill(false),
};

export function reducer (draft: GameProps, action: ActionInterface): void {
  let originC;
  let originR;
  let cards;
  switch (action.type) {
  case 'init':
    cards = generateCards(8);
    for(let i = 0; i < 10; i++) {
      draft.columns.push([]);
    }
    for(let i = 0; i < 44; i++) {
      draft.columns[i % 10].push({...cards[i], status: 'unOpened', posY: -Math.floor(i / 10) * window.innerWidth / 10.5})
    }
    for(let i = 44; i < 54; i++) {
      draft.columns[i % 10].push({...cards[i], status: 'opened', posY: -Math.floor(i / 10) * window.innerWidth / 10.5})
    }
    draft.unSettled = cards.slice(54);
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
    if(draft.movingCard && draft.movingStartPos) {
      const columnWidth = window.innerWidth / 10;
      originC = draft.movingCard.col;
      originR = draft.movingCard.row;
      //TODO: 应该算上卡片的长度，来确切计算应该落在哪一列
      //如果落在边界外面也要处理
      const stopInColumn = Math.round(action.data.mousePageX / columnWidth);
      if(dropable(draft.columns, stopInColumn, originC, draft.columns[originC][originR], 'spider')) {
        draft.columns[stopInColumn] = draft.columns[stopInColumn].concat(draft.columns[originC].slice(originR));
        draft.columns[originC] = draft.columns[originC].slice(0,originR);
        console.log(stopInColumn);
        draft.columns[stopInColumn].forEach((card, ind)=>{
          card.posX = 0;
          card.posY = -ind * window.innerWidth / 10.5
        })
        if(draft.columns[originC].length > 0) {
          draft.columns[originC][draft.columns[originC].length - 1].status = 'opened';
        }
      }else{
        draft.columns[originC].forEach((card, ind)=>{
          card.posX = 0;
          card.posY = -ind * window.innerWidth / 10.5
        })
      }
    }
    draft.movingCard = null;
    draft.movingStartPos = null;
    return;
  case 'newCards':
    for(let i = 0; i < 10; i++) {
      draft.columns[i].push({...draft.unSettled[i], status: 'opened', posY: -draft.columns[i].length * window.innerWidth / 10.5})
    }
    draft.unSettled = draft.unSettled.slice(10);
    return;
  }
}

export const SpiderContext = React.createContext({} as SpiderContextProps);