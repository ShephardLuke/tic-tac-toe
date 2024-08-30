import { MouseEventHandler } from "react";
import { roboto } from "../font";

export default function Square({value, enabled, onSquareClick} : {value: string, enabled: boolean, onSquareClick: MouseEventHandler }) {
    return (
        <button 
            className={`${roboto.className} w-16 h-16 text-4xl md:w-32 md:h-32 md:text-7xl lg:w-48 lg:h-48 lg:text-9xl border-2 md:border-3 lg:border-4 -mr-0.5 border-white bg-light-blue ${enabled ? 'cursor-pointer' : 'cursor-default'} text-3xl`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}