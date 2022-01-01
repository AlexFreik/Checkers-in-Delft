canvas.onmousemove = (event) => {
    const mousePos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.state) {
            if (elem.absCnvPos.isInside(mousePos.x, mousePos.y)) {
                elem.state = 'ON'
            } else {
                elem.state = 'OFF'
            }
        }
    }
    window.requestAnimationFrame(drawScreen)
}
canvas.onclick = (event) => {
    const mousePos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.onclick && elem.absCnvPos.isInside(mousePos.x, mousePos.y)) {
            elem.onclick(event)
            for (const fig of elem.figs) {
                if (fig.onclick) {
                    fig.onclick(event)
                }
            }
        }
    }
    requestAnimationFrame(drawScreen)
}
window.addEventListener('keydown', function (event) {
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.onkeydown) {
            elem.onkeydown(event)
        }
    }
    window.requestAnimationFrame(drawScreen)
})

// ===== stats processing =====
function processStats() {
    fetch('/data/stats.json')
        .then((res) => res.json())
        .then((data) => this.setCnvStats(data))
        .catch((e) => console.log(e))
}
function setCnvStats(stats) {
    homeScreenElems.titleDesc.figs[3].val += stats.inProgressGamesNum
    homeScreenElems.titleDesc.figs[4].val += stats.finishedGamesNum
    window.requestAnimationFrame(drawScreen)
}
window.onload = () => {
    processStats()
}
