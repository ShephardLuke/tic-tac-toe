import { Pickable } from "./pickable";

export interface HumanPickable extends Pickable {
    chooseSquare(square: number): number;
}