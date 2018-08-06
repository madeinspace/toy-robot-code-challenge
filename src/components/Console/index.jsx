import React, { Component } from 'react';
import Regex from './regex';

// const commands = ['PLACE', 'MOVE', 'RIGHT', 'LEFT', 'REPORT'];
// const orientation = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // coord: [],
            // orient: '',
        };
    }

    handleParseCommand = (evt) => {
        const command = evt.target.value.toUpperCase();
        const placeMatch = Regex.place.exec(command);
        if (placeMatch) {
            this.place(placeMatch[1], placeMatch[2], placeMatch[3]);
        } else if (Regex.move.exec(command)) {
            this.move();
        } else if (Regex.left.exec(command)) {
            this.left();
        } else if (Regex.right.exec(command)) {
            this.right();
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

    render() {
        const { isMatch } = this.state;
        return (
            <div>
                <input onChange={this.handleParseCommand} />
                is match:
                {isMatch}
            </div>
        );
    }
}

export default Console;
