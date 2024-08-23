import { MouseEventHandler, useState } from "react";
import { roboto } from "./font";

export default function Square({value, onSqaureClick} : {value: number, onSqaureClick: MouseEventHandler }) {
    return (
        <button 
            className={`${roboto.className} w-16 h-16 -text-5xl border-2 -mr-0.5 border-black cursor-pointer size-16 text-3xl`}
            onClick={onSqaureClick}
        >
            {value}
        </button>
    );
}