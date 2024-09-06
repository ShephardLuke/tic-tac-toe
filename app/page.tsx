'use client'
import { useState } from "react";
import Board from "./board/board";
import { Icon } from "./board/ticTacToeShared";
import PlayerSelect from "./board/difficulty/playerSelect";
import { Bot } from "./player/bot/bot";
import { Playerlike } from "./player/playerlike";
import { Human } from "./player/human/human";
import { PlayerTemplate } from "./player/playerTemplate";
import Status from "./status";
import { HumanModeGiven } from "./player/human/mode/humanModeGiven";
import { Mode } from "./player/mode";
import { HumanMode } from "./player/human/mode/humanMode";
import { BotModeEasy } from "./player/bot/mode/botModeEasy";
import { BotMode } from "./player/bot/mode/botMode";
import { BotModeImpossible } from "./player/bot/mode/botModeImpossible";
export default function Home() {

  const[playerTemplates, setPlayerTemplates] = useState([
    new PlayerTemplate([new HumanModeGiven], (mode: Mode) => {return new Human(mode as HumanMode, "Human")}),
    new PlayerTemplate([new BotModeEasy, new BotModeImpossible], (mode: Mode) => {return new Bot(mode as BotMode)}),
  ]);

  const [playerList, setPlayerList] = useState<number[]>([0, 1]); // Defaults human vs bot

  const [modes, setModes] = useState([0, 1]) // Defaults givewn human vs medium bot

  let pk = require("../package.json");

  const [game, setGame] = useState(createNewBoard());

  function createPlayers(): [null, number] | Playerlike[] { // Turn templates into players
    let players: (Playerlike | null)[] = [playerTemplates[playerList[0]].createPlayer(modes[0]), playerTemplates[playerList[1]].createPlayer(modes[1])]
    if (players.includes(null)) {
      let error: [null, number] = [null, modes[players.indexOf(null)]];
      return error;
    }
    
    let order: Playerlike[] = players as Playerlike[];

    order[0].icon = Icon.X;
    order[1].icon = Icon.O;

    for (let i = 0; i < playerList.length; i++) {
      let player = order[i];
      if (playerTemplates[playerList[i]].getModes().length > 1) {
        player.setName(player.getName() + " (" + player.getChooseBehaviour().getName() + ")");
      }
    }

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

  function changePlayer (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    let nextPlayersList = playerList.slice();
    nextPlayersList[index] = parseInt(event.currentTarget.value);
    setPlayerList(nextPlayersList);

    let nextModes = modes.slice();
    nextModes[index] = 0;
    setModes(nextModes);
  }

  function changeDifficulty (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    let nextModes = modes.slice();

    nextModes[index] = parseInt(event.currentTarget.value);
    setModes(nextModes);
  }

  return (
    <>
      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Tic-tac-toe</h1>
        {game}  
        <div className="pt-10 flex flex-col items-center space-y-10">
          <button className="primary-button" onClick={() => {setGame(createNewBoard())}}>New Game</button>
          <div className="flex flex-col space-y-10">
            <PlayerSelect key="0" label="X: " playerTemplates={playerTemplates} index={0} selectedValue={playerList[0]} selectedMode={modes[0]} changedPlayer={changePlayer} changedDifficulty={changeDifficulty}/>
            <PlayerSelect key="1" label="O: " playerTemplates={playerTemplates} index={1} selectedValue={playerList[1]} selectedMode={modes[1]} changedPlayer={changePlayer} changedDifficulty={changeDifficulty}/>
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
