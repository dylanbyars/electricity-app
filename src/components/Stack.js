import React from 'react';

import { Card } from './Card';

export const Stack = ({ cards }) => {

    const stack = cards.map(card => <Card card={card} />)

    return (
        <div className="stack">
            A
        </div>
    )

}