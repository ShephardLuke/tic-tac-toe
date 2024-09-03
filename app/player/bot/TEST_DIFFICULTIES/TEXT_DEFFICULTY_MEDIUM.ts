import { getSpacesAvailable } from "@/app/board/ticTacToeShared";
import { BotPickable } from "../botPickable";

export class TEST_DIFFICULTY_MEDIUM implements BotPickable {
        
    chooseSquare(nextSquares: Array<string>): number {
        let spacesAvailable = getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        return this.randomSpace(spacesAvailable);
    }

    randomSpace(spacesAvailable : number[]) {
        return spacesAvailable[Math.floor(Math.random() * spacesAvailable.length)];
    }

    getName(): string {
        return "Medium (PLACEHOLDER)";
    }
}