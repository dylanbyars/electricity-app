import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import DrinkCount from './DrinkCount'

const counts = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const Player = ({ playerNum, currentPlayer, suit, count, countUp }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h3>Player {playerNum + 1}</h3>
      <h1>
        {suit} {count}
      </h1>
      {currentPlayer === playerNum && (
        <DrinkCount currentPlayer={currentPlayer} count={countUp} />
      )}
    </div>
  )
}

Player.propType = {
  playerNum: PropTypes.number.isRequired
}

const mapStateToProps = (state, props) => {
  const { currentPlayer, stacks } = state.game

  if (currentPlayer === props.playerNum) {
    const stack = stacks[props.playerNum]
    const currentCard = [...stack].pop()[0]
    const [suit, count] = currentCard
    const countUp = counts[count]
    return {
      suit,
      count,
      countUp,
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

const enhance = compose(connect(mapStateToProps))

export default enhance(Player)
