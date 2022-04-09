import React from 'react';
import { Card, generateCards } from './generateCard';
interface GameProps {
    columns: Card[][],
    unSettled: Card[],
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
};

export function reducer(draft: GameProps, action: ActionInterface) {
    switch (action.type) {
      case 'init':
        const cards = generateCards();
        for(let i = 0; i < 10; i++){
            draft.columns.push([]);
        }
        for(let i = 0; i < 44; i++){
            draft.columns[i%10].push({...cards[i], status: 'unOpened', posY: -Math.floor(i/10)*window.innerWidth/10.5})
        }
        for(let i = 44; i < 54; i++){
            draft.columns[i%10].push({...cards[i], status: 'opened', posY: -Math.floor(i/10)*window.innerWidth/10.5})
        }
        return;
      case 'resize':
        for(let i = 0; i < draft.columns.length; i++){
            for(let j = 0; j < draft.columns[i].length; j++){
                draft.columns[i][j] = {...draft.columns[i][j], posY: -j*window.innerWidth/10.5}
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
          if(draft.movingCard && draft.startPos){ 
              console.log(action.data.mousePosX - draft.startPos.mousePosX, action.data.mousePosY - draft.startPos.mousePosY)
            draft.columns[draft.movingCard.col][draft.movingCard.row].posX =
            draft.startPos.cardX + action.data.mousePosX - draft.startPos.mousePosX;
            draft.columns[draft.movingCard.col][draft.movingCard.row].posY = 
            draft.startPos.cardY
            + action.data.mousePosY - draft.startPos.mousePosY;
          }
        return;
      case 'moveEnd':
        if(draft.movingCard){
            //draft.columns[draft.movingCard.col] = draft.columns[draft.movingCard.col].slice(0,draft.movingCard.row)
        }
        draft.movingCard = null;
        draft.startPos = null;
        return;
    }
}

export const CardsContext = React.createContext({} as ContextProps);