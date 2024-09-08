import { Name } from "../name";
import { CannotClickTurnable } from "./cannotClickTurnable";
import { RandomTurn } from "./cannotClickTurnables/randomTurn";
import { ModularCannotClick } from "./modularCannotClick";

export class EasyBotTurn extends ModularCannotClick {
    constructor() {
        super(new Name("Easy"), new Array<CannotClickTurnable>(new RandomTurn))
    }
}