let GRID_WIDTH = 70;
let FRAME_RATE = 2;

let cellSize = window.innerWidth / GRID_WIDTH;
let GRID_HEIGHT = window.innerHeight / cellSize;
let msPerFrame = 1000 / FRAME_RATE;


let leftClick = false;
let rightClick = false;

function init() {
    cellSize = window.innerWidth / GRID_WIDTH;
    GRID_HEIGHT = window.innerHeight / cellSize;
    msPerFrame = 1000 / FRAME_RATE;
    render();
}
window.onresize = init;
// Create the application
let app = new PIXI.Application({ resizeTo: window });
let graphics = new PIXI.Graphics();
document.body.appendChild(app.view);
app.stage.addChild(graphics);


let paused = false;
let gameTime = 0;


document.addEventListener("DOMContentLoaded", function() {
    // Listen for animate update
    app.ticker.add(function(delta) {
        // Limit to the frame rate
        var timeNow = (new Date()).getTime();
        var timeDiff = timeNow - gameTime;

        frame(delta);

        if (timeDiff < msPerFrame || paused)
            return;

        // We are now meeting the frame rate, so reset the last time the animation is done
        gameTime = timeNow;
        update();
    });
});


class Mouse {
    left = false;
    right = false;
    pos = [0, 0];
    posAtStartOfRightClick = [0, 0];
    posAtStartOfLeftClick = [0, 0];
}

let mouse = new Mouse();

graphics.interactive = true;
graphics.hitArea = app.renderer.screen;

graphics.on('mousemove', (e) => {
    mouse.pos = [e.data.global.x, e.data.global.y];
});
graphics.on('mousedown', (e) => {
    mouse.left = true;
    mouse.posAtStartOfLeftClick = mouse.pos;
});
graphics.on('rightdown', (e) => {
    mouse.right = true;
    mouse.posAtStartOfRightClick = mouse.pos;
});
graphics.on('mouseup', (e) => {
    mouse.left = false;
});
graphics.on('rightup', (e) => {
    mouse.right = false;
});
window.addEventListener('wheel', (e) => {
    GRID_WIDTH = Math.max(GRID_WIDTH + e.deltaY / 100, 5);
    cellSize = window.innerWidth / GRID_WIDTH;
    GRID_HEIGHT = window.innerHeight / cellSize;
    render();
})
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})