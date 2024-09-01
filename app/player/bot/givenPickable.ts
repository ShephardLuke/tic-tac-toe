import { Pickable } from "./pickable";

export interface GivenPickable extends Pickable {
    chooseSquare(square: number): number;
}