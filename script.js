let gridResolution = 16;

const container = document.querySelector(".container");


function makeGrid(gridResolution) {
    container.innerHTML = "";

    const cellSize = container.clientWidth / gridResolution;

    for (let i = 0; i < gridResolution * gridResolution; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.width = `${cellSize}px`;
        gridCell.style.height = `${cellSize}px`;
        gridCell.style.boxSizing = "border-box";
        gridCell.style.border = "1px solid #ccc";

        container.append(gridCell);
    }
}

makeGrid(gridResolution);
