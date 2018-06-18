import { combineReducers } from 'redux'

const game = (
  state = {
    deck: null,
    numPlayers: 0,
    currentPlayer: 0,
    stacks: {},
    currentCircuit: []
  },
  action
) => {
  switch (action.type) {
    case 'INIT_DECK':
      return {
        ...state,
        deck: action.deck
      }
    case 'SET_PLAYERS':
      const { numPlayers } = action
      const stacks = [...Array(numPlayers)].map((baz, i) => i).reduce(
        (acc, player) => ({
          ...acc,
          [player]: []
        }),
        {}
      )

      return {
        ...state,
        numPlayers,
        stacks
      }
    case 'NEXT_PLAYER':
      return {
        ...state,
        currentPlayer: action.player
      }
    case 'DRAW_CARD':
      const { player, drawnCard, newDeck } = action

      return {
        ...state,
        deck: newDeck,
        stacks: {
          ...state.stacks,
          [player]: [...state.stacks[player], [drawnCard]]
        }
      }
    case 'UPDATE_CIRCUIT':
      return {
        ...state,
        currentCircuit: [...state.currentCircuit, action.drawnCard]
      }
    case 'RESET_CIRCUIT':
      return {
        ...state,
        currentCircuit: [action.drawnCard]
      }
    default:
      return state
  }
}

const settings = (
  state = {
    // time between when a card's drawn and the countdown starts
    preCountdown: 2500,
    // time between card draws after the previous countdown
    drinkBreak: 2000
  },
  action
) => {
  switch (action.type) {
    case 'UPDATE_PRE_COUNTDOWN':
      return state
    case 'UPDATE_DRINK_BREAK':
      return state
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  game,
  settings
})
