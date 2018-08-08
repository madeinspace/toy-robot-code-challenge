# Toy robot code challenge

## Introduction

This application is a simulation of a toy robot moving on a 5x5 square table top.

The console accepts commands of this format:

PLACE 0,0,NORTH
MOVE
RIGHT
LEFT
REPORT

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
MOVE will move the toy robot one unit forward in the direction it is currently facing.
LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
REPORT will announce the X,Y and orientation of the robot.

### Installation

1- Clone the app repo

`git clone https://github.com/madeinspace/toy-robot-code-challenge.git`

2- `yarn` or `npm install` to install npm packages

3- start dev server using `yarn start` or `npm start`.

4- build and bundling resources for production `yarn build`.

5- run the test suites using `yarn test`.


#### Tech stack

1- React

2- Webpack 4

3- SCSS / CSS modules

4- ES6

