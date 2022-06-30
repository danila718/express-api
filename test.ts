let a: number = 5;
let b: string = '5string';

let c: number = a + Number(b);

let d = true;

let names: string[] = ['sd', 'sdsd'];
let ages: number[] = [5, 10];

let tup: [number, string] = [5, 'string'];

let e: any = 3;
e = 'dada';
e = true;

let anyArr: any[] = ['dada', 33, true];

function greet(name: string): string {
    return 'Hello ' + name;
}

names.map((x: string) => x);


function coord(coord: { lat: number, long?: number }) {

}


console.log(c);
