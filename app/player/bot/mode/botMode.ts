import { Mode } from "../../mode";

export interface BotMode extends Mode {
    chooseSquare(nextSqaures: Array<string>): number;
}