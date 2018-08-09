/* eslint linebreak-style:0 */
/* eslint no-console:0 */
/* eslint react/jsx-one-expression-per-line:0 */
/* eslint max-len:0 */
/* eslint  lines-between-class-members:0 */
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

    handleCommand = (cmd) => {
        console.log(cmd);
        const { isPlaced } = this.state;
        this.setState({ message: '' });

        const command = cmd.toUpperCase();
        let args = [];
        const placeMatch = Regex.place.exec(command);
        if (placeMatch) {
            args = [parseInt(placeMatch[2], 10),
                    parseInt(placeMatch[3], 10),
                    placeMatch[4]]; // x, y, f
            this.place(...args);
        } else if (Regex.move.exec(command)) {
            isPlaced ? this.move() : this.displayMessage(Messages.notYetPlaced);
        } else if (Regex.left.exec(command)) {
            isPlaced ? this.left() : this.displayMessage(Messages.notYetPlaced);
        } else if (Regex.right.exec(command)) {
            isPlaced ? this.right() : this.displayMessage(Messages.notYetPlaced);
        } else if (Regex.report.exec(command)) {
            this.report();
        } else {
            this.displayMessage(Messages.unknownCommand);
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
        
        if (this.validateMove(tempCoord)) {
            this.displayMessage(Messages.outOfBounds);
        } else {
            this.setState({ coordinates: tempCoord });
        }
    }
    
    left = () => {
        const { orientation } = this.state;
     
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
    
    right = () => {
        const { orientation } = this.state;
      
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
    
    report = () => {
        const { coordinates, orientation } = this.state;
        console.log(`Reporting : ${coordinates[1]}, ${coordinates[0]}, ${orientation}`);
        if (coordinates.length === 0) {
            this.displayMessage('Nothing to report');
        } else {
            this.displayMessage(`${coordinates[1]}, ${coordinates[0]}, ${orientation}`);
        }
    }

    handleChange = (evt) => {
        this.setState({ command: evt.target.value });
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
                                        Please type a command in the field below and hit enter or click go.
                                        Commands can have the following format:<br />
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
