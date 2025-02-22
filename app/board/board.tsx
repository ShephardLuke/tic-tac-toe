import { useCallback, useEffect, useState } from "react";
import BoardRow from "./boardRow";
import Status from "../status";
import { Bot } from "../player/bot/bot";
import { getSpacesAvailable, Icon } from "./ticTacToeShared";
import { Player } from "../player/player";
import { Human } from "../player/human";

export default function Board({playersList} : {playersList: (Player)[]}) {

    const [players] = useState(playersList);
    const [playerTurn, setPlayerTurn] = useState(0);

    const [winner, setWinner] = useState(false);

    const [status, setStatus] = useState("Turn: " + Icon[playerTurn] + " - " + players[playerTurn].name);

    const isPlayerHuman = players[playerTurn] instanceof Human;

    const [squares, setSquares] = useState(Array(9).fill(''));

    const playTurn = useCallback((index: number, nextSquares: Array<string>) => { // Sets squares and switches turn
        nextSquares[index] = Icon[playerTurn];
        setSquares(nextSquares);

        setPlayerTurn((playerTurn + 1) % 2)
    }, [playerTurn])

    useEffect(() => { // Checks if winner after squares is updated then runs bot's turn if needed

        function checkWinner() { // Generic tic-tac-toe stuff
            const winPositions = [
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
                if (squares[a] && squares[a] === squares[b] && squares[b]=== squares[c]) {
                    return {index: Icon[squares[a]], squares:[a, b, c]};
                }
            }
    
            return;
        }    

        function botTurn() {
            if (!(players[playerTurn] instanceof Bot)) { // For choosesquare to not show an error
                return;
            }
    
            // Cpus turn
            const nextSquares = squares.slice();
            const index = players[playerTurn].chooseSquare(nextSquares);
            if (index === -1) {
                return
            }
    
            playTurn(index, nextSquares);
    
        }

        if (!winner) {
            const win = checkWinner();
            if (win) { // Win check
                setStatus(Icon[(playerTurn + 1) % 2] + " - " + players[(playerTurn + 1) % 2].name + " won!")
                setWinner(true);
                return;
            } else {
                if (getSpacesAvailable(squares).length === 0) { // Draw check
                    setStatus("It is a draw!");
                    setWinner(true);
                } else {
                    setStatus("Turn: " + Icon[playerTurn] + " - " + players[playerTurn].name);
                }
            }
        } else if (winner || isPlayerHuman) { // Allows bot turn only if the current player is human and nobody won
            return;
        }
    
        setTimeout(() => {
            botTurn();
        }, 1000);

    }, [playerTurn, isPlayerHuman, squares, players, winner, playTurn])

    function handleClick(index: number) { // Run human turn on the index
        if (winner || !isPlayerHuman || squares[index]) {
            return;
        }
    
        HumanTurn(index);
    }

    function HumanTurn(index:number) { // Players turn
        const nextSquares = squares.slice();
        playTurn(index, nextSquares);
    }

    return (
        <>
            <Status text={status}/>
            <div className="pt-10 pb-10">
                <BoardRow classNames={["", "border-l-2", "border-l-2"]} startIndex={0} squares={squares} playerTurn={!winner && isPlayerHuman} handleClick={handleClick}/>
                <BoardRow classNames={["border-t-2", "border-l-2 border-t-2", "border-l-2 border-t-2"]} startIndex={3} squares={squares} playerTurn={!winner && isPlayerHuman} handleClick={handleClick}/>
                <BoardRow classNames={["border-t-2", "border-l-2 border-t-2", "border-l-2 border-t-2"]}  startIndex={6} squares={squares} playerTurn={!winner && isPlayerHuman} handleClick={handleClick}/>
            </div>
        </>
    )
}