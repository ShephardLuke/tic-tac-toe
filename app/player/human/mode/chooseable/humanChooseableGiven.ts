import { HumanChooseable } from "./humanChooseable";

export class HumanChooseableGiven implements HumanChooseable {
    chooseSquare(square: number): number {
        return square;
    }
}