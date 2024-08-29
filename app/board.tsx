import { useEffect, useState } from "react";
import BoardRow from "./boardRow";
import Status from "./status";
import { Bot } from "./bot";
import { Client } from "./client";
import { Player } from "./player";
import { Icon } from "./ticTacToeShared";

export default function Board({playersList} : {playersList: (Player)[]}) {

    const [players, setPlayers] = useState(playersList);
    const [playerTurn, setPlayerTurn] = useState(0);

    const [winner, setWinner] = useState(false);

    const isPlayerClient = players[playerTurn] instanceof Client;
    const isWinner = winner; // Temp until winner is more fleshed out


    const [squares, setSquares] = useState(Array(9).fill(''));

    let status;

    useEffect(() => { // Checks if winner after squares is updated then runs bot's turn if needed
        let win = checkWinner();
        if (win) {
            setWinner(true);
            return;
        }

        if (winner || isPlayerClient) {
            return;
        }
        
        setTimeout(() => {
            botTurn();
        }, 1000);

    }, [squares])

    function handleClick(index: number) {
        if (isWinner || !isPlayerClient || squares[index]) {
            return;
        }
    
        clientTurn(index);
        
    }

    function clientTurn(index:number) {
        // Players turn
        let nextSquares = squares.slice();
        playTurn(index, nextSquares);


    }

    function botTurn() {
        if (!(players[playerTurn] instanceof Bot)) { // For choosesquare to not show an error
            return;
        }

        // Cpus turn
        let nextSquares = squares.slice();
        let index = players[playerTurn].chooseSquare(nextSquares);
        if (index === -1) {
            return
        }

        playTurn(index, nextSquares);

    }

    function playTurn(index: number, nextSquares: Array<string>) { // Sets squares and switches turn
        nextSquares[index] = Icon[playerTurn];
        setSquares(nextSquares);

            
        setPlayerTurn((playerTurn + 1) % 2)
    }

    function checkWinner() { // Generic tic-tac-toe stuff
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
            if (squares[a] && squares[a] === squares[b] && squares[b]=== squares[c]) {
                return {index: Icon[squares[a]], squares:[a, b, c]};
            }
        }

        return;
    }

    return (
        <>
            <Status a={players[playerTurn].name}/>
            <div className="pt-10">
                <BoardRow startIndex={0} squares={squares} playerTurn={!isWinner && isPlayerClient} handleClick={handleClick}/>
                <BoardRow startIndex={3} squares={squares} playerTurn={!isWinner && isPlayerClient} handleClick={handleClick}/>
                <BoardRow startIndex={6} squares={squares} playerTurn={!isWinner && isPlayerClient} handleClick={handleClick}/>
            </div>
        </>
    )
}