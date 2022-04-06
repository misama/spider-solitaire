import React from 'react';
import { Card } from '../../libs/generateCard';

const SingleCard : React.FunctionComponent<{card: Card, status: number}> = ({card: {number, color}, status}) => {
        if (status !== 0) {
            return (
                <div>
                    <img src={`./assets/${color}${number}.jpg`} />
                </div>
            )
        } else {
            return <div> to be done </div>
        }
}

export default SingleCard