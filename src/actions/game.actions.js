const setNumPlayers = (num) => {
    return {
        type: 'SET_NUM_PLAYERS',
        payload: num
    }
}

const updateDeck = (deck) => {
    return {
        type: 'UPDATE_DECK',
        payload: deck
    }
}

const initStacks = (numPlayers) => {
    return {
        type: 'INIT_STACKS',
        payload: numPlayers
    }
}

const updateStacks = ( currentPlayer, card ) => {
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
    updateDeck,
    initStacks,
    updateStacks,
    nextPlayer,
    updateCircuit,
    resetCircuit
}