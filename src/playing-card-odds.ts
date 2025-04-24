// https://www.codingame.com/training/easy/playing-card-odds

import { setupInput } from './inputUtils';
const readline: () => string = setupInput(__filename);

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
const allRanks = new Set(['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'])
const allSuites = ['C', 'D', 'H', 'S'];

let cards = new Map<String, Set<String>>()
for (let suite of allSuites) {
    cards.set(`${suite}`, new Set(allRanks))
}

function* cardRange(classification: string): Generator<[String, String]> {
    let ranks: Set<String> = new Set();
    let suites: Set<String> = new Set();
    for (let character of classification) {
        if (allRanks.has(character)) {
            ranks.add(character)
        }
        else {
            suites.add(character)
        }
    }
    if (ranks.size == 0) {
        ranks = allRanks;
    }
    if (suites.size == 0) {
        suites = new Set(allSuites);
    }
    console.error(`Ranks: ${Array.from(ranks)}`)
    console.error(`Suites: ${Array.from(suites)}`)

    for(let rank of ranks) {
        for (let suite of suites) {
            yield [suite, rank]
        }
    }
}

var inputs: string[] = readline().split(' ');
const R: number = parseInt(inputs[0]);
const S: number = parseInt(inputs[1]);
console.error(`${R} ${S}`)
for (let i = 0; i < R; i++) {
    const removed: string = readline();
    console.error(`Removing ${removed}`)
    for (let [suite, rank] of cardRange(removed)) {
        console.error(`remove ${suite}-${rank}`)
        let ranksInSuite = cards.get(suite)
        if (ranksInSuite) {
            ranksInSuite.delete(rank)
        }
        else {
            console.error(`Suite ${suite} not found`)
        }
    }
}
let numberOfCards = Array.from(cards.values()).reduce((sum, current) => sum + current.size, 0)
console.error(numberOfCards)
for (let i = 0; i < S; i++) {
    const sought: string = readline();
    console.error(`Seeking ${sought}`)
    for (let [suite, rank] of cardRange(sought)) {
        console.error(`seek ${suite}-${rank}`)
        cards.get(suite)?.delete(rank)
    }
}
let restNumberOfCards = Array.from(cards.values()).reduce((sum, current) => sum + current.size, 0)
console.error(restNumberOfCards)
// Write an answer using console.log()
// To debug: console.error('Debug messages...');
let percentage = Math.round((numberOfCards - restNumberOfCards) / numberOfCards * 100)
console.log(`${percentage}%`)
