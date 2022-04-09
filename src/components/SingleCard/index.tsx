import React, { SyntheticEvent, useContext } from 'react';
import { Card } from '../../libs/generateCard';
import {CardsContext} from '../../libs/state';

const SingleCard : React.FunctionComponent<{
    card: Card,
    position: {col: number, row: number},
    draggable: boolean,
}> = ({card: {number, color, status, posX, posY}, position, draggable }) => {
    const { dispatch } = useContext(CardsContext);
    const handleMouseDown = (e: SyntheticEvent) => {
        if(draggable){
            console.log('123123123', position) 
            dispatch({type: 'move', data: position})
        }else{
            console.log('222222')
        }
    }
    //status==='opened'
    return (
        <div 
            onMouseDown={handleMouseDown}
            style={{zIndex: position.row,  position: 'relative', left: `0px`,top: `${posY}px`}}
        >
            <img 
            draggable="false"
            src={status ? `./assets/${color}${number}.jpg` 
            : `./assets/card-back.jpeg`
            } />
        </div>
    )
}

export default SingleCard