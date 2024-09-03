import { HumanPickable } from "./bot/humanPickable";
import { Playerlike } from "./playerlike";

export interface Humanlike extends HumanPickable, Omit<Playerlike, "chooseSquare"> {

}