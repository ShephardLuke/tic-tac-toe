import { Name } from "../name";
import { ClickTurnable } from "../turnable/clickTurnable";
import { Clickable } from "./clickable";

export abstract class Click implements ClickTurnable, Clickable {

    nameBehaviour: Nameable;
    clicked: number;

    constructor(nameBehaviour: Nameable) {
        this.nameBehaviour = nameBehaviour;
        this.clicked = -1;
    }
    
    canClick(): boolean {
        return true;
    }

    onClick({ clicked }: { clicked: number; }): void {
        this.clicked = clicked;
    }

    abstract takeTurn(clicked: number): number;

    setName(name: string): void {
        this.nameBehaviour.setName(name);
    }

    getName(): string {
        return this.nameBehaviour.getName();
    }
}