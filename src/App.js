import React from 'react'
import { connect } from 'react-redux'
import { compose, withState, withHandlers, lifecycle } from 'recompose'

import { startingDeck } from './game'

import { initDeck, setPlayers, drawCard } from './actions/game.actions'

import { Input, Button } from 'reactstrap'
import Player from './components/Player'

const App = ({ gameStarted, updateNumPlayers, startGame, stacks }) => (
  <div className="App" onKeyUp={e => e.keyCode === 13 && startGame()}>
    {gameStarted ? (
      <div className="d-flex w-100 justify-content-around">
        {Object.keys(stacks).map((player, i) => (
          <Player key={`${i}-${player[0]}`} playerNum={i} />
        ))}
      </div>
    ) : (
      <div className="d-flex flex-column w-25">
        <Input
          type="number"
          min="2"
          onChange={e => updateNumPlayers(e.target.value)}
        />
        <Button onClick={() => startGame()}>Go!</Button>
      </div>
    )}
  </div>
)

const mapStateToProps = state => {
  const { currentPlayer, stacks } = state.game
  return { currentPlayer, stacks }
}

const enhance = compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(initDeck(startingDeck()))
    }
  }),
  withState('numPlayers', 'setNumPlayers', 0),
  withState('gameStarted', 'setStartGame', false),
  withHandlers({
    updateNumPlayers: ({ setNumPlayers }) => numPlayers => {
      setNumPlayers(numPlayers)
    },
    startGame: ({ setStartGame, dispatch, numPlayers }) => () => {
      dispatch(setPlayers(parseInt(numPlayers, 10)))
      dispatch(drawCard(0))
      setStartGame(true)
    }
  })
)

export default enhance(App)
