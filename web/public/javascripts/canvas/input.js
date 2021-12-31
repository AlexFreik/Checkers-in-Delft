function addGameIdInput(pos) {
    const input = document.createElement('input')

    input.id = 'gameID'
    input.type = 'text'
    input.style.position = 'absolute'
    input.style.left = pos.x + 'px'
    input.style.top = pos.y + 'px'
    input.style.width = Math.floor(pos.w) + 'px'
    input.style.height = Math.floor(pos.h) + 'px'

    input.style.background = 'rgba(0,0,0,0)'
    input.style.color = '#eee'
    input.style['font-size'] = '25px'

    document.body.appendChild(input)
}

function removeGameIdInput() {
    const input = document.getElementById('gameID')
    if (input) {
        input.remove()
        return true
    }
    return false
}
