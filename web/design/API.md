# API

## Notes
1. Coordinate system: `col: (0-7), row: (0-7)`

## HTTP API

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
    "playerToken": "<token-value>"
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
    "playerToken": "<token-value>"
  }
  ```
  
### General HTTP error response body
```json
{
  "message": "<message>"
}
```

## Websocket API

### Messages Client->Server

- **Login** - must be sent by the client as the first message, lets the server know what game the client is in
  ```json
  {
    "type": "login",
    "playerToken": "<token-value>"
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

- **Surrender**
  ```json
  {
    "type": "surrender"
  }
  ```

### Messages Server->Client

- **Welcome** - sent as the response to the `Login` message
  ```json
  {
    "type": "welcome",
    "side": 2,
    "settings": {}
  }
  ```
  `Side` can have two values: 1 or 2.


- **GameState** - broadcasted to both players every time game state changes (including after every move),
  and also directly after `Welcome` message.
  ```json
  {
    "type": "game-state",
    "state": "<game-state>",
    "currentPlayer": "<player-id>", // included only in in-progress state
    "winnerId": "<player-id>" // included only in finished state
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
    }
  }
  ```

- **Error**
  ```json
  {
    "type": "error",
    "message": "Illegal move"
  }
  ```
