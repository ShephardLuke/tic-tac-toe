# Tic-tac-toe
### https://tic-tac-toe.shephardluke.co.uk

A tic-tac-toe game made with [Next.js](https://nextjs.org/) and [React](https://react.dev/), originally following the [tic-tac-toe React tutorial](https://react.dev/learn/tutorial-tic-tac-toe), I have extended greatly upon it to include styling and bots with different difficulties.


# Playing the game
## Setup
To setup a game, use the 2 dropdowns to pick who is playing X and O. X always goes first. Here are the different difficulties to choose from: 

|Difficulty      |Description                                                                                                                         |
|----------------|------------------------------------------------------------------------------------------------------------------------------------|
|Human           |For the user to pick if they wish to play.                                                                                          |
|Bot (Very Easy) |Picks the worst space it can to make the opponent win.                                                                              |
|Bot (Easy)      |Picks a random space.                                                                                                               |
|Bot (Medium)    |Same algorithm as hard bot, but occasionally makes mistakes with these mistakes getting more likely the further into the game it is.|
|Bot (Hard)      |Always wins/blocks if there are 2 in a row, otherwise places center or a random                                                     |
|Bot (Impossible)|Always plays best moves. This means it wins/blocks if there are 2 in a row, if not then it will try to create a fork (2 winning squares at once), or block the opponents fork it if sees it. It priorities center then corners, then sides. The opponent should never be able to win, getting a draw at best. The algorithm follows the 8 Steps from Newell and Simon's 1972 tic-tac-toe program (https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy)|

Setting both dropdowns to human will allow 2 users to play against each other on the device, and setting both dropdown to bots will play a game without any user interaction.

Press new game once the difficulties have been selected to start a new game.

## Play
The text above the board will show whose turn it is. On your turn, click/tap an available sqaure to place your X/O. The opponent will then play. The game will keep playing until someone wins or it is draw, in either of those cases the text will display it.

To start a new game at any point you can press the new game button, changing any difficulties if required, to get a fresh board.
