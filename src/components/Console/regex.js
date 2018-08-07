/* eslint linebreak-style: 0 */
const regex = {
    place: /^\s*(PLACE)\s+([0-4])(?:,\s*)([0-4])(?:,\s*)(NORTH|EAST|SOUTH|WEST)$/g,
    move: /^move\s*$/i,
    left: /^left\s*$/i,
    right: /^right\s*$/i,
    report: /^report\s*$/i,
};

export default regex;
