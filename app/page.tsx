'use client'
import { useState } from "react";
import Board from "./board";
import { Client } from "./client";
import { ImpossibleBot } from "./impossibleBot";
import { Icon } from "./ticTacToeShared";

export default function Home() {
  const [game, setGame] = useState(<></>);

  let pk = require("../package.json");

  function randomOrder() { // Player or bot goes first randomly
    let order = [new Client("Player 1"), new ImpossibleBot()];
    if (Math.floor(Math.random() * 2) === 0) {
        order = [order[1], order[0]];
    }

    order[0].icon = Icon.X;
    order[1].icon = Icon.O;

    return order;
}

  return (
    <main>
      <button className={"primary-button"} onClick={() => {setGame(<Board playersList={randomOrder()} key={new Date().getTime()}/>)} }>New Game</button>
      {game}
      <p className="pt-10 text-xs">Version {pk.version}</p>
    </main>
  );
}
