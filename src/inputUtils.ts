import path from "path";
import fs from "fs";

/**
 * Sets up input reading from a text file with the same base name as the calling script
 * @param callerFilePath The __filename of the calling script
 * @returns An object with utils for reading input
 */
export function setupInput(callerFilePath: string): () => string {
    const currentFileName = path.basename(callerFilePath);
    const baseFileName = currentFileName.replace('.ts', '');
    const inputFileName = `${baseFileName}.txt`;

    // Read input from the dynamically named file
    const input: string = fs.readFileSync(inputFileName, 'utf8');
    const lines: string[] = input.trim().split('\n');
    let currentLineIndex: number = 0;

    function readline(): string {
        return lines[currentLineIndex++];
    }

    return readline
}