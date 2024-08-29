import { Icon } from "./ticTacToeShared";

export class Player {
    name: string;
    icon: Icon;

    constructor(name: string) {
        this.name = name;
        this.icon = Icon.Unassigned;
    };
    
}