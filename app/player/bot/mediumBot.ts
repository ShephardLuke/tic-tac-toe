import { Bot } from "./bot";
import { getSpacesAvailable, getWinPositions, Icon } from "../../board/ticTacToeShared";

// Hard bot, but can make mistakes, more likely to miss wins/blocks the more futher in the game it gets

export class MediumBot extends Bot {

    static NAME = "Bot (Medium)";

    constructor() {
        super();
        this.name = MediumBot.NAME;
    }

    chooseSquare(nextSquares: Array<string>): number {
        let spacesAvailable = getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        let chosenSpace: number;

        let seesWin = Math.floor(Math.random() * spacesAvailable.length) > 0;

        let thirdSpace: number;

        if (seesWin) {
            let thirdSpace = this.getThirdSpace(this.icon, nextSquares, spacesAvailable); // 1. Win if 2/3

            if (thirdSpace !== -1) { 
                return thirdSpace;
            }
        }

        let seesBlock = Math.floor(Math.random() * spacesAvailable.length) > 0;
        
        if (seesBlock) {
            thirdSpace = this.getThirdSpace(this.getOtherIcon(this.icon), nextSquares, spacesAvailable); // 2. Stop opponent from winning 

            if (thirdSpace !== -1) {
                return thirdSpace;
            }
    
        };

        chosenSpace = this.getRandomChosenAvailableSpaces([4], spacesAvailable) // 3. Center

        if (chosenSpace !== -1) {
            return chosenSpace;
        }
        
        return this.getRandomChosenAvailableSpaces(spacesAvailable, spacesAvailable) // 4. Any available
    }

    getThirdSpace(icon: Icon, nextSquares: string[], spacesAvailable: number[]): number { // Returns the winning move when 2 of 3 are placed
        let winPositions = getWinPositions();

        for (let positions of winPositions) {
            let spacesLeft = positions.slice();

            for (let i = 0; i < positions.length; i++) {
                if (spacesLeft.includes(positions[i]) && nextSquares[positions[i]] === Icon[icon]) {
                    spacesLeft.splice(spacesLeft.indexOf(positions[i]), 1);
                }
            }

            if (spacesLeft.length === 1 && this.isPossibleMove(spacesLeft[0], spacesAvailable)) {
                return spacesLeft[0];
            }
        }

        return -1;
    }

    getRandomChosenAvailableSpaces(chosenSpaces: number[], spacesAvailable: number[]): number { // Returns a random move out of a group of possible moves
        let chosenAvailableSpaces = []

        for (let i = 0; i < chosenSpaces.length; i++) {
            if (spacesAvailable.includes(chosenSpaces[i])) {
                chosenAvailableSpaces.push(chosenSpaces[i]);
            }
        }

        if (chosenAvailableSpaces.length === 0) { // Should never happen if algorithm is implemented right
            return -1;
        }
        
        return this.randomSpace(chosenAvailableSpaces);
    }

    getOtherIcon(icon: Icon) { // Returns opponent's icon
        if (icon === Icon.X) {
            return Icon.O;
        }
        return Icon.X
    }
    
    isPossibleMove(chosenSpace: number, spacesAvailable: number[]): boolean {
        return spacesAvailable.includes(chosenSpace);
    }

}