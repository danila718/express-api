// function log(obj: string | number): string | number {
//     console.log(obj);
//     return obj;
// }

interface HasLength {
    length: number;
}

function log<T extends HasLength, K>(obj: T, arr: K[]): K[] {
    // arr.length - exist
    // obj.length - exist if T exdents HasLength
    console.log(obj);
    return arr;
}

log<string, number>('sadad', [12]);
log<HasLength, number>(['s'], [5]);

interface IUser {
    name: string;
    age?: number;
    bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T): boolean {
    return true;
}

