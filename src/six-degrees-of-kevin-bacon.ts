// https://www.codingame.com/ide/puzzle/six-degrees-of-kevin-bacon

import { setupInput } from './inputUtils';
const readline: () => string = setupInput(__filename);

/**
 * 6 Degrees of Kevin Bacon!
 **/

const actorName: string = readline();
console.error(actorName)
const n: number = parseInt(readline());
console.error(n)
const movieCasts: Array<Set<string>> = []
for (let i = 0; i < n; i++) {
    const movieCast: string = readline();
    console.error(movieCast);
    const namesString = movieCast.split(':')[1];
    const names = namesString
        .split(',')
        .map(name => name.trim())
    movieCasts.push(new Set(names))
}

function doesOverlap(one: Set<string>, two: Set<string>): boolean {
    let x = one;
    let y = two;
    if (x.size > y.size) {
        x = two;
        y = one;
    }
    for (const name of x) {
        if (y.has(name)) {
            return true;
        }
    }
    return false;
}

let inCircle = new Set<string>([actorName]);
let outCircle = movieCasts
let degrees = 0;
if (actorName != 'Kevin Bacon') {
    loop: while (outCircle.length > 0) {
        degrees++;
        let nextCircle = new Set<string>(inCircle)
        let restCircle = new Array<Set<string>>()
        for (const movieCast of outCircle) {
            if (doesOverlap(inCircle, movieCast)) {
                if (movieCast.has('Kevin Bacon')) {
                    break loop;
                }
                movieCast.forEach(name => nextCircle.add(name))
            }
            else {
                restCircle.push(movieCast)
            }
        }
        inCircle = nextCircle
        outCircle = restCircle
    }
}
console.log(degrees);
