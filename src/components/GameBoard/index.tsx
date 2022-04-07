import React from 'react';
import './index.less';
import { Card } from '../../libs/generateCard';
import SingleCard from '../SingleCard';
import { useImmerReducer } from "use-immer";

interface GameStatus {
    columns: Card[][],
}

interface ActionInterface {
    type: 'move'
}
const initialState: GameStatus = {
    columns: []
};

function reducer(draft: GameStatus, action: ActionInterface) {
 switch (action.type) {
   case "move":
     return;
 }
}

const GameBoard: React.FunctionComponent<{
    cards: Card[];
}> = ({cards}) => {
    for(let i = 0; i < 10; i++){
        initialState.columns.push([]);
    }
    //
    for(let i = 0; i < 54; i++){
        initialState.columns[i%10].push(cards[i])
    }
    console.log(initialState);
    const [state, dispatch] = useImmerReducer(reducer, initialState)
    return (
        <div className="game-board">
            <div>
                <div className="un-opened">

                </div>
                <div className="resolved">

                </div>
            </div>
            <div className="game-field">
                {state.columns.map(column => <div className="column">
                    {column.map((card, index )=> <SingleCard card={card} position={index} status={1}/>)}
                </div>)}
            </div>
        </div>
    )
}

export default GameBoard;