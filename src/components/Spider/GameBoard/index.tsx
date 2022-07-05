import React, {MouseEvent, useEffect} from 'react';
import './index.less';
import Column from '../Column';
import { useImmerReducer } from 'use-immer';
import {reducer, initialState, SpiderContext} from '../state'
import classnames from 'classnames';

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
    //TODO: should globbal（window）check mmouse
    if(state.movingCard) {
      dispatch({type: 'moveEnd', data: {mousePageX: event.pageX, mousePageY: event.pageY}})
    }
  }

  const handleDragCards = (event:MouseEvent) => {
    //TODO: add Throttling
    if(state.movingCard) {
      dispatch({type: 'moving', data: {mousePosX: event.clientX, mousePosY: event.clientY}})
    }
  }

  const handleSendNewCards = () => {
    dispatch({type: 'newCards'})
  }

  return (
    <SpiderContext.Provider value={{state, dispatch}}>
      <div
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragCards}
        className="spider game-board"
      >
        <div className="top-line">
          <div className={classnames(`${state.unSettled.length > 0 ? 'card' : 'place-holder'}`, 'un-opened')}>
            {state.unSettled.length > 0 ?
              <img
                onClick={handleSendNewCards}
                draggable="false"
                src={'./assets/card-back.png'}
              /> :
              <img
                draggable="false"
                src={'./assets/place-holder.png'}
              />}
          </div>
          <div className="resolved">
            {state.resolved.map(resolved=> (
              <div className={classnames(`${resolved ? 'card' : 'place-holder'}`, 'reso-single')}>
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
    </SpiderContext.Provider>
  )
}

export default GameBoard;