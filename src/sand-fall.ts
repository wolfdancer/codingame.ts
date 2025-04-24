// https://www.codingame.com/ide/puzzle/sand-fall
import { setupInput } from './inputUtils';
const readline = setupInput(__filename);
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const dimensionsInput: string[] = readline().split(' ');
const W: number = parseInt(dimensionsInput[0]);
const H: number = parseInt(dimensionsInput[1]);
const N: number = parseInt(readline());
const box: string[][] = Array(H).fill(null).map(() => Array(W).fill(' '))
for (let i = 0; i < N; i++) {
    const inputs: string[] = readline().split(' ');
    const S: string = inputs[0];
    const P: number = parseInt(inputs[1]);
    const firstMove = S.toLowerCase() == S ? 1 : -1;
    let row = -1;
    let column = P;
    while (++row < H) {
        if (box[row][column] == ' ') {
            continue;
        }
        column += firstMove;
        if (column >= 0 && column < W && box[row][column] == ' ') {
            continue;
        }
        column -= 2 * firstMove;
        if (column >= 0 && column < W && box[row][column] == ' ') {
            continue
        }
        column += firstMove;
        break;
    }
    box[row-1][column] = S;
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');
for (let row of box) {
    console.log(`|${row.join('')}|`)
}
console.log(`+${'-'.repeat(W)}+`)

