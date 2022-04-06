import React from 'react';
import GameBoard from '../GameBoard';
import { generateCards } from '../../libs/generateCard';

const Game = () => {
    return (<GameBoard cards={generateCards()}/>)
}

export default Game;