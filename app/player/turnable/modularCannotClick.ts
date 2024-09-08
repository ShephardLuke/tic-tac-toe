import { CannotClick } from "../clickable/cannotClick";
import { CannotClickTurnable } from "./cannotClickTurnable";

export abstract class ModularCannotClick extends CannotClick {

    modules: CannotClickTurnable[];

    constructor(nameBehaviour: Nameable, modules: CannotClickTurnable[]) {
        super(nameBehaviour);
        this.modules = modules;
    }

    takeTurn(nextSquares: string[]): number {
        for (let module of this.modules) {
            let result = module.takeTurn(nextSquares);
            if (result !== -1) {
                return result;
            }
        }

        return -1;
    }
}