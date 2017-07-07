import React from 'react';

export const Card = ({ card }) => {

    const { num, suit } = card

    return (
        <div className="card">
            <div className="card__num">{num}</div>
            <div className="card__suit">{suit}</div>
            <div className="card__num">{num}</div>
        </div>
    )
}