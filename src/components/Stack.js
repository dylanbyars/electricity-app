import React from 'react';

import { Card } from './Card';

export const Stack = ({ cards }) => {

    const stack = cards.map(card => {
        //console.log(card)
        return <Card key={Math.random()} card={card} />
    })

    return <div className="stack">{stack}</div>

}