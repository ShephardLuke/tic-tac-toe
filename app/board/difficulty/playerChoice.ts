import { Bot } from "@/app/player/bot/bot";
import { CalculatedPickable } from "@/app/player/bot/calculatedPickable";
import { Human } from "@/app/player/human";
import { Playerlike } from "@/app/player/playerlike";

export class PlayerChoice {
    playerBehaviour: Playerlike;

    constructor(playerBehaviour: Playerlike) {
        this.playerBehaviour = playerBehaviour;
    }

    getNewInstance() { // TEMPORARY until bot difficulty is reworked.
        if (this.playerBehaviour instanceof Human) {
            return new Human("Player");
        } else {
            return new Bot(this.playerBehaviour.getPickBehaviour() as CalculatedPickable);
        }
    }

    setPlayerBehaviour(playerBehaviour: Playerlike) {
        this.playerBehaviour = playerBehaviour;
    }

    getPlayerBehaviour() {
        return this.playerBehaviour;
    }
}