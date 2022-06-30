type direction2 = 'left' | 'right';

enum Direction {
    Left = 1,
    Right,
}

function move2(direction: Direction) {
    switch(direction) {
        case Direction.Left:
            return -1;
        case Direction.Right:
            return 1;
        default:
            return 0;
    }
}

const enum Direction2 {
    Up,
    Down
}

let myDirecton = Direction2.Up;
