import { combineReducers } from 'redux'

const players = (state = {
    numPlayers: 0,
    currentPlayer: 0,
}, action) => {
    switch(action.type) {
        case 'SET_NUM_PLAYERS':
            console.log('SET_NUM_PLAYERS')
            console.log(action.payload)
            return {
                ...state,
                numPlayers: action.payload
            }
        case 'NEXT_PLAYER': 
            let { numPlayers, currentPlayer } = state
            console.log('NEXT_PLAYER')            
            return { 
                ...state, 
                currentPlayer: currentPlayer < numPlayers - 1 ? currentPlayer + 1 : 0
            }
        default:
            return state
    }
}

const deck = (state = null, action) => {
    switch(action.type) {
        case 'UPDATE_DECK':
            console.log('UPDATE_DECK')
            return action.payload
        default:
            return state
    }
}

const stacks = (state = {}, action) => {
    switch(action.type) {
        case 'INIT_STACKS':
            console.log('INIT_STACKS')
            return {
                ...state,
                stacks: (() => {
                    let stacks = {}
                    for (let i = 0; i < action.payload; i++) {
                        stacks[i] = []
                    }
                    return stacks
                })()
            }
        case 'UPDATE_STACKS':
            console.log('UPDATE_STACKS')
            // let stacks = { ...state.stacks }
            //stacks[action.payload.currentPlayer] = [ ...stacks[action.payload.currentPlayer], payload.card]
            return {
                ...state,
                stacks
            }
        default:
            return state
    }
}

const circuit = (state = { currentCircuit: [] }, action) => {
    switch(action.type) {
        case 'UPDATE_CIRCUIT':
            console.log('UPDATE_CIRCUIT')
            return {
                ...state,
                currentCircuit: [ ...state.currentCircuit, action.payload.card ]
            }
        case 'RESET_CIRCUIT':
            console.log('RESET_CIRCUIT')
            return {
                ...state,
                currentCircuit: action.payload.card
            }
        default:
            return state
    }
}

const stats = (state = { stats: null }, action) => {
    switch(action.type) {
        case 'UPDATE_STATS':
            console.log('UPDATE_STATS')
            return state
        default:
            return state
    }
}

const settings = (state = {
    settings: {
        // time between when a card's drawn and the countdown starts
        preCountdown: 2500,
        // time between card draws after the previous countdown
        drinkBreak: 2000
    }
}, action) => {
    switch(action.type) {
        case 'UPDATE_PRE_COUNTDOWN':
            console.log('UPDATE_PRE_COUNTDOWN')
            return state
        case 'UPDATE_DRINK_BREAK':
            console.log('UPDATE_DRINK_BREAK')
            return state
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    players,
    deck,
    stacks,
    circuit,
    stats,
    settings
})