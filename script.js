// script.js

// Generate the Sudoku grid
function generateGrid() {
    const table = document.getElementById("sudoku-grid");

    for (let row = 0; row < 9; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < 9; col++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("min", "1");
            input.setAttribute("max", "9");
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

// Check if placing a number in a cell is valid
function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] == num || grid[i][col] == num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] == num) {
                return false;
            }
        }
    }

    return true;
}

// Solve the Sudoku using backtracking
function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] == 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Read the grid from the input fields
function getGrid() {
    const grid = [];
    const rows = document.querySelectorAll("tr");
    rows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("input").forEach((input) => {
            rowData.push(input.value ? parseInt(input.value) : 0);
        });
        grid.push(rowData);
    });
    return grid;
}

// Write the solved grid to the input fields
function setGrid(grid) {
    const rows = document.querySelectorAll("tr");
    rows.forEach((row, rowIndex) => {
        row.querySelectorAll("input").forEach((input, colIndex) => {
            input.value = grid[rowIndex][colIndex] || "";
        });
    });
}

// Handle the solve button click
document.getElementById("solve-button").addEventListener("click", () => {
    const grid = getGrid();
    if (solveSudoku(grid)) {
        setGrid(grid);
    } else {
        alert("No solution exists!");
    }
});

// Initialize the grid when the page loads
window.onload = generateGrid;
