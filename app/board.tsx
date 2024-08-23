import { useState } from "react";
import Square from "./square";

export default function Board() {
    const [playerIsX, setPlayerIsX] = useState(true);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [squares, setSqaures] = useState(Array(9).fill(''));

    async function handleClick(index: number) {
        if (!playerTurn || squares[index]) {
            return;
        }

        // Players turn
        setPlayerTurn(false);

        let nextSqaures = squares.slice();
        placeTurn(nextSqaures, true, index);
        setSqaures(nextSqaures);

        await timeout(1000);

        // Cpus turn
        nextSqaures = nextSqaures.slice();
        cpuTurn(nextSqaures);
        setSqaures(nextSqaures);

        await timeout(1000);

        setPlayerTurn(true);
    }

    function placeTurn(nextSqaures: Array<string>, isPlayer: boolean, index: number) {
        let player = "X";
        let cpu = "O";
        if (!playerIsX) {
            player = "O";
            cpu = "X";
        }
        if (isPlayer) {
            nextSqaures[index] = player;
        } else {
            nextSqaures[index] = cpu;
        }
    }

    function cpuTurn(nextSqaures: Array<string>) {
        let spacesAvailable = []; // Find out which spaces the CPU can choose
        for (let i = 0; i < nextSqaures.length; i++) {
            if (nextSqaures[i] === '') {
                spacesAvailable.push(i);
            }
        }

        if (spacesAvailable.length === 0) {
            return;
        }

        let index = Math.floor(Math.random() * spacesAvailable.length)

        placeTurn(nextSqaures, false, spacesAvailable[index]);
    }

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    return (
        <div className="p-10">
            <div className="boardRow -mb-0.5">
                <Square value={squares[0]} onSqaureClick={() => handleClick(0)} />
                <Square value={squares[1]} onSqaureClick={() => handleClick(1)} />
                <Square value={squares[2]} onSqaureClick={() => handleClick(2)} />
            </div>            
            <div className="boardRow -mb-0.5">
                <Square value={squares[3]} onSqaureClick={() => handleClick(3)} />
                <Square value={squares[4]} onSqaureClick={() => handleClick(4)} />
                <Square value={squares[5]} onSqaureClick={() => handleClick(5)} />
            </div>           
            <div className="boardRow -mb-0.5">
                <Square value={squares[6]} onSqaureClick={() => handleClick(6)} />
                <Square value={squares[7]} onSqaureClick={() => handleClick(7)} />
                <Square value={squares[8]} onSqaureClick={() => handleClick(8)} />
            </div>
        </div>
    )
}