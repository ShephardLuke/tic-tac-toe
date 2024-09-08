import { Clickable } from "./clickable/clickable";
import { Turnable } from "./turnable/turnable";

export class Player implements Clickable {
    nameBehaviour: Nameable;
    clickBehaviour: Clickable;

    constructor(namebehaviour: Nameable, clickBehaviour: Clickable) {
        this.nameBehaviour = namebehaviour;
        this.clickBehaviour = clickBehaviour;
    }

    canClick(): boolean {
        console.log(this);
        return this.clickBehaviour.canClick();
    }

    onClick({ clicked }: { clicked: number; }): void {
        return this.clickBehaviour.onClick({ clicked });
    }

    takeTurn(...args: any): number {
        return this.clickBehaviour.takeTurn(...args);
    }

    setName(name: string): void {
        this.nameBehaviour.setName(name);
    }

    getName(): string {
        return this.nameBehaviour.getName();
    }
}