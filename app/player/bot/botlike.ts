import { Playerlike } from "../playerlike";
import { BotPickable } from "./botPickable";

export interface Botlike extends BotPickable, Omit<Playerlike, "chooseSquare"> {

}