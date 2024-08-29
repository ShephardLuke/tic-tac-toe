import { Player } from "./player";

export class Bot extends Player { // Choses random square

    constructor() {
        super("Bot (Easy)");
    }

    getSpacesAvailable(nextSquares: Array<string>) {
        let spacesAvailable = []; // Find out which spaces the CPU can choose
        for (let i = 0; i < nextSquares.length; i++) {
            if (nextSquares[i] === '') {
                spacesAvailable.push(i);
            }
        }

        return spacesAvailable;
    }

    randomSpace(spacesAvailable : number[]) {
        return spacesAvailable[Math.floor(Math.random() * spacesAvailable.length)];
    }

    chooseSquare(nextSquares: Array<string>): number {
        let spacesAvailable = this.getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        return this.randomSpace(spacesAvailable);
    }
}