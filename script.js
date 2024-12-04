let gridResolution = 64;

const container = document.querySelector(".container");


function makeGrid(gridResolution) {
    container.innerHTML = "";

    const cellSize = container.clientWidth / gridResolution;

    for (let i = 0; i < gridResolution * gridResolution; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.width = `${cellSize}px`;
        gridCell.style.height = `${cellSize}px`;

        container.append(gridCell);
    }
}

makeGrid(gridResolution);
