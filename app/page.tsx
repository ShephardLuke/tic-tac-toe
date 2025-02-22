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
import Header from "./template/global/header";
import Footer from "./template/global/footer";
import SubmitButton from "./template/buttons/submitButton";
import { DifficultyGroup } from "./board/difficulty/difficultyGroup";
import { DifficultyReference } from "./board/difficulty/difficultyReference";

export default function Home() {
  const difficulties: DifficultyGroup[] = [ // All selectable difficulties
    new DifficultyGroup("Player", [
      new DifficultyTemplate(Human.NAME, () => {return new Human("Player")}),
    ]),
    new DifficultyGroup("Computer", [
      new DifficultyTemplate(VeryEasyBot.NAME, () => {return new VeryEasyBot(`Computer (${VeryEasyBot.NAME})`)}),
      new DifficultyTemplate(Bot.NAME, () => {return new Bot(`Computer (${Bot.NAME})`)}),
      new DifficultyTemplate(MediumBot.NAME, () => {return new MediumBot(`Computer (${MediumBot.NAME})`)}),
      new DifficultyTemplate(HardBot.NAME, () => {return new HardBot(`Computer (${HardBot.NAME})`)}),
      new DifficultyTemplate(ImpossibleBot.NAME, () => {return new ImpossibleBot(`Computer (${ImpossibleBot.NAME})`)}),
    ])

    // new DifficultyTemplate(VeryEasyBot.NAME, () => {return new VeryEasyBot()}),
    // new DifficultyTemplate(Bot.NAME, () => {return new Bot()}),
    // new DifficultyTemplate(MediumBot.NAME, () => {return new MediumBot()}),
    // new DifficultyTemplate(HardBot.NAME, () => {return new HardBot()}),
    // new DifficultyTemplate(ImpossibleBot.NAME, () => {return new ImpossibleBot()}),
  ]

  const [playerList, setPlayerList] = useState<DifficultyReference[]>([new DifficultyReference(0, 0), new DifficultyReference(1, 2)]); // Defaults human vs medium bot

  let pk = require("../package.json");

  const [game, setGame] = useState(<Board playersList={createPlayers()} key={new Date().getTime()}/>);

  function createPlayers() { // Turn templates into players
    console.log(playerList)
    let order = [difficulties[playerList[0].group].templates[playerList[0].index].clone(), difficulties[playerList[1].group].templates[playerList[1].index].clone()]

    order[0].icon = Icon.X;
    order[1].icon = Icon.O;

    return order;
  }

  function setDifficultyGroup (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    let nextPlayersList = [...playerList];
    console.log("GROUP" + Number((event.target as HTMLSelectElement).value))
    nextPlayersList[index] = new DifficultyReference(Number((event.target as HTMLSelectElement).value), 0);
    console.log(nextPlayersList);
    setPlayerList(nextPlayersList);
  }

  function setDifficultyIndex (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    let nextPlayersList = [...playerList];
    nextPlayersList[index] = new DifficultyReference(nextPlayersList[index].group, Number((event.target as HTMLSelectElement).value));
    console.log(nextPlayersList);
    setPlayerList(nextPlayersList);
  }


  return (
    <>
      <Header currentPage="Play"/>
      <div className="flex flex-col items-center p-20">
        <h1 className="text-3xl font-bold">Tic-tac-toe</h1>
        {game}  
        <div className="flex flex-col items-center space-y-10">
          <SubmitButton text="New Game" clicked={() => {setGame(<Board playersList={createPlayers()} key={new Date().getTime()}/>)} }/>

          <div className="flex flex-col space-y-10 items-center"> 
            <DifficultySelect label="X: " difficulties={difficulties} index={0} selectedGroup={playerList[0]} changedGroup={setDifficultyGroup} changedIndex={setDifficultyIndex}/>
            <DifficultySelect label="O: " difficulties={difficulties} index={1} selectedGroup={playerList[1]} changedGroup={setDifficultyGroup} changedIndex={setDifficultyIndex}/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
