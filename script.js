let gridResolution = 32;
let isMouseDown = false;
let currentMode = "sketch";

const resolutionDisplay = document.getElementById("resolutionDisplay");
const resolutionSlider = document.getElementById("resolutionSlider");

document.body.addEventListener("mousedown", () => (isMouseDown = true));
document.body.addEventListener("mouseup", () => (isMouseDown = false));

document.getElementById("rainbow-btn").addEventListener("click", setRainbowMode);
document.getElementById("sketch-btn").addEventListener("click", setSketchMode);
document.getElementById("clear-btn").addEventListener("click", clearGrid);
resolutionSlider.addEventListener("input", updateResolution);

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenCell(cell) {
    let currentColor = cell.style.backgroundColor || "rgba(0, 0, 0, 0)";
    let match = currentColor.match(/rgba\(0, 0, 0, ([\d.]+)\)/);

    if (match) {
        let opacity = parseFloat(match[1]);
        opacity = Math.min(opacity + 0.2, 1);
        cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    } else {
        cell.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    }
}

function applyMode(cell) {
    if (currentMode === "rainbow") {
        cell.style.backgroundColor = getRandomColor();
    } else if (currentMode === "sketch") {
        darkenCell(cell);
    }
}

function addCellListeners(cell) {
    cell.addEventListener("mouseover", () => {
        if (isMouseDown) applyMode(cell);
    });

    cell.addEventListener("click", () => {
        applyMode(cell);
    });

    cell.addEventListener("mousedown", (event) => {
        event.preventDefault(); // Prevent the mouse from trying to drag something when drawing
    });
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
    updateResolutionDisplay();
}

function updateResolutionDisplay() {
    resolutionDisplay.textContent = `${gridResolution}x${gridResolution}`;
}

function setRainbowMode() {
    currentMode = "rainbow";
}

function setSketchMode() {
    currentMode = "sketch";
}

function clearGrid() {
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });
}

function updateResolution(event) {
    gridResolution = parseInt(event.target.value, 10);
    makeGrid(gridResolution);
}

makeGrid(gridResolution);