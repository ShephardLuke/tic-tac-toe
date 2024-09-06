import { Chooseable } from "../../chooseable";
import { HumanChooseableGiven } from "./chooseable/humanChooseableGiven";
import { HumanMode } from "./humanMode";

export class HumanModeGiven implements HumanMode {

    chooseBehaviour: Chooseable;

    constructor() {
        this.chooseBehaviour = new HumanChooseableGiven;
    }

    chooseSquare(square: number): number {
        return square;
    }

    getName(): string {
        return "Given";
    }
}