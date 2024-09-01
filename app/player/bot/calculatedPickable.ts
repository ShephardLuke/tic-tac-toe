import { Pickable } from "./pickable";

export interface CalculatedPickable extends Pickable {
    chooseSquare(nextSqaures: Array<string>): number;

    getName(): string;
}