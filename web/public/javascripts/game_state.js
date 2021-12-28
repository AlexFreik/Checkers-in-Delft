const SCREEN_STATES = {
    HOME: 0,
    INSIDE_GAME: 1,
}
function Game() {
    this.screen = SCREEN_STATES.HOME
}

const game = new Game()