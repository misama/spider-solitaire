import React, { MouseEvent, useContext, useState } from 'react';
import { Card } from '../../libs/game';
import {CardsContext} from '../../libs/state';

const SingleCard : React.FunctionComponent<{
    card: Card,
    position: {col: number, row: number},
    draggable: boolean,
}> = ({card: {number, color, status, posX, posY}, position, draggable }) => {
  const { dispatch } = useContext(CardsContext);
  const [selected, setSelected] = useState<boolean>(false)
  const handleMouseDown = (event: MouseEvent) => {
    if(draggable) {
      setSelected(true);
      dispatch({
        type: 'moveStart',
        data: {...position, mousePosX: event.clientX, mousePosY: event.clientY}})
    }
  }

  const handleMouseUp = () => {
    //TODO: 如果鼠标跑太快，卡片没跟上就松开鼠标这里会出错。
    setSelected(false);

  }
  //status==='opened'
  return (
    <div
      className="card"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{zIndex: selected ? 999 : position.row,  position: 'relative', left: `${posX}px`,top: `${posY}px`}}
    >
      <img
        draggable="false"
        src={status ? `./assets/${color}${number}.png`
          : './assets/card-back.png'
        }
      />
    </div>
  )
}

export default SingleCard