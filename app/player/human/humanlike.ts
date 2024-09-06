import { HumanMode } from "./mode/humanMode";
import { Playerlike } from "../playerlike";

export interface Humanlike extends Omit<HumanMode, "chooseBehaviour">, Omit<Playerlike, "chooseSquare"> {

}