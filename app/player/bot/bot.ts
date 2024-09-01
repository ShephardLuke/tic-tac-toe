import { Icon } from "@/app/board/ticTacToeShared";
import { Botlike } from "./botlike";
import { CalculatedPickable } from "./calculatedPickable";

export class Bot implements Botlike {

    name: string;
    icon: Icon;
    pickBehaviour: CalculatedPickable

    constructor(pickBehaviour: CalculatedPickable) {
        this.pickBehaviour = pickBehaviour;
        this.name = "Bot (" + this.pickBehaviour.getName() + ")";
        this.icon = Icon.Unassigned;
    }

    chooseSquare(nextSqaures: Array<string>): number {
        return this.pickBehaviour.chooseSquare(nextSqaures);
    }

    setPickBehaviour(pickBehaviour: CalculatedPickable) {
        this.pickBehaviour = pickBehaviour;
    }

    getPickBehaviour(): CalculatedPickable {
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