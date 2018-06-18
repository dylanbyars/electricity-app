import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withState, lifecycle } from 'recompose'
import { counts } from '../game'

import DrinkCount from './DrinkCount'

const Player = ({ playerNum, currentPlayer, suit, count }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h3>Player {playerNum + 1}</h3>
      <h1>
        {suit} {count}
      </h1>
      {currentPlayer === playerNum && (
        <DrinkCount currentPlayer={currentPlayer} count={counts(count)} />
      )}
    </div>
  )
}

Player.propType = {
  playerNum: PropTypes.number.isRequired
}

const mapStateToProps = (state, props) => {
  const { currentPlayer, stacks } = state.game
  debugger
  if (currentPlayer === props.playerNum) {
    const stack = stacks[props.playerNum]
    const currentCard = [...stack].pop()[0]
    const [suit, count] = currentCard
    return {
      suit,
      count,
      currentPlayer
    }
  } else {
    return {
      suit: null,
      count: null,
      currentPlayer
    }
  }
}

const enhance = compose(
  connect(mapStateToProps)
  // withState('count', 'setCount', 0),
  // withState('topSuit', 'setTopSuit', ''),
  // withState('topCount', 'setTopCount', ''),
  // lifecycle({
  //   componentDidUpdate(nextProps) {
  //     const {
  //       currentPlayer,
  //       playerNum,
  //       stack,
  //       setTopSuit,
  //       setTopCount,
  //       setCount
  //     } = nextProps

  //     if (currentPlayer === playerNum) {
  //       const currentCard = [...stack].pop()[0]
  //       const [suit, count] = currentCard
  //       setTopSuit(suit)
  //       setTopCount(count)
  //       setCount(counts[count])
  //     }
  //   }
  // })
)

export default enhance(Player)
