/**
 * Processes http request
 * @param {String} endpoint
 * @param {Object} req
 * @param {function} callback
 */
function processReq(endpoint, req, callback) {
  let status
  fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => {
      status = res.status
      return res.json()
    })
    .then((res) => callback(status, res, req))
    .catch((e) => console.log(e))

}
/* ==== creating new game ==== */
function processCreateGameEvent() {
  processReq('/api/create-game', getGameSettingsInput(), createGame)
}
/**
 *
 * @param {number} status
 * @param {{gameId: string, playerId: string}} data
 */
function createGame(status, data) {
  if (status === 200) {
    game = new Game(data.gameId, data.playerId)
    websocket = initFrontendWS()
  }
}
/**
 * @return {{forceJumps: boolean}}
 */
function getGameSettingsInput() {
  return {
    //forceJumps: createGameScreenElems.forceJumpsChoseBtn.figs[1].val === 'ON',
  }
}

/* ==== joining game ==== */
/**
 *
 * @param {string} gameId
 */
function processJoinGameEvent(gameId) {
  processReq('/api/join-game', { gameId: gameId }, joinGame)
}

/**
 *
 * @param {number} status
 * @param {{playerId: string, message: string}} data
 * @param {Object} req
 */
function joinGame(status, data, req) {
  if (status === 400) {
    hideGameIdElem()
    currScreenElems.alertMsg = new AlertMsg('Error', data.message, showGameIdElem)
  } else if (status === 200) {
    game = new Game(req.gameId, data.playerId)
    websocket = initFrontendWS()
    removeGameIdInput()
  }
  window.requestAnimationFrame(drawScreen)
}
