import { Mode } from "../../mode";

export interface HumanMode extends Mode {
    chooseSquare(square: number): number;
}