// https://www.codingame.com/training/easy/island-escape

import { setupInput } from './inputUtils';
const readline: () => string = setupInput(__filename);

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N: number = parseInt(readline());
let map: number[][] = []
let breadcrumb: boolean[][] = Array.from({length:N}, () => Array(N).fill(false))

for (let i = 0; i < N; i++) {
    var inputs: string[] = readline().split(' ');
    map[i] = []
    for (let j = 0; j < N; j++) {
        const elevation: number = parseInt(inputs[j]);
        map[i][j] = elevation
    }
}

console.error(map)
let x = Math.floor(N/2)
let y = Math.floor(N/2)
const deltaX = [1, 0, -1, 0]
const deltaY = [0, 1, 0, -1]

let found = visit(x, y)

function visit(x: number, y: number): boolean {
    console.error(`visit (${x}, ${y})`)
    if (map[x][y] == 0) return true
    breadcrumb[x][y] = true
    for (let i = 0; i < 4; i++) {
        let x1 = x + deltaX[i]
        let y1 = y + deltaY[i]
        if (Math.abs(map[x1][y1] - map[x][y]) >1) {
            continue
        }
        if (breadcrumb[x1][y1]) {
            continue
        }
        if (visit(x1, y1)) {
            return true
        }
    }
    return false
}

console.log(found ? "yes" : "no");
