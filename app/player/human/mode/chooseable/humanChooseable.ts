import { Chooseable } from "../../../chooseable";

export interface HumanChooseable extends Chooseable {
    chooseSquare(square: number): number;
}