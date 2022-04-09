import React, {useEffect} from 'react';
import './index.less';
import { Card } from '../../libs/generateCard';
import Column from '../Column';
import { useImmerReducer } from "use-immer";
import {reducer, initialState, CardsContext} from '../../libs/state'

const GameBoard: React.FunctionComponent = () => {
    const [state, dispatch] = useImmerReducer(reducer, initialState)
    useEffect(() => {
        dispatch({type: 'init'})
        //todo: add Throttling
        window.addEventListener('resize',() => {
            dispatch({type: 'resize'})
        })
        return () => {}
    }, [])
    return (
        <CardsContext.Provider value={{state, dispatch}}>
            <div className="game-board">
                <div>
                    <div className="un-opened">

                    </div>
                    <div className="resolved">

                    </div>
                </div>
                <div className="game-field">
                    {state.columns.map((column, index) => <Column key={`column${index}`} cards={column} index={index}/>)}
                </div>
            </div>
        </CardsContext.Provider>
    )
}

export default GameBoard;