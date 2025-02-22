import Square from "./square";

export default function BoardRow({startIndex, squares, playerTurn, handleClick, classNames} : { startIndex: number, squares: Array<string>, playerTurn: boolean, handleClick : (index: number) => void, classNames: string[]}) {
    return (
        <div className="boardRow -mb-0.5">
            <Square className={classNames[0]} value={squares[startIndex]} enabled={playerTurn && !squares[startIndex]} onSquareClick={() => handleClick(startIndex)} />
            <Square className={classNames[1]} value={squares[startIndex + 1]} enabled={playerTurn && !squares[startIndex + 1]} onSquareClick={() => handleClick(startIndex + 1)} />
            <Square className={classNames[2]} value={squares[startIndex + 2]} enabled={playerTurn && !squares[startIndex + 2]} onSquareClick={() => handleClick(startIndex + 2)} />
        </div>  
    )
}