import { getSpacesAvailable } from "@/app/board/ticTacToeShared";
import { Pickable } from "./pickable";

export class CalculatedPickEasy implements Pickable {
        
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
        return "Easy";
    }
}