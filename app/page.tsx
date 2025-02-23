'use client'
import { useState } from "react";
import Board from "./board/board";
import { ImpossibleBot } from "./player/bot/impossibleBot";
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
import { iconToText } from "./board/ticTacToeShared";

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
  ]

  const [playerList, setPlayerList] = useState<DifficultyReference[]>([new DifficultyReference(0, 0), new DifficultyReference(1, 2)]); // Defaults human vs medium bot

  const [game, setGame] = useState(<Board playersList={createPlayers()} key={new Date().getTime()}/>);

  function createPlayers() { // Turn templates into players
    const order = [difficulties[playerList[0].group].templates[playerList[0].index].clone(), difficulties[playerList[1].group].templates[playerList[1].index].clone()]

    return order;
  }

  function setDifficultyGroup (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    const nextPlayersList = [...playerList];

    nextPlayersList[index] = new DifficultyReference(Number((event.target as HTMLSelectElement).value), 0);
    setPlayerList(nextPlayersList);
  }

  function setDifficultyIndex (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    const nextPlayersList = [...playerList];

    nextPlayersList[index] = new DifficultyReference(nextPlayersList[index].group, Number((event.target as HTMLSelectElement).value));
    setPlayerList(nextPlayersList);
  }


  return (
    <>
      <Header currentPage="Play"/>
      <div className="flex flex-col items-center pt-20 pb-20">
        <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
        {game}  
        <div className="flex flex-col items-center space-y-10">
          <SubmitButton text="New Game" clicked={() => {setGame(<Board playersList={createPlayers()} key={new Date().getTime()}/>)} }/>

          <div className="flex flex-col space-y-10 items-center"> 
            <DifficultySelect label={`${iconToText("X")}: `} difficulties={difficulties} index={0} selectedGroup={playerList[0]} changedGroup={setDifficultyGroup} changedIndex={setDifficultyIndex}/>
            <DifficultySelect label={`${iconToText("O")}: `} difficulties={difficulties} index={1} selectedGroup={playerList[1]} changedGroup={setDifficultyGroup} changedIndex={setDifficultyIndex}/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
