import { Name } from "../name";
import { ClickTurnable } from "../turnable/clickTurnable";
import { Clickable } from "./clickable";

export class Click implements Clickable, ClickTurnable {

    nameBehaviour: Nameable;
    turnBehaviour: ClickTurnable;
    clicked: number;

    constructor(turnBehaviour: ClickTurnable) {
        this.nameBehaviour = new Name("Click");
        this.turnBehaviour = turnBehaviour
        this.clicked = -1;
    }
    
    canClick(): boolean {
        return true;
    }

    onClick({ clicked }: { clicked: number; }): void {
        this.clicked = clicked;
    }

    takeTurn(clicked: number): number {
        return this.turnBehaviour.takeTurn(clicked);
    };

    setName(name: string): void {
        this.nameBehaviour.setName(name);
    }

    getName(): string {
        return this.nameBehaviour.getName();
    }
}