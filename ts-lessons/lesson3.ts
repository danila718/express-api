type coord = { lat: number, long: number };

interface ICoord {
    lat: number;
    long: number;
}

type ID = number | string;

function compute(coord: ICoord) {

}

// interface Animal {
//     name: string;
// }

// interface Dog extends Animal {
//     tail: boolean;
// }

// const dog: Dog = {
//     name: 'sdad',
//     tail: true,
// };

// type Animal = {
//     name: string;
// }

// type Dog = Animal & {
//     tail: boolean;
// }

// const dog: Dog = {
//     name: 'sdad',
//     tail: true,
// };

interface Dog {
    name: string;
}

// merging. Not work in types
interface Dog  {
    tail: boolean;
}

const dog: Dog = {
    name: 'name',
    tail: true,
}
