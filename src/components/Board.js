import React, { Component } from 'react';
import Deck from 'card-deck'

import { Stack } from './Stack';

export default class Board extends Component {
    constructor() {
        // do I really need super here?? I'm not relying on any fed-in props and I feel like that's what you need super for. Or something
        super()
        
        this.state = {
            players: 5,
            cards: ['♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠10', '♠J', '♠Q', '♠K', '♠A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦10', '♦J', '♦Q', '♦K', '♦A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥10', '♥J', '♥Q', '♥K', '♥A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣10', '♣J', '♣Q', '♣K', '♣A'],
            deck: null,
            stacks: null
        }

        this.drawCard = this.drawCard.bind(this)
        this.showCountdown = this.showCountdown.bind(this)
    }

    componentDidMount() {
        // make a shuffled deck to play with
        this.setState({
            deck: new Deck(this.state.cards).shuffle()
        }, this.drawCard )

    }

    drawCard() {

        console.log('drawDeck()')

        // 1 unit === 500ms
        // or make these get exponentially faster

        const getCardTime = (rank) => {
            switch(rank) {
                case '2': 
                    return 1000
                case '3':
                    return 1500
                case '4':
                    return 2000
                case '5':
                    return 2500
                case '6':
                    return 3000
                case '7':
                    return 3500
                case '8':
                    return 4000
                case '9':
                    return 4500
                case '10':
                    return 5000
                case 'J':
                    return 5500
                case 'Q':
                    return 6000
                case 'K':
                    return 6500
                case 'A':
                    return 7000
                default:
                    return
            }
        }

        let deck = this.state.deck
        console.log(deck)
        let card = deck.draw()
        let suit = card[0]
        let rank = card.slice(1)

        console.log(rank, suit)
        console.log(getCardTime(rank))

        let countdown = getCardTime(rank)

        // the code in the setTimeout runs AFTER the countdown finishes
        // this is the place to call the next card draw
        // everything else related to make ish happen during a turn needs 
        // to happen before this

        // DO STUFF

        this.showCountdown(countdown)

        this.setState({ deck }, () => {
            console.log('state was set in drawCard()')
            setTimeout(this.drawCard, countdown + 500)
        })
    }

    showCountdown(time) {
        // break the time up into increments
        let beat = 500
        // do an interval that shows an increasing number for each beat
        setInterval(() => {
            console.log('beat')
        }, (time / 500) * 1000)
        // log count to page
    }

    render() {

        return (
            <div className="board">
                {/*<Stack cards={this.state.stacks.player1}/>
                <Stack cards={this.state.stacks.player2}/>
                <Stack cards={this.state.stacks.player3}/>
                <Stack cards={this.state.stacks.player4}/>
                <Stack cards={this.state.stacks.player5}/>*/}
            </div>
        )
    }
}