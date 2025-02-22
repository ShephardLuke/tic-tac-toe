import { Player } from "@/app/player/player";

export class DifficultyTemplate {
    name: string;
    clone: () => Player;

    constructor(name : string, clone : () => Player) {
        this.name = name;
        this.clone = clone;
    }
}