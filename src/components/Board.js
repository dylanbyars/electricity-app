import React, { Component } from 'react';
import Deck from 'card-deck'

// import { Player } from './Player';
import { Stack } from './Stack';

export default class Board extends Component {
    constructor() {
        // do I really need super here?? I'm not relying on any fed-in props and I feel like that's what you need super for. Or something
        super()

        this.state = {
            players: 5,
            currentPlayer: 0,
            deck: null,
            stacks: {},
            circuit: [],
            // store stats about the round like total count, longest chain, etc
            stats: null,
            settings: {
                // time between when a card's drawn and the countdown starts
                preCountdown: 2500,
                // time between card draws after the previous countdown
                drinkBreak: 2000
            }
        }

        this.drawCard = this.drawCard.bind(this)
        this.showCountdown = this.showCountdown.bind(this)
        this.updateStacks = this.updateStacks.bind(this)
        this.updateCircuit = this.updateCircuit.bind(this)
    }

    componentDidMount() {

        const CARDS = ['♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠10', '♠J', '♠Q', '♠K', '♠A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦10', '♦J', '♦Q', '♦K', '♦A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥10', '♥J', '♥Q', '♥K', '♥A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣10', '♣J', '♣Q', '♣K', '♣A']

        

        // for (let i = 0; i < this.state.players; i++) {
        //     stacks[i] = []
        // }

        this.setState({
            // make a shuffled deck to play with
            deck: new Deck(CARDS).shuffle(),
            // prepare the stacks to hold players' cards
            stacks: (() => {
                let stacks = {}
                for (let i = 0; i < this.state.players; i++) {
                    stacks[i] = []
                }
                return stacks
            })()
        // start the game!
        }, this.drawCard )
    }

    drawCard() {

        let deck = this.state.deck
        // draws a card from the deck object stored in deck
        let card = deck.draw()
        let suit = card[0]
        let rank = card.slice(1)

        const currentState = { ...this.state }
        let { players, currentPlayer, stacks, circuit, settings } = currentState

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

        let nextPlayer = currentPlayer < players - 1 ? 
                currentPlayer + 1 : 0

        if (deck.remaining() > 0) {
            this.setState({
                deck: deck,
                currentPlayer: nextPlayer,
                stacks: this.updateStacks(card),
                // check the currently drawn card against the approved circuit before deciding if the current circuit should be added to or cleared and restarted
                circuit: this.updateCircuit(card)
            }, () => {
                setTimeout(this.drawCard, preCountdown + countdown.time + drinkBreak)
            })
        } else {
            console.log('GAME OVER')
        }
        
    }

    showCountdown({ count, time }) {

        setTimeout(doCountdown, this.state.settings.preCountdown)

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
        let newStacks = { ...this.state.stacks }
        newStacks[this.state.currentPlayer].push(drawnCard)
        return newStacks
    }

    updateCircuit(drawnCard) {

        // if there's nothing in the circuit -- like at the start of the game -- throw whatever's just been drawn into it
        if (this.state.circuit.length === 0) {
            return [drawnCard]
        } else {

            // variables
            const currentState = { ...this.state }

            const { players, currentPlayer, stacks, circuit } = currentState

            function getCardDetails(card) {
                return {
                    suit: card[0],
                    rank: card.slice(1)
                }
            }

            let newCard = getCardDetails(drawnCard)

            let lastInCircuit = (() => {

                let oldCircuit = circuit

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
                let newCircuit = [ ...circuit ]
                newCircuit.push(drawnCard)

                if (nextInPlay && multimeter(newCard, nextInPlay)) {
                    // drawnCard connects to the card the previous player had
                    // wrap around style
                    newCircuit.push(nextInPlay)
                }

                console.log('New Circuit: ' + newCircuit)
                return newCircuit
            }

            return [drawnCard]
        }
    }

    render() {

        if (this.state.stacks) {

            let stacks = []

            for (let stack in this.state.stacks) {
                stacks.push(<Stack key={Math.random()} cards={this.state.stacks[stack]} />)
            }

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