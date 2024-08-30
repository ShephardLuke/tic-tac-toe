'use client'
import { useState } from "react";
import Board from "./board/board";
import { ImpossibleBot } from "./player/bot/impossibleBot";
import { Icon } from "./board/ticTacToeShared";
import DifficultySelect from "./board/difficulty/difficultySelect";
import { Bot } from "./player/bot/bot";
import { DifficultyTemplate } from "./board/difficulty/difficultyTemplate";
import { HardBot } from "./player/bot/hardBot";
import { MediumBot } from "./player/bot/mediumBot";
import { VeryEasyBot } from "./player/bot/veryEasyBot";
import { Human } from "./player/human";

export default function Home() {
  const [game, setGame] = useState(<></>);

  const difficulties: DifficultyTemplate[] = [ // All selectable difficulties
    new DifficultyTemplate(Human.NAME, () => {return new Human()}),
    new DifficultyTemplate(VeryEasyBot.NAME, () => {return new VeryEasyBot()}),
    new DifficultyTemplate(Bot.NAME, () => {return new Bot()}),
    new DifficultyTemplate(MediumBot.NAME, () => {return new MediumBot()}),
    new DifficultyTemplate(HardBot.NAME, () => {return new HardBot()}),
    new DifficultyTemplate(ImpossibleBot.NAME, () => {return new ImpossibleBot()}),
  ]

  const [playerList, setPlayerList] = useState<number[]>([0, 3]); // Defaults human vs easy bot

  let pk = require("../package.json");

  function createPlayers() { // Turn templates into players
    let order = [difficulties[playerList[0]].clone(), difficulties[playerList[1]].clone()]

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
    <main>
      <button className="primary-button" onClick={() => {setGame(<Board playersList={createPlayers()} key={crypto.randomUUID()}/>)} }>New Game</button>
      <DifficultySelect label="X: " difficulties={difficulties} index={0} selectedValue={playerList[0]} changed={setPlayer}/>
      <DifficultySelect label="O: " difficulties={difficulties} index={1} selectedValue={playerList[1]} changed={setPlayer}/>
      {game}  
      <p className="pt-10 text-xs">Version {pk.version}</p>
    </main>
  );
}
