# API

## Notes
1. Coordinate system: `x: (0-7), y: (0-7)`

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
      "x": 1,
      "y": 1
    },
    "to": {
      "x": 2,
      "y": 2
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


- **GameState** - broadcasted to both players every time game state changes, and also after `Welcome` message.
  ```json
  {
    "type": "game-state",
    "state": "<game-state>"
  }
  ```
  Possible game states:
  - `waiting-for-start` - before the second player joins
  - `in-progress` - while the game is in progress
  - `finished` - after the game is finished and the result is known
  - `abandoned` - after one of the players surrenders


- **Move** - broadcasted to both players after a move is made
  ```json
  {
    "type": "move",
    "from": {
      "x": 1,
      "y": 1
    },
    "to": {
      "x": 2,
      "y": 2
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
