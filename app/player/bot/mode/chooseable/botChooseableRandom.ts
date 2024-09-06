import { getSpacesAvailable } from "@/app/board/ticTacToeShared";

export class BotChooseableRandom implements BotChooseable {
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
}