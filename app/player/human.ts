import { Icon } from "../board/ticTacToeShared";
import { GivenPick } from "./bot/givenPick";
import { GivenPickable } from "./bot/givenPickable";
import { Humanlike } from "./humanlike";

export class Human implements Humanlike {
    name: string;
    icon: Icon;
    pickBehaviour: GivenPickable;

    constructor(name: string) {
        this.name = name;
        this.icon = Icon.Unassigned;
        this.pickBehaviour = new GivenPick();
    }

    chooseSquare(square: number): number {
        return this.pickBehaviour.chooseSquare(square);
    }

    setPickBehaviour(pickBehaviour: GivenPickable) {
        this.pickBehaviour = pickBehaviour;
    }

    getPickBehaviour() {
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