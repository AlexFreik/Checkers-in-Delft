# Assignment 2

[TOC]

## 2.1 Game UI
- Click on the mute button. It should turn on / off sounds in the game.
- Click on the home button. Game ends and user is directed to the splash screen.
- Click on a piece. Piece becomes visibly selected. 
- Click on an empty board square. If there was selected piece, and it is a legal move, than the piece is moved.
   Legality of the move is checked via HTTP requests.

## 2.2 Use of design patterns
- We implemented `Piece` "class" using the "Design pattern 2: Prototype-based constructor". 
   One can find it in the file `/public/javascripts/game_state.js`.

## 3.3 WebSocket API

The API can be found in the `/design/API.md` file.



### Notes
1. Coordinate system: `col: (0-7), row: (0-7)`.
   (0, 0) is the bottom-left corner of the board.

### HTTP API

- POST `/api/create-game` - creates a new game.
  Request body:
  ```json
  {
    "settings": {}
  }
  ```
  Response body (in case of success):
  ```json
  {
    "gameId": "<game-id>",
    "playerId": "<player-id>"
  }
  ```

- POST `/api/join-game` - joins an existing game.
  Request body:
  ```json
  {
    "gameId": "<game-id>"
  }
  ```
  Response body (in case of success):
  ```json
  {
    "playerId": "<player-id>"
  }
  ```

#### General HTTP error response body
```json
{
  "message": "<message>"
}
```

### Websocket API

#### Messages Client->Server

- **Login** - must be sent by the client as the first message, lets the server know what game the client is in
  ```json
  {
    "type": "login",
    "playerId": "<player-id>"
  }
  ```

- **Move**
  ```json
  {
    "type": "move",
    "from": {
      "col": 1,
      "row": 1
    },
    "to": {
      "col": 2,
      "row": 2
    }
  }
  ```

#### Messages Server->Client

- **Welcome** - sent as the response to the `Login` message
  ```json
  {
    "type": "welcome",
    "sideId": <side-id>, // number, can have two values: 1 or 2
    "settings": {}
  }
  ```

- **GameState** - broadcasted to both players every time game state changes (including after every move),
  and also directly after `Welcome` message.
  ```json
  {
    "type": "game-state",
    "state": "<game-state>",
    "currentSideId": <side-id>, // included only in in-progress state
    "winnerSideId": <side-id> // included only in finished state
  }
  ```
  Possible game states:
   - `waiting-for-start` - before the second player joins
   - `in-progress` - while the game is in progress
   - `finished` - after the game is finished and the result is known


- **Move** - broadcasted to both players after a move is made;
  longer moves are sent as multiple Move messages
  ```json
  {
    "type": "move",
    "from": {
      "col": 1,
      "row": 1
    },
    "to": {
      "col": 3,
      "row": 3
    },
    "eatenPiece": { // sent only if a piece has been eaten
      "col": 2,
      "row": 2
    },
    "becameKing": true // sent only if a piece has been promoted to a king
  }
  ```

- **Error**
  ```json
  {
    "type": "error",
    "message": "Illegal move"
  }
  ```
