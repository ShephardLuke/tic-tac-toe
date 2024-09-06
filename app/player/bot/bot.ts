import { Icon } from "@/app/board/ticTacToeShared";
import { Botlike } from "./botlike";
import { BotMode } from "./mode/botMode";

export class Bot implements Botlike {

    name: string;
    icon: Icon;
    modeBehaviour: BotMode

    constructor(modeBehaviour: BotMode) {
        this.modeBehaviour = modeBehaviour;
        this.name = "Bot";
        this.icon = Icon.Unassigned;
    }

    chooseSquare(nextSqaures: Array<string>): number {
        return this.modeBehaviour.chooseSquare(nextSqaures);
    }

    setChooseBehaviour(modeBehaviour: BotMode) {
        this.modeBehaviour = modeBehaviour;
    }

    getChooseBehaviour(): BotMode {
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