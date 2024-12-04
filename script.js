let gridResolution = 64;
let isMouseDown = false;

document.body.addEventListener("mousedown", () => (isMouseDown = true));
document.body.addEventListener("mouseup", () => (isMouseDown = false));

function darkenCell(cell) {
    let currentColor = cell.style.backgroundColor || "rgba(0, 0, 0, 0)";
    let match = currentColor.match(/rgba\(0, 0, 0, ([\d.]+)\)/);

    if (match) {
        let opacity = parseFloat(match[1]);
        opacity = Math.min(opacity + 0.2, 1); 
        cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }
}

function addCellListeners(cell) {
    cell.addEventListener("mouseover", () => {
        if (isMouseDown) darkenCell(cell);
    });

    cell.addEventListener("click", () => {
        darkenCell(cell);
    });
    cell.addEventListener("mousedown", (event) => {
        event.preventDefault(); // This prevents browser trying to drag something, when drawing.
    })
}

function makeGrid(gridResolution) {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    const cellSize = container.clientWidth / gridResolution;

    for (let i = 0; i < gridResolution * gridResolution; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.width = `${cellSize}px`;
        gridCell.style.height = `${cellSize}px`;

        addCellListeners(gridCell);

        container.append(gridCell);
    }
}

makeGrid(gridResolution);