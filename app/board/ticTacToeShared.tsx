export function getWinPositions() {
    const winPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]

    return winPositions;
}

export function getSpacesAvailable(nextSquares: Array<string>) {
    const spacesAvailable = []; // Find out which spaces the CPU can choose
    for (let i = 0; i < nextSquares.length; i++) {
        if (nextSquares[i] === '') {
            spacesAvailable.push(i);
        }
    }

    return spacesAvailable;
}


export enum Icon {
    X,
    O,
    Unassigned,
}