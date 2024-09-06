import { Icon } from "../board/ticTacToeShared";
import { Mode } from "./mode";

export interface Playerlike extends Omit<Mode, "chooseBehaviour"> {
    name: string;
    icon: Icon;
    modeBehaviour: Mode;

    setChooseBehaviour(ChooseBehaviour: Mode): void;
    getChooseBehaviour(): Mode;

    setName(name: string): void;
    getName(): string;

    setIcon(icon: Icon): void;
    getIcon(): Icon;
}