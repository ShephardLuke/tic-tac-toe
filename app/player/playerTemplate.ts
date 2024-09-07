import { Click } from "./clickable/click";
import { Clickable } from "./clickable/clickable";
import { Player } from "./player";

export class PlayerTemplate implements Nameable {
    nameBehaviour: Nameable;
    clickBehaviours: Clickable[];

    constructor(nameBehaviour: Nameable, clickBehaviours: Clickable[]) {
        this.nameBehaviour = nameBehaviour;
        this.clickBehaviours = clickBehaviours;
    }

    createPlayer(index: number): Player {
        return new Player(this.nameBehaviour, this.clickBehaviours[index]);
    }

    getClickBehaviours() {
        return this.clickBehaviours;
    }

    setName(name: string): void {
        this.nameBehaviour.setName(name);
    }

    getName(): string {
        return this.nameBehaviour.getName();
    }
}