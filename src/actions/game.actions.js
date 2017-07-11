const setNumPlayers = (num) => {
    return {
        type: 'SET_NUM_PLAYERS',
        payload: num
    }
}

const initDeck = () => {
    return {
        type: 'INIT_DECK'
    }
}

const drawCard = () => {
    return {
        type: 'DRAW_CARD'
    }
}

const updateStacks = ( card, currentPlayer ) => {
    return {
        type: 'UPDATE_STACKS',
        payload: {
            card, currentPlayer
        }
    }
}

const nextPlayer = () => {
    return {
        type: 'NEXT_PLAYER'
    }
}

const updateCircuit = (card) => {
    return {
        type: 'UPDATE_CIRCUIT',
        payload: card
    }
}

const resetCircuit = (card) => {
    return {
        type: 'RESET_CIRCUIT',
        payload: card
    }
}

export { 
    setNumPlayers,
    initDeck,
    drawCard,
    updateStacks,
    nextPlayer,
    updateCircuit,
    resetCircuit
}