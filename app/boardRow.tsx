import Square from "./square";

export default function BoardRow({startIndex, squares, playerTurn, handleClick} : { startIndex: number, squares: Array<string>, playerTurn: boolean, handleClick : Function }) {
    return (
        <div className="boardRow -mb-0.5">
            <Square value={squares[startIndex]} enabled={playerTurn && !squares[startIndex]} onSquareClick={() => handleClick(startIndex)} />
            <Square value={squares[startIndex + 1]} enabled={playerTurn && !squares[startIndex + 1]} onSquareClick={() => handleClick(startIndex + 1)} />
            <Square value={squares[startIndex + 2]} enabled={playerTurn && !squares[startIndex + 2]} onSquareClick={() => handleClick(startIndex + 2)} />
        </div>  
    )
}