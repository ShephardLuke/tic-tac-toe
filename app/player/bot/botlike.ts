import { Playerlike } from "../playerlike";
import { CalculatedPickable } from "./calculatedPickable";

export interface Botlike extends CalculatedPickable, Omit<Playerlike, "chooseSquare"> {

}