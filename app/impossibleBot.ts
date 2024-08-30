import { space } from "postcss/lib/list";
import { Bot } from "./bot";
import { getWinPositions, Icon } from "./ticTacToeShared";

// 8 Steps based on Newell and Simon's 1972 tic-tac-toe program (https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy)

export class ImpossibleBot extends Bot {

    constructor() {
        super();
        this.name = "Bot (Impossible)";
    }

    chooseSquare(nextSquares: string[]): number {
        let spacesAvailable = this.getSpacesAvailable(nextSquares);

        if (spacesAvailable.length === 0) {
            return -1;
        }

        let chosenSpace: number;

        let thirdSpace = this.getThirdSpace(this.icon, nextSquares, spacesAvailable); // 1. Win if 2/3

        if (thirdSpace !== -1) { 
            return thirdSpace;
        }
        
        thirdSpace = this.getThirdSpace(this.getOtherIcon(this.icon), nextSquares, spacesAvailable); // 2. Stop opponent from winning 

        if (thirdSpace !== -1) {
            return thirdSpace;
        }

        chosenSpace = this.getFork(this.icon, nextSquares, spacesAvailable); // 3. Fork

        if (chosenSpace !== -1) {
            return chosenSpace;
        }
        
        chosenSpace = this.getBlockFork(this.icon, nextSquares, spacesAvailable); // 4. Block fork

        if (chosenSpace !== -1) { 
            return chosenSpace;
        }

        if (spacesAvailable.length == 9) { // 5a. First move, corner gives player more opportunities for mistakes
            return this.getRandomChosenAvailableSpaces([0, 2, 6, 8], spacesAvailable)
        }

        chosenSpace = this.getRandomChosenAvailableSpaces([4], spacesAvailable) // 5b. Center

        if (chosenSpace !== -1) {
            return chosenSpace;
        }

        chosenSpace = this.getOppositeCorner(this.icon, nextSquares, spacesAvailable); // 6. Opposite corner

        if (chosenSpace !== -1) {
            return chosenSpace;
        }

        chosenSpace = this.getRandomChosenAvailableSpaces([0, 2, 6, 8], spacesAvailable) // 7. Corner
        
        if (chosenSpace !== -1) {
            return chosenSpace;
        }
        
        return this.getRandomChosenAvailableSpaces([1, 3, 5, 7], spacesAvailable) // 8. Side
    }

    getFork(icon: Icon, nextSquares: string[], spacesAvailable: number[]): number { // On 2nd ard 3rd turns, try to create two winning places at once
        if (icon === Icon.O) {
            return -1;
        }

        let corners = [0, 2, 6, 8];


        if (spacesAvailable.length === 7) { // 2nd move 

            let opposites: number[][] = [];
            for (let corner of corners) {
                if (nextSquares[corner] === Icon[icon]) {
                    opposites = this.getOpposites(corner);
                } 
            }

            if (opposites.length === 0) { // Should never happen but failsafe
                return -1;
            }

            if (this.isPossibleMove(4, spacesAvailable)) { // If opponent not in center choose opposite not blocked by them
                for (let opposite of opposites) {
                    if (this.isPossibleMove(opposite[1], spacesAvailable) && this.isPossibleMove(opposite[0], spacesAvailable)) {
                        return opposite[1];
                    }
                }
            } else { // Choose opposite diagonal from 1st move
                let opposite = -1;
                switch(Icon[icon]) {
                    case nextSquares[0]:
                        opposite = 8;
                        break;
                    case nextSquares[2]:
                        opposite = 6;
                        break;
                    case nextSquares[6]:
                        opposite = 2;
                        break;
                    case nextSquares[8]:
                        opposite = 0;
                        break;
                }
                return opposite;
            }

        }

        if (spacesAvailable.length === 5) { // Continues from 2nd move non center, now 3rd move is place diagonal not blocked by anything to cause a fork
            if (this.isPossibleMove(4, spacesAvailable)) {
                for (let corner of corners) {
                    if (!this.isPossibleMove(corner, spacesAvailable)) {
                        continue;
                    }
                    let opposites = this.getOpposites(corner);
                    for (let opposite of opposites) {
                        if ((nextSquares[opposite[1]] === Icon[icon]) && this.isPossibleMove(opposite[0], spacesAvailable)) {
                            return corner;
                        }
                    }
                }
                return 4;
            }
        }
        return -1;
    }

    getBlockFork(icon: Icon, nextSquares: string[], spacesAvailable: number[]) { // Places a center side when opponent uses opposite diagonals to avoid fork
        let oppositeIcon = this.getOtherIcon(icon);
        let opposites = [[0, 8], [2, 6]];
        for (let i = 0; i < opposites.length; i++) {
            let current = opposites[i];
            if (nextSquares[4] === Icon[icon] && Icon[oppositeIcon] === nextSquares[current[0]] && nextSquares[current[0]] === nextSquares[current[1]]) {
                return this.getRandomChosenAvailableSpaces([1, 3, 5, 7], spacesAvailable) // 8. Side 
            }
        }
        return -1;
    }

    getOpposites(square: number): number[][] { // Get opposites from given square, in the form [center side between the corners, the corner]
        let opposites: number[][] = [];
        switch (square) {
            case 0:
                opposites = [[1, 2], [3, 6]];
                break;
            case 2:
                opposites = [[1, 0], [5, 8]];
                break;
            case 6:
                opposites = [[3, 0], [7, 8]];
                break;
            case 8:
                opposites = [[5, 2], [7, 6]];
                break;
        }

        return opposites;
    }

    getOppositeCorner(icon: Icon, nextSquares: string[], spacesAvailable: number[]) { // Returns a corner opposite to an already places one by the bot, used for forking
        let oppositeIcon = this.getOtherIcon(icon);
        let opposites = [[0, 8], [2, 6]];
        for (let i = 0; i < opposites.length; i++) {
            let current = opposites[i];
            if (nextSquares[current[0]] === Icon[oppositeIcon] && this.isPossibleMove(current[1], spacesAvailable)) {
                return current[1];
            }
            if (nextSquares[current[1]] === Icon[oppositeIcon] && this.isPossibleMove(current[0], spacesAvailable)) {
                return current[0];
            }
        }
        return -1;
    }

    getOtherIcon(icon: Icon) { // Returns opponent's icon
        if (icon === Icon.X) {
            return Icon.O;
        }
        return Icon.X
    }

    getThirdSpace(icon: Icon, nextSquares: string[], spacesAvailable: number[]): number { // Returns the winning move when 2 of 3 are placed
        let winPositions = getWinPositions();

        for (let positions of winPositions) {
            let spacesLeft = positions.slice();

            for (let i = 0; i < positions.length; i++) {
                if (spacesLeft.includes(positions[i]) && nextSquares[positions[i]] === Icon[icon]) {
                    spacesLeft.splice(spacesLeft.indexOf(positions[i]), 1);
                }
            }

            if (spacesLeft.length === 1 && this.isPossibleMove(spacesLeft[0], spacesAvailable)) {
                return spacesLeft[0];
            }
        }

        return -1;
    }

    isPossibleMove(chosenSpace: number, spacesAvailable: number[]): boolean {
        return spacesAvailable.includes(chosenSpace);
    }

    getRandomChosenAvailableSpaces(chosenSpaces: number[], spacesAvailable: number[]): number { // Returns a random move out of a group of possible moves
        let chosenAvailableSpaces = []

        for (let i = 0; i < chosenSpaces.length; i++) {
            if (spacesAvailable.includes(chosenSpaces[i])) {
                chosenAvailableSpaces.push(chosenSpaces[i]);
            }
        }

        if (chosenAvailableSpaces.length === 0) { // Should never happen if algorithm is implemented right
            return -1;
        }
        
        return this.randomSpace(chosenAvailableSpaces);
    }
}
