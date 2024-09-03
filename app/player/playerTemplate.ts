import { Pickable } from "./bot/pickable";
import { Playerlike } from "./playerlike";

export class PlayerTemplate 
{
    name: string;
    behaviours: Pickable[];
    createInstance: (behaviourIndex: Pickable) => Playerlike;

    constructor(behaviours: Pickable[], createInstance: (behaviour: Pickable) => Playerlike) {
        this.behaviours = behaviours;
        this.createInstance = createInstance;
        this.name = "[No Difficulty]";
        let instance = this.createInstance(this.behaviours[0]);
        this.name = instance.getName();
    }

    createPlayer(index: number): Playerlike | null {
        if (index < 0 || index >= this.behaviours.length) {
            return null;
        }

        return this.createInstance(this.behaviours[index]);
    }

    getBehaviours() {
        return this.behaviours;
    }

    getName(): string {
        return this.name;
    }
}