import { Player } from "./player";

export class Human extends Player {

    static NAME = "Human";

    constructor() {
        super(Human.NAME);
    }
}