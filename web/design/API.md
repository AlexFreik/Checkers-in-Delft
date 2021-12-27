# API

## Notes
1. Coordinate system: `x: (0-7), y: (0-7)`

## Websocket API

### Messages Client->Server

1. Move
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

2. Surrender
```json
{
  "type": "surrender"
}
```

### Messages Server->Client

1. Move - broadcasted to both players after a move is made
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
2. Error
```json
{
  "type": "error",
  "message": "Illegal move"
}
```