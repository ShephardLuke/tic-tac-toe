import { Playerlike } from "../playerlike";
import { BotMode } from "./mode/botMode";

export interface Botlike extends Omit<BotMode, "chooseBehaviour">, Omit<Playerlike, "chooseSquare"> {

}