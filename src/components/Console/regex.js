const regex = {
    place: /^\s*PLACE\s+([0-4])(?:,\s*)([0-4])(?:,\s*)(NORTH|EAST|WEST|SOUTH)$/g,
    move: /^move\s*$/i,
    left: /^left\s*$/i,
    right: /^right\s*$/i,
    report: /^report\s*$/i,

};

export default regex;
