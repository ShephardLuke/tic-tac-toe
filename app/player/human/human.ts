import { Icon } from "../../board/ticTacToeShared";
import { Humanlike } from "./humanlike";
import { HumanMode } from "./mode/humanMode";

export class Human implements Humanlike {
    name: string;
    icon: Icon;
    modeBehaviour: HumanMode

    constructor(modeBehaviour: HumanMode, name: string) {
        this.modeBehaviour = modeBehaviour;
        this.name = name;
        this.icon = Icon.Unassigned;

    }

    chooseSquare(square: number): number {
        return this.modeBehaviour.chooseSquare(square);
    }

    setChooseBehaviour(modeBehaviour: HumanMode) {
        this.modeBehaviour = modeBehaviour;
    }

    getChooseBehaviour() {
        return this.modeBehaviour;
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