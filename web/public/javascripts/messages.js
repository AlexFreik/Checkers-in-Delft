;(function (exports) {

    // From a player to server
    exports.MOVE = {
        type: 'MOVE',
        from: {
            x: -1,
            y: -1,
        },
        to: {
            x: -1,
            y: -1,
        },
    }
})(typeof exports === 'undefined' ? (this.Messages = {}) : exports)
