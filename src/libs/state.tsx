import React from 'react';
import { Card, generateCards } from './generateCard';
interface GameProps {
    columns: Card[][],
    unSettled: Card[],
}

type ActionInterface = {
    type: 'resize'
} | {
    type: 'init'
} | {
    type: 'move', 
    data: {col: number, row: number}
}
interface ContextProps {
    state: GameProps,
    dispatch: React.Dispatch<ActionInterface>
}

export const initialState: GameProps = {
    columns: [],
    unSettled: [],
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
      case 'move':
        draft.columns[action.data.col] = draft.columns[action.data.col].slice(0,action.data.row)
        return;
    }
}

export const CardsContext = React.createContext({} as ContextProps);