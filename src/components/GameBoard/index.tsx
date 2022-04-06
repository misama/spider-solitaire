import React from 'react';
import './index.less';
import {Card } from '../../libs/generateCard';
import SingleCard from '../SingleCard';

const GameBoard: React.FunctionComponent<{
    cards: Card[];
}> = ({cards}) => {
    return (
        <div className="game-board">
            <div>
                <div className="un-opened">

                </div>
                <div className="resolved">

                </div>
            </div>
            <div className="game-field">
                {cards.map((card) => <SingleCard card={card} status={1}/>)}
            </div>
        </div>
    )
}

export default GameBoard;