import React, { SyntheticEvent, useContext, useState } from 'react';
import { Card } from '../../libs/generateCard';
import {CardsContext} from '../../libs/state';

const SingleCard : React.FunctionComponent<{
    card: Card,
    position: {col: number, row: number},
    draggable: boolean,
}> = ({card: {number, color, status, posX, posY}, position, draggable }) => {
    const { dispatch } = useContext(CardsContext);
    const [selected, setSelected] = useState<boolean>(false)
    const handleMouseDown = (e: any) => {
        if(draggable){
            setSelected(true);
            dispatch({
                type: 'moveStart', 
            data: {...position, mousePosX: e.clientX, mousePosY: e.clientY}})
        }else{
            //console.log('111111')
        }
    }
    
    const handleMouseUp = (e: SyntheticEvent) => {
        setSelected(false);

    }
    //status==='opened'
    return (
        <div 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{zIndex: selected ? 999 : position.row,  position: 'relative', left: `${posX}px`,top: `${posY}px`}}
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