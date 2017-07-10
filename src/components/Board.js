import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/game.actions'

import Deck from 'card-deck'

// import { Player } from './Player';
import { Stack } from './Stack'

class Board extends Component {
    constructor(props) {
        super(props)

        this.drawCard = this.drawCard.bind(this)
        this.showCountdown = this.showCountdown.bind(this)
        this.updateStacks = this.updateStacks.bind(this)
        this.updateCircuit = this.updateCircuit.bind(this)
    }

    componentDidMount() {

        const CARDS = ['♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠10', '♠J', '♠Q', '♠K', '♠A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦10', '♦J', '♦Q', '♦K', '♦A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥10', '♥J', '♥Q', '♥K', '♥A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣10', '♣J', '♣Q', '♣K', '♣A']

        // set the number of players playing. 
        this.props.actions.setNumPlayers(5)
        console.log(this.props.players)

        // set up their stacks
        this.props.actions.initStacks()
        
        // make a shuffled deck to play with
        this.props.actions.updateDeck(new Deck(CARDS).shuffle())

        // start the game!
        this.drawCard()
    }

    drawCard() {
        console.log(this.props)
        let deck = this.props.deck
        // draws a card from the deck object stored in deck
        let card = deck.draw()
        let suit = card[0]
        let rank = card.slice(1)

        let { players, stacks, circuit, settings } = this.props

        let { currentPlayer } = players
        let { preCountdown, drinkBreak } = settings

        console.log('Player: ' + currentPlayer)
        console.log('Draw: ' + rank, suit)
        console.log('Remaining: ' + deck.remaining())

        const getCountdown = (rank) => {
            switch(rank) {
                case '2': 
                    return {
                        count: 2,
                        time: 1000
                    }
                case '3':
                    return {
                        count: 3,
                        time: 1500
                    }
                case '4':
                    return {
                        count: 4,
                        time: 2000
                    }
                case '5':
                    return {
                        count: 5,
                        time: 2500
                    }
                case '6':
                    return {
                        count: 6,
                        time: 3000
                    }
                case '7':
                    return {
                        count: 7,
                        time: 3500
                    }
                case '8':
                    return {
                        count: 8,
                        time: 4000
                    }
                case '9':
                    return {
                        count: 9,
                        time: 4500
                    }
                case '10':
                    return {
                        count: 10,
                        time: 5000
                    }
                case 'J':
                    return {
                        count: 11,
                        time: 5500
                    }
                case 'Q':
                    return {
                        count: 12,
                        time: 6000
                    }
                case 'K':
                    return {
                        count: 13,
                        time: 6500
                    }
                case 'A':
                    return {
                        count: 14,
                        time: 7000
                    }
                default:
                    return
            }
        }

        let countdown = getCountdown(rank)

        this.showCountdown(countdown)

        this.props.actions.updateCircuit()

        // run timers

        // repeat

        if (deck.remaining() > 0) {
            // increment current player
            this.props.actions.nextPlayer()
            // update deck
            this.props.actions.updateDeck(deck)
            // update stacks
            this.props.actions.updateStacks(currentPlayer, card)
            // check circuit

            setTimeout(this.drawCard, preCountdown + countdown.time + drinkBreak)
        } else {
            console.log('GAME OVER')
        }
    }

    showCountdown({ count, time }) {

        setTimeout(doCountdown, this.props.settings.preCountdown)

        function doCountdown() {
            // break the time up into increments
            let counter = 0
            let beat = time / count

            // do an interval that shows an increasing number for each beat
            let interval = setInterval(showBeat, beat)

            // do stuff during the interval until it's time to clear it
            function showBeat() {
                if (counter < count) {
                    console.log('beat ' + (counter + 1))
                    counter++
                } else {
                    console.log('clearing interval')
                    clearInterval(interval)
                }
            }
        }
    }

    updateStacks(drawnCard) {
        this.props.actions.updateStacks(drawnCard, this.props.currentPlayer)
    }

    updateCircuit(drawnCard) {

        // variables
        const currentState = { ...this.props }
        const { players, currentPlayer, stacks, currentCircuit } = currentState

        // if there's nothing in the circuit -- like at the start of the game -- throw whatever's just been drawn into it
        if (currentCircuit.length === 0) {
            this.props.actions.updateCircuit([drawnCard])
        } else {

            function getCardDetails(card) {
                return {
                    suit: card[0],
                    rank: card.slice(1)
                }
            }

            let newCard = getCardDetails(drawnCard)

            let lastInCircuit = (() => {

                let oldCircuit = [ ...currentCircuit ]

                return getCardDetails(oldCircuit.pop())
            })()

            let nextInPlay = (() => {
                
                let nextStack = stacks[currentPlayer === players - 1 ? 0 : currentPlayer + 1]

                if (nextStack && nextStack.length > 0) {
                    return getCardDetails(nextStack.pop())
                } else {
                    return false
                }
            })()

            console.log('Last in Circuit: ' + lastInCircuit.suit, lastInCircuit.rank)

            if (nextInPlay) {
                console.log('Next in Play' + nextInPlay.suit, nextInPlay.rank)
            }

            function multimeter(c1, c2) {
                return c1.suit === c2.suit || c1.rank === c2.rank
            }

            if (multimeter(lastInCircuit, newCard)) {

                // drawnCard connects to the circuit
                this.props.actions.updateCircuit(newCard)

                // if (nextInPlay && multimeter(newCard, nextInPlay)) {
                //     // drawnCard connects to the card the previous player had
                //     // wrap around style
                //     newCircuit.push(nextInPlay)
                // }
            }
        }
    }

    render() {

        if (this.props.stacks) {

            // let stacks = []
            let stacks = <h1>testing!</h1>

            // for (let stack in this.props.stacks) {
            //     stacks.push(<Stack key={Math.random()} cards={this.props.stacks[stack]} />)
            // }

            return (
                <div className="board">
                    {stacks}
                </div>
            )
        } else {
            return <h3>Loading!</h3>
        }

        
    }
}

const mapStateToProps = (state) => {
    return {
        players: state.players,
        deck: state.deck,
        stacks: state.stacks,
        circuit: state.circuit,
        stats: state.stats,
        settings: state.settings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)