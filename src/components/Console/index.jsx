/* eslint max-len:0 */
import React, { Component } from 'react';
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import Regex from './regex';
import Messages from './messages';
import styles from './console.scss';

class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
            orientation: '',
            isPlaced: false,
            message: '',
            command: '',
            boardSize: 5,
        };
    }

    handleCommand = () => {
        // empty message box
        this.setState({ message: '' });
        const { isPlaced, command } = this.state;

        // don't mutate the state
        const cmd = command.slice().toUpperCase();
        const placeMatch = Regex.place.exec(cmd);
        // PLACE
        if (placeMatch) {
            const coord = [parseInt(placeMatch[2], 10), parseInt(placeMatch[3], 10)];
            const orientation = placeMatch[4];
            const args = [...coord, orientation];
            this.validatePosition(coord) ? this.place(...args) : this.displayMessage(Messages.outOfBounds);
        }
        // MOVE
        else if (Regex.move.exec(cmd)) {
            isPlaced ? this.move() : this.displayMessage(Messages.notYetPlaced);
        }
        // TURN
        else if (Regex.left.exec(cmd) || Regex.right.exec(cmd)) {
            isPlaced ? this.turn(cmd) : this.displayMessage(Messages.notYetPlaced);
        }
        // REPORT
        else if (Regex.report.exec(cmd)) {
            this.report();
        }
        // unknown command
        else {
            this.displayMessage(Messages.unknownCommand);
        }
    }

    place = (...args) => {
        this.setState({
            coordinates: [args[0], args[1]],
            orientation: args[2],
            isPlaced: true,
        });
        // console.log(`A robot has been placed at:, ${args[0]}, ${args[1]}, facing ${args[2]}`);
    }

    move = () => {
        const { orientation, coordinates } = this.state;
      
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
        
        if (this.validatePosition(tempCoord)) {
            this.setState({ coordinates: tempCoord });
            // console.log(`${tempCoord[1]}, ${tempCoord[0]}, ${orientation}`);
        } else {
            this.displayMessage(Messages.outOfBounds);
            console.error('Out of bound');
        }
    }
    
    turn = (turn) => {
        const { orientation, coordinates } = this.state;
      
        let tempOrientation;
        switch (orientation) {
            case 'NORTH':
            tempOrientation = turn === 'RIGHT' ? 'EAST' : 'WEST';
            break;
            case 'SOUTH':
            tempOrientation = turn === 'RIGHT' ? 'WEST' : 'EAST';
            break;
            case 'EAST':
            tempOrientation = turn === 'RIGHT' ? 'SOUTH' : 'NORTH';
            break;
            case 'WEST':
            tempOrientation = turn === 'RIGHT' ? 'NORTH' : 'SOUTH';
            break;
            default:
        }
        this.setState({ orientation: tempOrientation });
        // console.log(`${coordinates[1]}, ${coordinates[0]}, ${tempOrientation}`);
    }
    
    report = () => {
        const { coordinates, orientation } = this.state;
        if (coordinates.length === 0) {
            this.displayMessage('Nothing to report');
        } else {
            this.displayMessage(`${coordinates[1]}, ${coordinates[0]}, ${orientation}`);
        }
    }

    handleChange = evt => this.setState({ command: evt.target.value });

    displayMessage = (message) => {
        this.setState({ message });
        // console.log(message);
    }

    validatePosition = (coordinates) => {
        const { boardSize } = this.state;
        let isValid = true;
        
        for (const coord of coordinates) {
            if (coord < 0 || coord > (boardSize - 1)) {
                isValid = false;
            }
        }
        return isValid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { command } = this.state;
        this.handleCommand(command);
    }

    render() {
        const { message, command } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="command">
                            <h1>
                                Toy robot
                            </h1>
                        </div>
                        <div className={styles.report}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="command" className="mr-sm-2">
                                        <p>
                                            Please type a command in the field below and hit enter or click go.
                                            Commands can have the following format:
                                        </p>
                                        PLACE 0,0,NORTH<br />
                                        MOVE<br />
                                        LEFT<br />
                                        RIGHT<br />
                                        REPORT
                                    </Label>
                                    <InputGroup>
                                        <Input
                                                value={command}
                                                onChange={this.handleChange}
                                                type="text"
                                                placeholder="type a command and hit enter / click go" />
                                        <InputGroupAddon addonType="append">
                                            <Button>
                                                GO
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                
                            </Form>
                        </div>
                        { message !== '' ? (
                            <div>
                                <Alert className="reports" color="info">
                                    { message }
                                </Alert>
                            </div>
                        ) : null
                        }
                        <div>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Console;
