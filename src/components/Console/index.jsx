/* eslint linebreak-style:0 */
/* eslint no-console:0 */
import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
} from 'reactstrap';
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
        this.test();
    }
    
    test = () => {
        this.handleCommand('PLACE 1,2,EAST');
        setTimeout(this.handleCommand.bind(this, 'MOVE'), 0);
        setTimeout(this.handleCommand.bind(this, 'MOVE'), 0);
        setTimeout(this.handleCommand.bind(this, 'LEFT'), 0);
        setTimeout(this.handleCommand.bind(this, 'MOVE'), 0);
        setTimeout(this.handleCommand.bind(this, 'REPORT'), 0);
    }

    handleCommand = (evt) => {
        console.log(evt);
        const command = evt.toUpperCase();
        let args = [];
        const placeMatch = Regex.place.exec(command);
        if (placeMatch) {
            args = [parseInt(placeMatch[2], 10),
                    parseInt(placeMatch[3], 10),
                    placeMatch[4]]; // x, y, f
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

    place = (...args) => {
        this.setState({
            coordinates: [args[0], args[1]],
            orientation: args[2],
            isPlaced: true,
        });
    }

    move = () => {
        const { isPlaced, orientation, coordinates } = this.state;
        if (!isPlaced) {
            this.displayMessage(Messages.notYetPlaced);
            return;
        }
        // don't mutate the state
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
        }
        
        if (this.validateMove(tempCoord)) {
            this.displayMessage(Messages.outOfBounds);
        } else {
            this.setState({ coordinates: tempCoord });
        }
    }
    
    left = () => {
        const { isPlaced, orientation } = this.state;
        if (!isPlaced) {
            this.displayMessage(Messages.notYetPlaced);
        } else {
            let tempOrientation;
            switch (orientation) {
                case 'NORTH':
                tempOrientation = 'WEST';
                break;
                case 'SOUTH':
                tempOrientation = 'EAST';
                break;
                case 'EAST':
                tempOrientation = 'NORTH';
                break;
                case 'WEST':
                tempOrientation = 'SOUTH';
                break;
                default:
            }
            this.setState({ orientation: tempOrientation });
        }
    }
    
    right = () => {
        const { isPlaced, orientation } = this.state;
        if (!isPlaced) {
            this.displayMessage(Messages.notYetPlaced);
        } else {
            let tempOrientation;
            switch (orientation) {
                case 'NORTH':
                tempOrientation = 'EAST';
                break;
                case 'SOUTH':
                tempOrientation = 'WEST';
                break;
                case 'EAST':
                tempOrientation = 'SOUTH';
                break;
                case 'WEST':
                tempOrientation = 'NORTH';
                break;
                default:
            }
            this.setState({ orientation: tempOrientation });
        }
    }
    
    report = () => {
        const { coordinates, orientation } = this.state;
        console.log('Reorting :', this.state);
        this.forceUpdate();
        this.displayMessage(`${coordinates[0]}, ${coordinates[1]}, ${orientation}`);
    }

    displayMessage = message => this.setState({ message })

    // can only proceed to move if safe.
    validateMove = (coordinates) => {
        // Test? validate that robot can move forward without falling out of the board
        let isOutOfBounds = true;
        /* eslint no-restricted-syntax : 0 */
        for (const coord of coordinates) {
            if (coord < 0 || coord > 4) {
                isOutOfBounds = true;
                break;
            }
            isOutOfBounds = false;
        }
        return isOutOfBounds;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const command = this.refs.command.value;
        console.log('Your command is', command);
    }

    render() {
        const { message } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="command">
                            {/* eslint no-unused-expressions : 0 */}
                            {/* eslint react/no-string-refs : 0 */}
                            <h1>
                                Toy robot
                            </h1>
                        </div>
                        <div className="report">
                            
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="command" className="mr-sm-2">
                                    Command
                                </Label>
                                <Input
                                    onKeyPress={(evt) => { evt.key === 'Enter' ? this.handleCommand(evt.target.value) : null; }}
                                    type="text"
                                    ref="command"
                                    placeholder="type a commamd and hit enter" />
                                </FormGroup>
                                <Button>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                        <div>
                            { message }
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Console;
