import { useState } from "react";
import BoardRow from "./boardRow";

export default function Board() {
    const [playerIsX, setPlayerIsX] = useState(true);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(''));

    console.log("k");

    async function handleClick(index: number) {
        if (!playerTurn || squares[index]) {
            return;
        }

        // Players turn
        setPlayerTurn(false);

        let nextSquares = squares.slice();
        placeTurn(nextSquares, true, index);
        setSquares(nextSquares);

        await timeout(1000);

        // Cpus turn
        nextSquares = nextSquares.slice();
        cpuTurn(nextSquares);
        setSquares(nextSquares);

        await timeout(1000);

        let winPosition = checkWinner(nextSquares.slice());
        if (winPosition) {

        } else {
            setPlayerTurn(true);
        }

    }

    function placeTurn(nextSquares: Array<string>, isPlayer: boolean, index: number) {
        let player = "X";
        let cpu = "O";
        if (!playerIsX) {
            player = "O";
            cpu = "X";
        }
        if (isPlayer) {
            nextSquares[index] = player;
        } else {
            nextSquares[index] = cpu;
        }
    }

    function cpuTurn(nextSquares: Array<string>) {
        let spacesAvailable = []; // Find out which spaces the CPU can choose
        for (let i = 0; i < nextSquares.length; i++) {
            if (nextSquares[i] === '') {
                spacesAvailable.push(i);
            }
        }

        if (spacesAvailable.length === 0) {
            return;
        }

        let index = Math.floor(Math.random() * spacesAvailable.length)

        placeTurn(nextSquares, false, spacesAvailable[index]);
    }

    function checkWinner(nextSqaures : Array<string>) {
        console.log("check");
        let winPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winPositions.length; i++) {
            const [a, b, c] = winPositions[i];
            if (nextSqaures[a] && nextSqaures[a] === nextSqaures[b] && nextSqaures[b]=== nextSqaures[c]) {
                return [a, b, c];
            }
        }

        return false;
    }

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    return (
        <div className="p-10">
            <BoardRow startIndex={0} squares={squares} playerTurn={playerTurn} handleClick={handleClick}/>
            <BoardRow startIndex={3} squares={squares} playerTurn={playerTurn} handleClick={handleClick}/>
            <BoardRow startIndex={6} squares={squares} playerTurn={playerTurn} handleClick={handleClick}/>
        </div>
    )
}