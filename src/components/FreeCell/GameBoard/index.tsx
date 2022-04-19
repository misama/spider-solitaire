import React, {MouseEvent, useEffect} from 'react';
import Column from '../Column';
import { useImmerReducer } from 'use-immer';
import {reducer, initialState, FreeCellContext} from '../state'

const GameBoard: React.FunctionComponent = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  console.log(1111111)
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
    <FreeCellContext.Provider value={{state, dispatch}}>
      <div
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragCards}
        className="freecell game-board"
      >
        <div className="top-line">
          <div>
          </div>
          <div className="resolved">
          </div>
        </div>
        <div className="clear"/>
        <div className="game-field">
          {state.columns.map((column, index) => <Column key={`column${index}`} cards={column} index={index}/>)}
        </div>
      </div>
    </FreeCellContext.Provider>
  )
}

export default GameBoard;