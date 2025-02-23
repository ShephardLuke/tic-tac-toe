import { Icon } from "../board/ticTacToeShared";

export class Player {

    static NAME = "Player";

    name: string;
    icon: Icon;

    constructor(name: string) {
        this.name = name;
        this.icon = Icon.Unassigned;
    };
    
}