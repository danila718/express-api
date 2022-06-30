let uid: number | string = 5;
uid = 'stad';

function printId(id: number | string) {
    if (typeof id == 'string') {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}

function helloUser(user: string | string[]) {
    if (Array.isArray(user)) {
        console.log(user.join(', ') + ' Hi!');
    } else {
        console.log(user + ' Hi!');
    }
}

console.log(uid);
