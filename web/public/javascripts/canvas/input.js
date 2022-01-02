function addGameIdInput(absCnvPos) {
    const input = document.createElement('input')

    input.id = 'gameID'
    input.type = 'text'

    setGameInputPos(input, absCnvPos)

    document.body.appendChild(input)
}

function setGameInputPos(input, absPagePos) {
    input.style.position = 'absolute'
    input.style.left = absPagePos.x + 'px'
    input.style.top = absPagePos.y + 'px'
    input.style.width = Math.floor(absPagePos.w) + 'px'
    input.style.height = Math.floor(absPagePos.h) + 'px'
}

function removeGameIdInput() {
    const input = document.getElementById('gameID')
    if (input) {
        input.remove()
        return true
    }
    return false
}

function getGameIdElem() {
    return document.getElementById('gameID')
}
function getGameIdInputTxt() {
    return getGameIdElem().value
}
function hideGameIdElem() {
    getGameIdElem().style.display = 'none'
}
function showGameIdElem() {
    getGameIdElem().style.display = 'block'
}
