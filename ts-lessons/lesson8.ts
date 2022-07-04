let a8 = 'Привет!';

if (typeof a8 == 'string') {
}

// зависимые типы
let b8: typeof a8;

type Coord8 = {
    lat: number;
    long: number;
}

// может принимать значение только ключей
type P8 = keyof Coord8;

let a81: P8 = 'long';


function log(a: string | null): void {
    a?.toLowerCase();
    if (a === null) {
    } else {
        a.toLowerCase();
    }
}

function log2(a: string | null): void {
    // убеждены что будет что-то
    a!.toLowerCase();
}


const a82: bigint = BigInt(100);
const b81: symbol = Symbol('dadad');
