import { MouseEventHandler } from "react";
import { iconToText } from "./ticTacToeShared";

export default function Square({value, enabled, onSquareClick, className, won=false} : {value: string, enabled: boolean, onSquareClick: MouseEventHandler, className?: string, won?: boolean }) {
    let iconColour = "opacity-0";

    if (won) {
        iconColour = "text-win"
    } else {
        if (value === "X") {
            iconColour = "text-x";
        } else if (value === "O") {
            iconColour = "text-o"
        }
    }


    return (
        <>
            <button 
                className={`${className ? className : ""} border-grid  w-24 h-24 text-[5rem] sm:w-52 sm:h-52 sm:text-[10rem] ${enabled ? 'cursor-pointer hover:bg-gray-100 active:bg-gray-200' : 'cursor-default'} text-3xl`}
                onClick={onSquareClick}
            >
                <span className={`transition duration-300 ease-in-out ${value ? `transition-opacity-100` : `opacity-0`} ${iconColour}`}>{value ? iconToText(value) : ""}</span>
            </button>
        </>

    );
}