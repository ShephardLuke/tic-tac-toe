import { useState } from "react";
import Square from "./square";

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSqaures] = useState(Array(9).fill(null));

    function handleClick(i: number) {
        if (squares[i]) {
            return;
        }
        const nextSqaures = squares.slice();
        if (xIsNext) {
            nextSqaures[i] = "X";
        } else {
            nextSqaures[i] = "O";
        }
        setSqaures(nextSqaures);
        setXIsNext(!xIsNext);
    }

    return (
        <div className="p-10">
            <div className="boardRow -mb-0.5">
                <Square value={squares[0]} onSqaureClick={() => handleClick(0)} />
                <Square value={squares[1]} onSqaureClick={() => handleClick(1)} />
                <Square value={squares[2]} onSqaureClick={() => handleClick(2)} />
            </div>            
            <div className="boardRow -mb-0.5">
                <Square value={squares[3]} onSqaureClick={() => handleClick(3)} />
                <Square value={squares[4]} onSqaureClick={() => handleClick(4)} />
                <Square value={squares[5]} onSqaureClick={() => handleClick(5)} />
            </div>           
            <div className="boardRow -mb-0.5">
                <Square value={squares[6]} onSqaureClick={() => handleClick(6)} />
                <Square value={squares[7]} onSqaureClick={() => handleClick(7)} />
                <Square value={squares[8]} onSqaureClick={() => handleClick(8)} />
            </div>
        </div>
    )
}