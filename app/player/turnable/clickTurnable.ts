import { Turnable } from "./turnable";

export interface ClickTurnable extends Turnable {
    takeTurn(clicked: number): number;   
}