import { Icon } from "../board/ticTacToeShared";
import { HumanPick } from "./bot/humanPick";
import { Humanlike } from "./humanlike";

export class Human implements Humanlike {
    name: string;
    icon: Icon;
    pickBehaviour: HumanPick;

    constructor(pickBehaviour: HumanPick, name: string) {
        this.pickBehaviour = new HumanPick();
        this.name = name;
        this.icon = Icon.Unassigned;

    }

    chooseSquare(square: number): number {
        return this.pickBehaviour.chooseSquare(square);
    }

    setPickBehaviour(pickBehaviour: HumanPick) {
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

    getGameName(): string {
        return this.name;
    }
}