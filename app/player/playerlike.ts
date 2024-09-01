import { Icon } from "../board/ticTacToeShared";
import { Pickable } from "./bot/pickable";

export interface Playerlike extends Pickable {
    name: string;
    icon: Icon;
    pickBehaviour: Pickable;

    setPickBehaviour(pickBehaviour: Pickable): void;
    getPickBehaviour(): Pickable;

    setName(name: string): void;
    getName(): string;

    setIcon(icon: Icon): void;
    getIcon(): Icon;
}