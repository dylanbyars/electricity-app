import React from 'react';

export const Stack = ({ cards }) => {

    console.log(cards)

    if (cards) {
        return (
            <div className="stack">
                { cards.map(card => {
                    let suit = card[0]
                    let rank = card.slice(1)
                    return (
                        <div className="card" key={Math.random()}>
                            <div className="card__rank">{rank}</div>
                            <div className="card__suit">{suit}</div>
                            <div className="card__rank">{rank}</div>
                        </div>
                    )
                }) }
            </div>
        )
    } else {
        return <h6>empty</h6>
    }


}