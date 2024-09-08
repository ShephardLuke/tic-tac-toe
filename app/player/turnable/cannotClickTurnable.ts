import { Turnable } from "./turnable";

export interface CannotClickTurnable extends Turnable {
    takeTurn(nextSquares: string[]): number;
}