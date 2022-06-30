const a4 = 'sda';

let b4: 'hi' = 'hi';

type direction = 'left' | 'right';

function moveDog(direction: direction): -1 | 0 | 1 {
    switch(direction) {
        case 'left':
            return -1;
        case 'right':
            return 1;
        default:
            return 0;
    }
}

interface IConnection {
    host: string;
    port: number;
}

function connect(connection: IConnection | 'default') {

}


const connection2 = {
    host: 'localhost',
    protocol: 'https' as 'https',
}

function connect2(host: string, protocol: 'http' | 'https') {

}

connect2(connection2.host, connection2.protocol);

let a3: any = '1';
let c3 = a3 as number;
// let c3 = <number>a3;

console.log(c3);









