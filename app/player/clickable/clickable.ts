import { Turnable } from "../turnable/turnable";

export interface Clickable extends Turnable {
    canClick(): boolean;
    onClick({clicked}: {clicked: number}): void;
}