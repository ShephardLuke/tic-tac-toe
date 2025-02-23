import { MouseEventHandler } from "react";
import { roboto } from "../font";
import { iconToText } from "./ticTacToeShared";

export default function Square({value, enabled, onSquareClick, className} : {value: string, enabled: boolean, onSquareClick: MouseEventHandler, className?: string }) {

    return (
        <>
            <button 
                className={`${roboto.className} ${className ? className : ""} ${value === "X" ? "" : "text-gray-500"} w-24 h-24 text-[5rem] sm:w-52 sm:h-52 sm:text-[10rem] divide-solid -mr-0.5 bg-dark ${enabled ? 'cursor-pointer hover:bg-darkest-blue active:bg-darkest-blue-2x' : 'cursor-default'} text-3xl`}
                onClick={onSquareClick}
            >
                {value ? iconToText(value) : ""}
            </button>
        </>

    );
}