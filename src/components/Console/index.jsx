import React, { Component } from 'react';
import Regex from './regex';

const commands = ['PLACE', 'MOVE', 'RIGHT', 'LEFT', 'REPORT'];
// const orientation = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
// board size = [5,5]

class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // coord: [],
            // orient: '',
            isPlaced: false,
        };
    }

    handleParseCommand = (evt) => {
        const command = evt.target.value.toUpperCase();
        const placeMatch = Regex.place.exec(command);
        if (placeMatch) {
            const args = [placeMatch[1], placeMatch[2], placeMatch[3]];
            this.validateMove(commands[0], args);
        } else if (Regex.move.exec(command)) {
            this.validateMove(commands[1]);
        } else if (Regex.left.exec(command)) {
            this.validateMove(commands[2]);
        } else if (Regex.right.exec(command)) {
            this.validateMove(commands[3]);
        } else if (Regex.report.exec(command)) {
            this.report();
        } else {
            // display error message
        }
    }
    
    place = (...arg) => {
        console.log(...arg);
    }

    move = () => {
        console.log('moving');
    }
    
    left = () => {
        console.log('turning left');
    }
    
    right = () => {
        console.log('turning right');
    }
    
    report = () => {
        console.log('reporting coord and orientation');
    }

    validateMove = (cmd, args) => {
        const { isPlaced } = this.state;
        console.log('command to validate: ', cmd, args, isPlaced);
    }

    render() {
        const { isPlaced } = this.state;
        return (
            <div>
                <input onChange={this.handleParseCommand} />
                is match:
                {isPlaced}
            </div>
        );
    }
}

export default Console;
