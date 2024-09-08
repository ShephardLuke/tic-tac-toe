import { Turnable } from "../turnable/turnable";

export interface Clickable extends Turnable, Nameable {
    canClick(): boolean;
    onClick({clicked}: {clicked: number}): void;
}