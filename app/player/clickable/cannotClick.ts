import { Name } from "../name";
import { CannotClickTurnable } from "../turnable/cannotClickTurnable";
import { Clickable } from "./clickable";

export abstract class CannotClick implements CannotClickTurnable, Clickable {

    nameBehaviour: Nameable;

    constructor(nameBehaviour: Nameable) {
        this.nameBehaviour = nameBehaviour;
    }

    canClick(): boolean {
        return false;
    }

    onClick({ clicked }: { clicked: number; }) {
    }

    abstract takeTurn(nextSquares: string[]): number;

    setName(name: string): void {
        this.nameBehaviour.setName(name);
    }

    getName(): string {
        return this.nameBehaviour.getName();
    }
}