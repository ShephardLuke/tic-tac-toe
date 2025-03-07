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
import { DifficultyGroup } from "./board/difficulty/difficultyGroup";
import { DifficultyReference } from "./board/difficulty/difficultyReference";
import { Icon, iconToText } from "./board/ticTacToeShared";
import Button from "./button";
import { Circle, CircleSmall, Grid3x3, Plus, X } from "lucide-react";
import IconText from "./iconText";

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

    order[0].icon = Icon.X;
    order[1].icon = Icon.O;

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
      <main className="text-center p-1 pb-5">
        <IconText>
          <X size={"30px"} className="mt-auto mb-auto text-x"/>
          <Circle size={"20px"} className="mt-auto mb-auto text-o"/>
          <h1 className="text-base mt-auto mb-auto pl-1">Tic Tac Toe</h1>
        </IconText>
        {game}  
        <div className="flex flex-col items-center space-y-10">
          <Button clicked={() => {setGame(<Board playersList={createPlayers()} key={new Date().getTime()}/>)}}><IconText><Plus/>New Game</IconText></Button>
          <div className="flex flex-col space-y-10 items-center"> 
            <DifficultySelect groupLabel={`${iconToText("X")}: `} typeLabel="Difficulty: " difficulties={difficulties} index={0} selectedGroup={playerList[0]} changedGroup={setDifficultyGroup} changedIndex={setDifficultyIndex}/>
            <DifficultySelect groupLabel={`${iconToText("O")}: `} typeLabel="Difficulty: " difficulties={difficulties} index={1} selectedGroup={playerList[1]} changedGroup={setDifficultyGroup} changedIndex={setDifficultyIndex}/>
          </div>
        </div>
      </main>
    </>
  );
}
