import { Name } from "../name";
import { CannotClickTurnable } from "../turnable/cannotClickTurnable";
import { Clickable } from "./clickable";

export class CannotClick implements Clickable, CannotClickTurnable {

    nameBehaviour: Nameable;
    turnBehaviour: CannotClickTurnable;
    selected: number;

    constructor(turnBehaviour: CannotClickTurnable) {
        this.nameBehaviour = new Name("Cannot click");
        this.turnBehaviour = turnBehaviour;
        this.selected = -1;
    }

    canClick(): boolean {
        return false;
    }

    onClick({ clicked }: { clicked: number; }) {
    }

    takeTurn(): number {
        return this.turnBehaviour.takeTurn();
    }

    setName(name: string): void {
        this.nameBehaviour.setName(name);
    }

    getName(): string {
        return this.nameBehaviour.getName();
    }
}