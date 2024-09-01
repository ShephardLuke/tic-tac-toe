import { GivenPickable } from "./bot/givenPickable";
import { Playerlike } from "./playerlike";

export interface Humanlike extends GivenPickable, Omit<Playerlike, "chooseSquare"> {

}