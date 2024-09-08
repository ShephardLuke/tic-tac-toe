import { getSpacesAvailable } from "@/app/board/ticTacToeShared";
import { CannotClickTurnable } from "../cannotClickTurnable";

export class RandomTurn implements CannotClickTurnable {
    takeTurn(nextSquares: string[]): number {
        let spacesAvailable = getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        return spacesAvailable[Math.floor(Math.random() * spacesAvailable.length)];
    }
}