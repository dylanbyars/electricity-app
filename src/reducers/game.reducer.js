import { combineReducers } from 'redux'
import Deck from 'card-deck'

const CARDS = ['♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠10', '♠J', '♠Q', '♠K', '♠A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦10', '♦J', '♦Q', '♦K', '♦A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥10', '♥J', '♥Q', '♥K', '♥A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣10', '♣J', '♣Q', '♣K', '♣A']

const players = (state = {
    numPlayers: 0,
    currentPlayer: 0,
}, action) => {
    switch(action.type) {
        case 'SET_NUM_PLAYERS':
            return {
                ...state,
                numPlayers: action.payload
            }
        case 'NEXT_PLAYER': 
            let { numPlayers, currentPlayer } = state
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
        case 'INIT_DECK':
            return new Deck(CARDS).shuffle()
        case 'UPDATE_DECK':
            return action.payload
        default:
            return state
    }
}

const stacks = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_STACKS':
            let stacks = { ...state.stacks }
            let stack = action.payload.currentPlayer
            return {
                ...state,
                [stack]: [ ...stacks[stack], action.payload.card]
            }
        default:
            return state
    }
}

const circuit = (state = {
    currentCircuit: [],
    circuits: []
}, action) => {
    switch(action.type) {
        case 'UPDATE_CIRCUIT':
            return {
                ...state,
                currentCircuit: [ ...state.currentCircuit, action.payload.card ]
            }
        case 'RESET_CIRCUIT':
            return {
                ...state,
                circuit: state.circuits.push(state.circuits.currentCircuit),
                currentCircuit: action.payload.card
            }
        default:
            return state
    }
}

const stats = (state = null, action) => {
    switch(action.type) {
        case 'UPDATE_STATS':
            return state
        default:
            return state
    }
}

const settings = (state = {
    // time between when a card's drawn and the countdown starts
    preCountdown: 2500,
    // time between card draws after the previous countdown
    drinkBreak: 2000
}, action) => {
    switch(action.type) {
        case 'UPDATE_PRE_COUNTDOWN':
            return state
        case 'UPDATE_DRINK_BREAK':
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