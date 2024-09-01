'use client'
import { useState } from "react";
import Board from "./board/board";
import { Icon } from "./board/ticTacToeShared";
import DifficultySelect from "./board/difficulty/difficultySelect";
import { PlayerChoice } from "./board/difficulty/playerChoice";
import { Bot } from "./player/bot/bot";
import { CalculatedPickEasy } from "./player/bot/calculatedPickEasy";
import { Playerlike } from "./player/playerlike";
import { Human } from "./player/human";

export default function Home() {
  const difficulties: PlayerChoice[] = [ // All selectable difficulties
    new PlayerChoice(new Human("Player")),
    new PlayerChoice(new Bot(new CalculatedPickEasy())),
  ]

  const [playerList, setPlayerList] = useState<number[]>([0, 1]); // Defaults human vs easy bot

  let pk = require("../package.json");

  const [game, setGame] = useState(<Board playersList={createPlayers()} key={crypto.randomUUID()}/>);

  function createPlayers() { // Turn templates into players
    let order: Playerlike[] = [difficulties[playerList[0]].getNewInstance(), difficulties[playerList[1]].getNewInstance()]

    order[0].name = "X - " + order[0].name;
    order[1].name = "O - " + order[1].name;

    order[0].icon = Icon.X;
    order[1].icon = Icon.O;

    return order;
  }

  function setPlayer (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    let nextPlayersList = playerList.slice();
    nextPlayersList[index] = parseInt(event.currentTarget.value);
    console.log(nextPlayersList);
    setPlayerList(nextPlayersList);
  }

  return (
    <>
      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Tic-tac-toe</h1>
        {game}  
        <div className="pt-10 flex flex-col items-center space-y-10">
          <button className="primary-button" onClick={() => {setGame(<Board playersList={createPlayers()} key={crypto.randomUUID()}/>)} }>New Game</button>
          <div className="flex flex-col md:flex-row space-y-10 md:space-x-10 md:space-y-0">
          <DifficultySelect label="X: " difficulties={difficulties} index={0} selectedValue={playerList[0]} changed={setPlayer}/>
          <DifficultySelect label="O: " difficulties={difficulties} index={1} selectedValue={playerList[1]} changed={setPlayer}/>
          </div>
        </div>
      </main>
      <footer className="text-center pt-10 pb-10 flex flex-col space-y-10">
        <hr />
        <p>View this project on <a className="font-bold underline" href="https://github.com/ShephardLuke/tic-tac-toe">GitHub</a></p>
        <p>Version {pk.version}</p>
      </footer>
    </>
  );
}
