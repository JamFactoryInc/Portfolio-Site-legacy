let cameraPos = [0, 0];

function screenToGrid(x, y) {
    return [Math.floor(((cameraPos[0] - GRID_WIDTH / 2) * cellSize + x) / cellSize), Math.floor(((cameraPos[1] - GRID_HEIGHT / 2) * cellSize + y) / cellSize)];
}

function coord(x, y) {
    return x + ',' + y;
}

var cells = {};

function addCell(x, y) {
    cells[coord(x, y)] = 1;
}

function remCell(x, y) {
    delete cells[coord(x, y)];
}

function countSurrounding(x, y) {
    let count = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let cell = NaN;
            count += (cell = cells[coord(x + i, y + j)]) && !(i === 0 && j === 0) ? cell : 0;
        }
    }
    return count;
}

function getSurrounding(x, y) {
    let surrounding = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            surrounding.push([x + i, y + j]);
        }
    }
    return surrounding;
}

function calcNew() {
    newCells = {};
    // foreach cell
    Object.keys(cells).forEach((pos) => {
        pos = pos.split(',').map((num) => parseInt(num));
        // for all its surrounding squares
        getSurrounding(pos[0], pos[1]).forEach((pos) => {
            surrounding = countSurrounding(pos[0], pos[1]);
            if (surrounding === 2 || surrounding === 3) {
                if (cells[coord(pos[0], pos[1])] || surrounding === 3) {
                    newCells[coord(pos[0], pos[1])] = 1;
                }
            }
        });
    });
    cells = newCells;
}


for (let i = Math.round(-GRID_WIDTH / 2); i < GRID_WIDTH / 2; i++) {
    for (let j = Math.round(-GRID_HEIGHT / 2); j < GRID_HEIGHT; j++) {
        if (Math.random() < 0.5)
            addCell(i, j);
    }
}

function update() {
    calcNew();
    render();
}

let camPosBefore = cameraPos;

function frame() {
    if (mouse.left) {
        pos = screenToGrid(mouse.pos[0], mouse.pos[1]);
        addCell(pos[0], pos[1]);
        render();
    }
    if (mouse.right) {
        cameraPos = [camPosBefore[0] + (mouse.posAtStartOfRightClick[0] - mouse.pos[0]) / cellSize,
            camPosBefore[1] + (mouse.posAtStartOfRightClick[1] - mouse.pos[1]) / cellSize
        ]
        render();
    } else {
        camPosBefore = cameraPos;
    }
}

function render() {
    graphics.clear();
    graphics.beginFill(0xFFFFFF);

    Object.keys(cells).forEach((pos) => {
        pos = pos.split(',').map((num) => parseInt(num));
        graphics.drawRect(
            pos[0] * cellSize - cameraPos[0] * cellSize + GRID_WIDTH * cellSize / 2,
            pos[1] * cellSize - cameraPos[1] * cellSize + GRID_HEIGHT * cellSize / 2,
            cellSize,
            cellSize);
    });
}