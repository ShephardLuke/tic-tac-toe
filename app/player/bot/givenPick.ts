import { GivenPickable } from "./givenPickable";

export class GivenPick implements GivenPickable {
    chooseSquare(square: number): number {
        return square;
    }
}