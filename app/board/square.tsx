import { MouseEventHandler } from "react";
import { iconToText } from "./ticTacToeShared";

export default function Square({value, enabled, onSquareClick, className, won=false} : {value: string, enabled: boolean, onSquareClick: MouseEventHandler, className?: string, won?: boolean }) {

    const normalColours = ["", "text-gray-500"]
    const winColours = ["text-green-400", "text-green-700"]

    let normalColour = normalColours[0]
    let winColour = winColours[0]

    if (value == "O") {
        normalColour = normalColours[1]
        winColour = winColours[1]
    }

    return (
        <>
            <button 
                className={`${className ? className : ""}  w-24 h-24 text-[5rem] sm:w-52 sm:h-52 sm:text-[10rem] bg-dark ${enabled ? 'cursor-pointer hover:bg-darkest-blue active:bg-darkest-blue-2x hover:transition' : 'cursor-default'} text-3xl`}
                onClick={onSquareClick}
            >
                <span className={`transition duration-700 ease-in-out ${value ? `transition-opacity-100` : `opacity-0`} ${won ? winColour : normalColour}`}>{value ? iconToText(value) : ""}</span>
            </button>
        </>

    );
}