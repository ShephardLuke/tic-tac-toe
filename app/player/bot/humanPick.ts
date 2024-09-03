import { HumanPickable } from "./humanPickable";

export class HumanPick implements HumanPickable {
    chooseSquare(square: number): number {
        return square;
    }
}