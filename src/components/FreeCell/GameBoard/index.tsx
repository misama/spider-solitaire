import React, {MouseEvent, useEffect} from 'react';
import Column from '../Column';
import { useImmerReducer } from 'use-immer';
import {reducer, initialState, FreeCellContext} from '../state'

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
    if(state.movingCard) {
      dispatch({type: 'moving', data: {mousePosX: event.clientX, mousePosY: event.clientY}})
    }
  }
  return (
    <FreeCellContext.Provider value={{state, dispatch}}>
      <div
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragCards}
        className="freecell game-board"
      >
        <div className="top-line">
          <div className='resolved'>
            {state.resolved.map((resolved, index) =>
              resolved.length === 0 ?
                <div className='place-holder reso-single'>
                  <img
                    draggable="false"
                    src={'./assets/place-holder.png'}
                  /></div> :
                <Column key={`resolved${index}`} cards={resolved} index={index}/>
            )}
          </div>
          <div className="temp-place">
            {state.tempPlace.map((tempCard) =>
              tempCard ?
                <div className='place-holder reso-single'>
                  <img
                    draggable="false"
                    src={'./assets/place-holder.png'}
                  /></div> :
                <div className='place-holder reso-single'>
                  <img
                    draggable="false"
                    src={'./assets/place-holder.png'}
                  /></div>
            )}
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