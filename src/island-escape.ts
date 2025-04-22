import * as fs from 'fs';
import * as path from 'path';

// Dynamically generate input file name based on this file's name
const currentFileName = path.basename(__filename);
const baseFileName = currentFileName.replace('.ts', '');
const inputFileName = `${baseFileName}.txt`;

// Read input from the dynamically named file
const input: string = fs.readFileSync(inputFileName, 'utf8');
const lines: string[] = input.trim().split('\n');

let lineIndex: number = 0;
const N: number = parseInt(lines[lineIndex++]);
let map: number[][] = [];
let breadcrumb: boolean[][] = Array.from({length: N}, () => Array(N).fill(false));

// Parse the map
for (let i = 0; i < N; i++) {
    const inputs: string[] = lines[lineIndex++].split(' ');
    map[i] = [];
    for (let j = 0; j < N; j++) {
        map[i][j] = parseInt(inputs[j]);
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
