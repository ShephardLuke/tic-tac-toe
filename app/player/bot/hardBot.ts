import { Bot } from "./bot";
import { MediumBot } from "./mediumBot";
import { getSpacesAvailable, getWinPositions, Icon } from "../../board/ticTacToeShared";

// Impossible bot but without the forks or blocking forks and more random placements

export class HardBot extends MediumBot {

    static NAME = "Bot (Hard)";

    constructor() {
        super();
        this.name = HardBot.NAME;
    }

    chooseSquare(nextSquares: Array<string>): number {
        let spacesAvailable = getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        let chosenSpace: number;

        let thirdSpace = this.getThirdSpace(this.icon, nextSquares, spacesAvailable); // 1. Win if 2/3

        if (thirdSpace !== -1) { 
            return thirdSpace;
        }
        
        thirdSpace = this.getThirdSpace(this.getOtherIcon(this.icon), nextSquares, spacesAvailable); // 2. Stop opponent from winning 

        if (thirdSpace !== -1) {
            return thirdSpace;
        }

        chosenSpace = this.getRandomChosenAvailableSpaces([4], spacesAvailable) // 3. Center

        if (chosenSpace !== -1) {
            return chosenSpace;
        }
        
        return this.getRandomChosenAvailableSpaces(spacesAvailable, spacesAvailable) // 4. Any available
    }

}