import { getSpacesAvailable } from "@/app/board/ticTacToeShared";
import { Player } from "../player";

// Choses a random available square

export class Bot extends Player { 

    static NAME = "Bot (Easy)";

    constructor() {
        super(Bot.NAME);
    }

    randomSpace(spacesAvailable : number[]) {
        return spacesAvailable[Math.floor(Math.random() * spacesAvailable.length)];
    }

    chooseSquare(nextSquares: Array<string>): number {
        let spacesAvailable = getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        return this.randomSpace(spacesAvailable);
    }
}