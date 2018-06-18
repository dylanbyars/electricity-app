import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { doTurn } from '../actions/game.actions'

import CountUp from 'react-countup'

const onComplete = () => {
  console.log('Completed! 👏')
}

const onStart = () => {
  console.log('Started! 💨')
}

const DrinkCount = ({ count, dispatch }) => (
  <CountUp
    start={0}
    end={count}
    duration={count * 0.3}
    useEasing={false}
    useGrouping={true}
    decimals={0}
    prefix=""
    suffix=""
    onComplete={() => dispatch(doTurn())}
    onStart={onStart}
  />
)

const enhance = compose(connect())

export default enhance(DrinkCount)
