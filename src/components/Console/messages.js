/* eslint linebreak-style: 0 */
const messages = {
    alreadyPlaced: 'A robot is already on the board, cannot have more than one',
    notYetPlaced: 'A robot needs to be placed on the board first try \'PLACE 0,0,NORTH\'',
    outOfBounds: 'The robot will be out of bounds, cannot move forward',
    unknownCommand: 'Sorry unknown command, try \'PLACE 0,0,NORTH\' or \'MOVE\', \'RIGHT\', \'LEFT\',\'REPORT\'',
    moving: 'moved',
};

export default messages;
