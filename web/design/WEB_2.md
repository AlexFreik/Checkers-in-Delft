# Assignment 2

## 2.1 Game UI
- Click on the mute button. It should turn on / off sounds in the game.
- Click on the home button. Game ends and user is directed to the splash screen.
- Click on a piece. Piece becomes visibly selected. 
- Click on an empty board square. If there was selected piece, and it is a legal move, than the piece is moved.
   Legality of the move is checked via HTTP requests.

## 2.2 Use of design patterns
- The basic constructor pattern (in the file `/public/javascripts/game_state.js`)
   We implemented `Piece` "class" using this pattern.

## 3.3 WebSocket API

The API can be found in the `/design/API.md` file.
