import { Mode } from "./mode";
import { Playerlike } from "./playerlike";

export class PlayerTemplate 
{
    name: string;
    modes: Mode[];
    createInstance: (modeIndex: Mode) => Playerlike;

    constructor(modes: Mode[], createInstance: (mode: Mode) => Playerlike) {
        this.modes = modes;
        this.createInstance = createInstance;
        this.name = "[No Difficulty]";
        let instance = this.createInstance(this.modes[0]);
        this.name = instance.getName();
    }

    createPlayer(index: number): Playerlike | null {
        if (index < 0 || index >= this.modes.length) {
            return null;
        }

        return this.createInstance(this.modes[index]);
    }

    getModes() {
        return this.modes;
    }

    getName(): string {
        return this.name;
    }
}