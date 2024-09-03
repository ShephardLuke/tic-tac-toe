'use client'
import { useState } from "react";
import Board from "./board/board";
import { Icon } from "./board/ticTacToeShared";
import DifficultySelect from "./board/difficulty/difficultySelect";
import { Bot } from "./player/bot/bot";
import { BotPickEasy } from "./player/bot/botPickEasy";
import { Playerlike } from "./player/playerlike";
import { Human } from "./player/human";
import { PlayerTemplate } from "./player/playerTemplate";
import { HumanPick } from "./player/bot/humanPick";
import { Pickable } from "./player/bot/pickable";
import { HumanPickable } from "./player/bot/humanPickable";
import { BotPickable } from "./player/bot/botPickable";
import Status from "./status";

export default function Home() {
  const playerTemplates = [
    new PlayerTemplate([new HumanPick], (behaviour: Pickable) => {return new Human(behaviour as HumanPickable, "Human")}),
    new PlayerTemplate([new BotPickEasy], (behaviour: Pickable) => {return new Bot(behaviour as BotPickable)}),
  ]

  const [playerList, setPlayerList] = useState<number[]>([0, 1]); // Defaults human vs easy bot

  let pk = require("../package.json");

  const [game, setGame] = useState(createNewBoard());

  function createPlayers(): [null, number] | Playerlike[] { // Turn templates into players
    let difficulties = [0, 0];
    let players: (Playerlike | null)[] = [playerTemplates[playerList[0]].createPlayer(difficulties[0]), playerTemplates[playerList[1]].createPlayer(difficulties[1])]
    if (players.includes(null)) {
      let error: [null, number] = [null, difficulties[players.indexOf(null)]];
      return error;
    }
    
    let order: Playerlike[] = players as Playerlike[];

    order[0].name = "X - " + order[0].name;
    order[1].name = "O - " + order[1].name;

    order[0].icon = Icon.X;
    order[1].icon = Icon.O;

    return order;
  }

  function createNewBoard() {
    let players = createPlayers();
    if (players[0] === null) {
      setGame(<Status text={"Error: difficulty id too high for " + players[1]}></Status>)
      return;
    }
    players = players as Playerlike[];
    return <Board playersList={players} key={new Date().getTime()}/>;
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
          <button className="primary-button" onClick={() => {setGame(createNewBoard())}}>New Game</button>
          <div className="flex flex-col md:flex-row space-y-10 md:space-x-10 md:space-y-0">
          <DifficultySelect label="X: " difficulties={playerTemplates} index={0} selectedValue={playerList[0]} changed={setPlayer}/>
          <DifficultySelect label="O: " difficulties={playerTemplates} index={1} selectedValue={playerList[1]} changed={setPlayer}/>
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
