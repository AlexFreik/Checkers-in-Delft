# Assignment 2

## 2.1 Game UI
- Click on a mute button. It should turn on / off sounds in the game.
- Click on the home button. Game ends and user directed to the splash screen.
- Click on a piece. Piece became visibly selected. 
- Click on an empty board square. If there was selected piece, and it is a legal move, than piece is moved.
   Legality of the move is checked via HTTP requests.

## 2.2 Use of design patterns
- The basic constructor pattern (in the file `/public/javascripts/canvas/positions.js`)
   We implemened `AbsClientPos` "class" using this pattern.

## 3.3 WebSocket API

The API can be found in the `/design/API.md` file.
