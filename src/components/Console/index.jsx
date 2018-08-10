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
        };
    }

    componentDidMount() {
        // this.test();
    }
    
    test = () => {
        this.handleCommand('PLACE 1,2,EAST');
        setTimeout(this.handleCommand.bind(this, 'MOVE'), 0);
        setTimeout(this.handleCommand.bind(this, 'MOVE'), 0);
        setTimeout(this.handleCommand.bind(this, 'LEFT'), 0);
        setTimeout(this.handleCommand.bind(this, 'MOVE'), 0);
        setTimeout(this.handleCommand.bind(this, 'REPORT'), 0);
    }

    handleCommand = () => {
        const { isPlaced, command } = this.state;
        console.log('Command: ', command);
        this.setState({ message: '' });

        const cmd = command.toUpperCase();
        let args = [];
        const placeMatch = Regex.place.exec(cmd);
        // PLACE
        if (placeMatch) {
            const coord = [parseInt(placeMatch[2], 10), parseInt(placeMatch[3], 10)];
            const orientation = placeMatch[4];
            args = [...coord, orientation];
            this.validatePosition(coord) ? this.place(...args) : this.displayMessage(Messages.outOfBounds);
        }
        // MOVE
        else if (Regex.move.exec(cmd)) {
            isPlaced ? this.move() : this.displayMessage(Messages.notYetPlaced);
        }
        // RIGHT - LEFT
        else if (Regex.left.exec(cmd) || Regex.right.exec(cmd)) {
            isPlaced ? this.turn(cmd) : this.displayMessage(Messages.notYetPlaced);
        }
        // REPORT
        else if (Regex.report.exec(cmd)) {
            this.report();
        } else {
            this.displayMessage(Messages.unknownCommand);
        }
    }

    place = (...args) => {
        console.log('A robot has been placed at ', args[0], args[1]);
        this.setState({
            coordinates: [args[0], args[1]],
            orientation: args[2],
            isPlaced: true,
        });
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
            console.log(`${tempCoord[1]}, ${tempCoord[0]}, ${orientation}`);
            this.setState({ coordinates: tempCoord });
        } else {
            console.error('Out of bound');
            this.displayMessage(Messages.outOfBounds);
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
        console.log(`${coordinates[1]}, ${coordinates[0]}, ${tempOrientation}`);
        this.setState({ orientation: tempOrientation });
    }
    
    report = () => {
        const { coordinates, orientation } = this.state;
        if (coordinates.length === 0) {
            this.displayMessage('Nothing to report');
        } else {
            this.displayMessage(`${coordinates[1]}, ${coordinates[0]}, ${orientation}`);
        }
    }

    handleChange = (evt) => {
        console.log(evt.target.value);
        this.setState({ command: evt.target.value });
    }

    displayMessage = (message) => {
        console.log(message);
        this.setState({ message });
    }

    validatePosition = (coordinates) => {
        let isValid = true;
        
        for (const coord of coordinates) {
            if (coord < 0 || coord > 4) {
                isValid = false;
            }
        }
        return isValid;
    }

    handleSubmit = (event) => {
        const { command } = this.state;
        event.preventDefault();
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
                                <Alert color="info">
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
