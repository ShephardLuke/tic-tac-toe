import { Name } from "../name";
import { ClickTurnable } from "./clickTurnable";

export class ClickToTurn implements ClickTurnable {

    nameBehaviour: Nameable

    constructor() {
        this.nameBehaviour = new Name("Click to use turn");
    }

    takeTurn(clicked: number): number {
        return clicked;
    }

    setName(name: string): void {
        this.nameBehaviour.setName(name);
    }
    

    getName(): string {
        return this.nameBehaviour.getName();
    }
}