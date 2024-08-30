import { MouseEventHandler } from "react";
import { roboto } from "../font";

export default function Square({value, enabled, onSquareClick} : {value: string, enabled: boolean, onSquareClick: MouseEventHandler }) {
    return (
        <button 
            className={`${roboto.className} w-16 h-16 -text-5xl border-2 -mr-0.5 border-white bg-light-blue ${enabled ? 'cursor-pointer' : 'cursor-default'} size-16 text-3xl`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}