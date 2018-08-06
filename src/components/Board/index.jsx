import React, { Component } from 'react';
import style from './board.scss';

const size = [5,5];

class Board extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.board}>
               Board
            </div>
        );
    }
}

export default Board;
