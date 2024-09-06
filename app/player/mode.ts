import { Chooseable } from "./chooseable";

export interface Mode {
    chooseBehaviour: Chooseable;

    chooseSquare(...args: any): any

    getName(): string;
}