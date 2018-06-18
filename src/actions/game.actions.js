import { draw, buzz } from '../game'

const setPlayers = numPlayers => {
  return {
    type: 'SET_PLAYERS',
    numPlayers
  }
}

const initDeck = deck => {
  return {
    type: 'INIT_DECK',
    deck
  }
}

const drawCard = player => {
  return (dispatch, getState) => {
    const state = getState()

    const { deck, currentCircuit } = state.game

    if (deck.remaining() > 0) {
      const { drawnCard, newDeck } = draw(deck)

      dispatch({
        type: 'DRAW_CARD',
        player,
        drawnCard,
        newDeck
      })

      if (currentCircuit.length && buzz([...currentCircuit].pop(), drawnCard)) {
        debugger
        dispatch({
          type: 'UPDATE_CIRCUIT',
          drawnCard
        })
      } else {
        dispatch({
          type: 'RESET_CIRCUIT',
          drawnCard
        })
      }
    }
  }
}

const doTurn = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { currentPlayer, numPlayers } = state.game
    const player = currentPlayer < numPlayers - 1 ? currentPlayer + 1 : 0
    dispatch({
      type: 'NEXT_PLAYER',
      player
    })
    dispatch(drawCard(player))
  }
}

export { setPlayers, initDeck, drawCard, doTurn }
