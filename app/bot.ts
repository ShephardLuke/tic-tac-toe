import { Player } from "./player";

export class Bot extends Player {
    chooseSquare(nextSquares: Array<string>): number {
        let spacesAvailable = []; // Find out which spaces the CPU can choose
        for (let i = 0; i < nextSquares.length; i++) {
            if (nextSquares[i] === '') {
                spacesAvailable.push(i);
            }
        }

        if (spacesAvailable.length === 0) {
            return -1;
        }

        let index = Math.floor(Math.random() * spacesAvailable.length)

        return spacesAvailable[index];
    }
}