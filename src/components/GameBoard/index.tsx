import React, {MouseEvent, useEffect} from 'react';
import './index.less';
import Column from '../Column';
import { useImmerReducer } from 'use-immer';
import {reducer, initialState, CardsContext} from '../../libs/state'

const GameBoard: React.FunctionComponent = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  useEffect(() => {
    dispatch({type: 'init'})
    //TODO: add Throttling
    const onResize = () => {
      dispatch({type: 'resize'})
    }
    window.addEventListener('resize',onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  const handleMouseUp = (event: MouseEvent) => {
    //TODO: 应该全局（window）检测鼠标抬起来
    if(state.movingCard) {
      dispatch({type: 'moveEnd', data: {mousePageX: event.pageX, mousePageY: event.pageY}})
    }
  }

  const handleDragCards = (event:MouseEvent) => {
    //TODO: add Throttling
    dispatch({type: 'moving', data: {mousePosX: event.clientX, mousePosY: event.clientY}})
  }
  return (
    <CardsContext.Provider value={{state, dispatch}}>
      <div
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragCards}
        className="game-board"
      >
        <div className="top-line">
          <div className="place-holder un-opened">
            {state.unSettled.length > 0 ? <img
              draggable="false"
              src={'./assets/card-back.png'}
            /> : <img
              draggable="false"
              src={'./assets/place-holder.png'}
            />}
          </div>
          <div className="resolved">
            {state.resolved.map(resolved=> (
              <div className="place-holder reso-single">
                {resolved ? <img
                  draggable="false"
                  src={'./assets/card-back.png'}
                /> : <img
                  draggable="false"
                  src={'./assets/place-holder.png'}
                />}</div>
            ))}
          </div>
        </div>
        <div className="clear"/>
        <div className="game-field">
          {state.columns.map((column, index) => <Column key={`column${index}`} cards={column} index={index}/>)}
        </div>
      </div>
    </CardsContext.Provider>
  )
}

export default GameBoard;