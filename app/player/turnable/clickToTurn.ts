import { Click } from "../clickable/click";
import { Name } from "../name";
import { ClickTurnable } from "./clickTurnable";

export class ClickToTurn extends Click {

    constructor() {
        super(new Name("Click to use turn"));
    }

    takeTurn(clicked: number): number {
        return clicked;
    }
}