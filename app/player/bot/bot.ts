import { Icon } from "@/app/board/ticTacToeShared";
import { Botlike } from "./botlike";
import { BotPickable } from "./botPickable";

export class Bot implements Botlike {

    name: string;
    icon: Icon;
    pickBehaviour: BotPickable

    constructor(pickBehaviour: BotPickable) {
        this.pickBehaviour = pickBehaviour;
        console.log(this.pickBehaviour);
        this.name = "Bot";
        this.icon = Icon.Unassigned;
    }

    chooseSquare(nextSqaures: Array<string>): number {
        return this.pickBehaviour.chooseSquare(nextSqaures);
    }

    setPickBehaviour(pickBehaviour: BotPickable) {
        this.pickBehaviour = pickBehaviour;
    }

    getPickBehaviour(): BotPickable {
        return this.pickBehaviour;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setIcon(icon: Icon): void {
        this.icon = icon;
    }

    getIcon(): Icon {
        return this.icon;
    }

    
}