import { getSpacesAvailable } from "@/app/board/ticTacToeShared";
import { ImpossibleBot } from "./impossibleBot";

// Uses impossible bot's alogrithm to pick the worst available space.

export class VeryEasyBot extends ImpossibleBot {
    static NAME = "Bot (Very Easy)";

    constructor() {
        super();
        this.name = VeryEasyBot.NAME;
    }

    chooseSquare(nextSquares: string[]): number {
        let spacesAvailable = getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        let avoidSpaces: number[] = [];

        let chosenSpace: number;

        let thirdSpace = this.getThirdSpace(this.icon, nextSquares, spacesAvailable); // 1. Avoid winning

        if (thirdSpace !== -1) { 
            avoidSpaces.push(thirdSpace);
        }
        
        thirdSpace = this.getThirdSpace(this.getOtherIcon(this.icon), nextSquares, spacesAvailable); // 2. Dont block

        if (thirdSpace !== -1 && !avoidSpaces.includes(thirdSpace)) {
            avoidSpaces.push(thirdSpace);
        }

        chosenSpace = this.getFork(this.getOtherIcon(this.icon), nextSquares, spacesAvailable); // 4. Avoid forking opponent

        if (chosenSpace !== -1 && !avoidSpaces.includes(chosenSpace)) { 
            avoidSpaces.push(chosenSpace);
        }

        chosenSpace = this.getBlockFork(this.getOtherIcon(this.icon), nextSquares, spacesAvailable); // 3. Avoid blocking opponents fork

        if (chosenSpace !== -1 && !avoidSpaces.includes(chosenSpace)) {
            avoidSpaces.push(chosenSpace);
        }

        chosenSpace = this.getRandomChosenAvailableSpaces([4], spacesAvailable) // 5. Avoid center

        if (chosenSpace !== -1 && !avoidSpaces.includes(chosenSpace)) {
            avoidSpaces.push(chosenSpace);
        }

        chosenSpace = this.getOppositeCorner(this.icon, nextSquares, spacesAvailable); // 6. Avoid opposite corner (can lead to forks)

        if (chosenSpace !== -1 && !avoidSpaces.includes(chosenSpace)) {
            avoidSpaces.push(chosenSpace);
        }

        let cornerSpaces: number[] = [];
        let sideSpaces: number[] = [];

        for (let i = 0; i < spacesAvailable.length; i++) { // Side spaces are worse, so it tries to play an available side space
            let current = spacesAvailable[i];
            if (!avoidSpaces.includes(current)) {
                if ([1, 3, 5, 7].includes(current)) {
                    sideSpaces.push(current);
                } else {
                    cornerSpaces.push(current);
                }
            }
        }

        if (sideSpaces.length > 0) {
            return this.randomSpace(sideSpaces);
        } else if (cornerSpaces.length > 0) {
            return this.randomSpace(cornerSpaces);
        }

        return avoidSpaces[avoidSpaces.length - 1]; // Picks the least important space
    }
}