import React, { Component } from 'react';

import { Stack } from './Stack';

export default class Board extends Component {
    constructor() {
        // do I really need super here?? I'm not relying on any fed-in props and I feel like that's what you need super for. Or something
        super()
        
        this.state = {
            players: null,
            deck: null,
            stacks: {
                1: [
                    { card: { num: '2', suit: '<>' }}
                ],
                2: [
                    { card: { num: '4', suit: '<3' }}
                ],
                3: [
                    { card: { num: '7', suit: '&' }}
                ],
                4: [
                    { card: { num: '10', suit: '%' }}
                ],
                5: [
                    { card: { num: 'Q', suit: '<3' }}
                ]
            }
        }
    }

    render() {
        return (
            <div className="board">
                <Stack cards={this.state.stacks[1]}/>
                <Stack cards={this.state.stacks[2]}/>
                <Stack cards={this.state.stacks[3]}/>
                <Stack cards={this.state.stacks[4]}/>
                <Stack cards={this.state.stacks[5]}/>
            </div>
        )
    }
}