/* eslint linebreak-style:0 */
import React, { Component } from 'react';
import Regex from './regex';
import Messages from './messages';

class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
            orientation: '',
            isPlaced: false,
            message: '',
        };
    }

    componentDidMount() {
        this.handleCommand('PLACE 0,0,NORTH');
    }

    handleCommand = (evt) => {
        const command = evt.toUpperCase();
        let args = [];
        const placeMatch = Regex.place.exec(command);
        if (placeMatch) {
            args = [parseInt(placeMatch[2]), parseInt(placeMatch[3]), placeMatch[4]]; // x, y, f
            this.place(...args);
        } else if (Regex.move.exec(command)) {
            this.move();
        } else if (Regex.left.exec(command)) {
            this.left();
        } else if (Regex.right.exec(command)) {
            this.right();
        } else if (Regex.report.exec(command)) {
            this.report();
        }
    }
    
    reset = () => {
        this.setState({
            isPlaced: false,
            message: '',
        });
    }

    place = (...args) => {
        this.setState({
            coordinates: [args[0], args[1]],
            orientation: args[2],
            isPlaced: true,
        });
        this.displayMessage(`Robot placed at x: ${args[0]} y:${args[1]} facing:${args[2]}`);
    }

    move = () => {
        const { isPlaced, orientation, coordinates } = this.state;
        if (!isPlaced) {
            this.displayMessage(Messages.notYetPlaced);
            return;
        }
        // don't mutate the current coordinates
        const tempCoord = [...coordinates];

        switch (orientation) {
            case 'NORTH':
            tempCoord[1] += 1;
                break;
            case 'EAST':
            tempCoord[0] += 1;
                break;
            case 'SOUTH':
            tempCoord[1] -= 1;
                break;
            case 'WEST':
            tempCoord[0] -= 1;
                break;
            default:
                console.log('Make robot face a direction first.');
        }
        
        this.validateMove(tempCoord)
        ? this.displayMessage(Messages.outOfBounds)
        : this.setState({ coordinates: tempCoord }, () => { this.report(); });
    }
    
    left = () => {
        const { isPlaced } = this.state;
        console.log('turning left');
        if (!isPlaced) {
            this.displayMessage(Messages.notYetPlaced);
        }
    }
    
    right = () => {
        const { isPlaced } = this.state;
        console.log('turning right');
        if (!isPlaced) {
            this.displayMessage(Messages.notYetPlaced);
        }
    }
    
    report = () => {
        const { coordinates, orientation } = this.state;
        this.displayMessage(`Robot placed at x: ${coordinates[0]} y:${coordinates[1]} facing:${orientation}`);
    }

    displayMessage = message => this.setState({ message })

    // can only proceed to move if safe.
    validateMove = (coordinates) => {
        // Test? validate that robot can move forward without falling out of the board
        let isOutOfBounds = true;
        for (let coord of coordinates) {
            if (coord < 0 || coord > 4) {
                isOutOfBounds = true;
                break;
            }
            isOutOfBounds = false;
        }
        return isOutOfBounds;
    }

    render() {
        const { message } = this.state;
        return (
            <div>
                <input onChange={(evt) => { this.handleCommand(evt.target.value); }} />
                { message }
            </div>
        );
    }
}

export default Console;
