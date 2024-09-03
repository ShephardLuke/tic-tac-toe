'use client'
import { useState } from "react";
import Board from "./board/board";
import { Icon } from "./board/ticTacToeShared";
import PlayerSelect from "./board/difficulty/playerSelect";
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
import { TEST_DIFFICULTY_MEDIUM } from "./player/bot/TEST_DIFFICULTIES/TEXT_DEFFICULTY_MEDIUM";
import { TEST_DIFFICULTY_HARD } from "./player/bot/TEST_DIFFICULTIES/TEST_DIFFICULTY_HARD";

export default function Home() {

  const[playerTemplates, setPlayerTemplates] = useState([
    new PlayerTemplate([new HumanPick], (behaviour: Pickable) => {return new Human(behaviour as HumanPickable, "Human")}),
    new PlayerTemplate([new BotPickEasy, new TEST_DIFFICULTY_MEDIUM, new TEST_DIFFICULTY_HARD], (behaviour: Pickable) => {return new Bot(behaviour as BotPickable)}),
  ]);

  const [behaviours, setBehaviours] = useState([0, 0])

  const [playerList, setPlayerList] = useState<number[]>([0, 1]); // Defaults human vs easy bot

  let pk = require("../package.json");

  const [game, setGame] = useState(createNewBoard());

  function createPlayers(): [null, number] | Playerlike[] { // Turn templates into players
    let players: (Playerlike | null)[] = [playerTemplates[playerList[0]].createPlayer(behaviours[0]), playerTemplates[playerList[1]].createPlayer(behaviours[1])]
    if (players.includes(null)) {
      let error: [null, number] = [null, behaviours[players.indexOf(null)]];
      return error;
    }
    
    let order: Playerlike[] = players as Playerlike[];

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

  function changePlayer (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    let nextPlayersList = playerList.slice();
    nextPlayersList[index] = parseInt(event.currentTarget.value);
    setPlayerList(nextPlayersList);

    let nextBehaviours = behaviours.slice();
    nextBehaviours[index] = 0;
    setBehaviours(nextBehaviours);
  }

  function changeDifficulty (event: React.ChangeEvent<HTMLSelectElement>, index: number) {
    let nextBehaviours = behaviours.slice();

    nextBehaviours[index] = parseInt(event.currentTarget.value);
    setBehaviours(nextBehaviours);
  }

  return (
    <>
      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Tic-tac-toe</h1>
        {game}  
        <div className="pt-10 flex flex-col items-center space-y-10">
          <button className="primary-button" onClick={() => {setGame(createNewBoard())}}>New Game</button>
          <div className="flex flex-col space-y-10">
            <PlayerSelect key="0" label="X: " playerTemplates={playerTemplates} index={0} selectedValue={playerList[0]} selectedBehaviour={behaviours[0]} changedPlayer={changePlayer} changedDifficulty={changeDifficulty}/>
            <PlayerSelect key="1" label="O: " playerTemplates={playerTemplates} index={1} selectedValue={playerList[1]} selectedBehaviour={behaviours[1]} changedPlayer={changePlayer} changedDifficulty={changeDifficulty}/>
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
