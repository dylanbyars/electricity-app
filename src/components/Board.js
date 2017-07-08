import React, { Component } from 'react';
import Deck from 'card-deck'

import { Player } from './Player';
import { Stack } from './Stack';

export default class Board extends Component {
    constructor() {
        // do I really need super here?? I'm not relying on any fed-in props and I feel like that's what you need super for. Or something
        super()
        
        this.state = {
            players: 5,
            currentPlayer: 0,
            cards: ['♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠10', '♠J', '♠Q', '♠K', '♠A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦10', '♦J', '♦Q', '♦K', '♦A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥10', '♥J', '♥Q', '♥K', '♥A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣10', '♣J', '♣Q', '♣K', '♣A'],
            deck: null,
            stacks: null,
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
    }

    componentDidMount() {

        let stacks = {}
        for (let i = 0; i < this.state.players; i++) {
            stacks['player' + i] = {
                    pile: [],
                    drinkCount: 0,
                    drinkTime: 0
                }
            }

        this.setState({
            // make a shuffled deck to play with
            deck: new Deck(this.state.cards).shuffle(),
            // prepare the stacks to hold players' piles
            stacks: stacks
        // start the game!
        }, this.drawCard )
    }

    drawCard() {

        console.log(this.state.stacks)

        let deck = this.state.deck
        let card = deck.draw()
        let suit = card[0]
        let rank = card.slice(1)

        let preCountdown = this.state.settings.preCountdown
        let drinkBreak = this.state.settings.drinkBreak

        
        console.log('Player ' + this.state.currentPlayer)
        console.log(rank, suit)
        console.log(deck.remaining())

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

        let currentPlayer = this.state.currentPlayer
        let nextPlayer = this.state.currentPlayer < this.state.players - 1 ? this.state.currentPlayer + 1 : 0

        let currentStacks = this.state.stacks
        let newStacks = (currentStacks) => currentStacks['player' + currentPlayer].pile.push(card)
        console.log(newStacks(currentStacks))

        if (deck.remaining() > 1) {
            this.setState({
                deck: deck,
                currentPlayer: nextPlayer,
                // stacks: newStacks()
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

    render() {

        return (
            <div className="board">
                {/*{this.state.stacks ? 
                    this.state.stacks.map(stack => <Stack cards={stack.cards} />)
                    :
                    <h3>Loading!</h3>
                }*/}
                <h1>yo</h1>
            </div>
        )
    }
}