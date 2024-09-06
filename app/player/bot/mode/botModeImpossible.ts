import { BotMode } from "./botMode";
import { Chooseable } from "../../chooseable";
import { BotChooseableRandom } from "./chooseable/botChooseableRandom";

export class BotModeImpossible implements BotMode {

    chooseBehaviour: Chooseable;

    constructor() {
        this.chooseBehaviour = new BotChooseableRandom
    }
        
    chooseSquare(nextSquares: Array<string>): number {
        return this.chooseBehaviour.chooseSquare(nextSquares);
    }

    randomSpace(spacesAvailable : number[]) {
        return spacesAvailable[Math.floor(Math.random() * spacesAvailable.length)];
    }

    getName(): string {
        return "Impossible (PLACEHOLDER)";
    }
}