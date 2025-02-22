import { MouseEventHandler } from "react";
import { roboto } from "../font";

export default function Square({value, enabled, onSquareClick, className} : {value: string, enabled: boolean, onSquareClick: MouseEventHandler, className?: string }) {
    return (
        <button 
            className={`${roboto.className} ${className ? className : ""} w-16 h-16 text-4xl md:w-32 md:h-32 md:text-7xl lg:w-48 lg:h-48 lg:text-9xl divide-solid -mr-0.5 bg-dark ${enabled ? 'cursor-pointer hover:bg-darkest-blue active:bg-darkest-blue-2x' : 'cursor-default'} text-3xl`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}