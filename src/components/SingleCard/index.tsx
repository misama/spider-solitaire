import React from 'react';
import { Card } from '../../libs/generateCard';

const SingleCard : React.FunctionComponent<{
    card: Card,
    status: number,
    position: number,
}> = ({card: {number, color}, status, position}) => {
        if (status !== 0) {
            return (
                <div style={{zIndex: position, height: '5%' }}>
                    <img src={`./assets/${color}${number}.jpg`} />
                </div>
            )
        } else {
            return <div> to be done </div>
        }
}

export default SingleCard