import { Pickable } from "./pickable";

export interface BotPickable extends Pickable {
    chooseSquare(nextSqaures: Array<string>): number;

    getName(): string;
}