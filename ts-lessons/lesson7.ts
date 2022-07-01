class Coord {
    message = '1';
    lat: number;
    long: number;

    protected test() {
        if (this.lat > 0) {

        }
    }

    computeDistance(newLat: number, newLong: number) {
        this.test();
        return 0;
    }

    constructor(lat: number, long: number) {
        this.lat = lat;
        this.long = long;
        console.log(this.message);// выведется 1 даже при создании MapLocation
        
    }
}

const point = new Coord(11, 25);

class MapLocation extends Coord {
    private _name: string;
    message = '2';

    get name() {
        return this._name;
    }

    set name(s: string) {
        this._name = s + '_cool!';
    }

    override computeDistance(newLat: number, newLong: number) {
        this.test();
        console.log(this._name);
        return 0;
    }

    constructor(lat: number, long: number, name: string) {
        super(lat, long); // только вначале вызывается!


        this._name = name;
    }
}

const loc = new MapLocation(1, 2, 'test');
// loc._name - error
// loc.test() - error


interface LoggerService {
    log: (s: string) => void;
}

class ConsoleLogger implements LoggerService {
    public log(s: string) {
        console.log(s);
    }

    private error() {
        console.log('error');
    }
    private a = '11';
}

const l = new ConsoleLogger();
l.log('s');


class MyClass<T> {
    static a = '1';
    ad: T;
}

const f = MyClass.a;

const be = new MyClass<string>();

be.ad

// only ts compile time
abstract class Base {
    print(s: string) {
        console.log('s');
    }

    abstract error(s: string): void;
}

// const abscl = new Base() - error!

// its works
class BaseExtended extends Base {
    error(s: string): void {
        console.log(s);
    }
}

class Animal {
    name: string;

}

class Dog {
    name: string;
    tail: boolean;
}

// сужение класса Dog до Animal (неявное, это понимает TS)
const puppy: Animal = new Dog();
