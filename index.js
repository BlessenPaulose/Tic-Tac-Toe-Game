// Select DOM elements
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");
const xPlayerDisplay = document.getElementById("xPlayerDisplay");
const oPlayerDisplay = document.getElementById("oPlayerDisplay");
const titleHeader = document.getElementById("titleHeader");

let board = Array(9).fill(null); // Represents the board (3x3 grid)
let gameActive = true;
let currentPlayer = "X"; // Default player (can be switched by selection)
let userPlayer = null; // To keep track of the user selected player

function selectPlayer(player) {
    if (!gameActive) return;

    userPlayer = player; // Set the selected player
    currentPlayer = player === "X" ? "X" : "O"; // Set initial current player
    document.getElementById("titleHeader").textContent = `You are ${player}`;

    document.getElementById("xPlayerDisplay").classList.remove("player-active");
    document.getElementById("oPlayerDisplay").classList.remove("player-active");

    if (player === "X") {
        document.getElementById("xPlayerDisplay").classList.add("player-active");
    } else {
        document.getElementById("oPlayerDisplay").classList.add("player-active");

    }

    if (player === "O") {
        // If user selects O, automatically make "X" play the first move
        computerPlay();
    }
}

function handleCellClick(index) {
    if (!gameActive || board[index] !== null) return;

    // Update the board
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;

    // Check for a winner
    if (checkWinner(currentPlayer)) {
        document.getElementById("titleHeader").textContent = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (board.every(cell => cell !== null)) {
        document.getElementById("titleHeader").textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("titleHeader").textContent = `You are ${currentPlayer}`;

    if (currentPlayer === "O" && userPlayer !== "O") {
        // If it's the computer's turn to play as O, simulate a move
        setTimeout(computerPlay, 500);
    }
}

function computerPlay() {
    // Find available cells (cells that are null)
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === null) {
            availableCells.push(index);
        }
    });

    if (availableCells.length === 0) return;

    // Pick a random available cell
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    handleCellClick(randomIndex); // Call handleCellClick for the computer's move
}

function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // First column
        [1, 4, 7], // Second column
        [2, 5, 8], // Third column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6], // Diagonal top-right to bottom-left
    ];

    // return winningCombos.some(combo => {
    //     const [a, b, c] = combo;
    //     return board[a] === player && board[b] === player && board[c] === player;
    // });
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === player && board[b] === player && board[c] === player) {
            document.getElementById("titleHeader").textContent = `${player} Wins! 🎉`;
            document.getElementById("titleHeader").style.color = "green"; // Set title color to green
            
            gameActive = false;
            return true;
        }
    }
    if (board.every(cell => cell !== null)) {
        document.getElementById("titleHeader").textContent = "It's a Draw! 🤝";
        document.getElementById("titleHeader").style.color = "yellow"; // Set title color to yellow
        
        gameActive = false;
        return false;
    }

    return false;
}



function restartGame() {
    // Reset the board state
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = "X"; // Default to player X starting

    // Reset the UI elements
    document.getElementById("titleHeader").textContent = "Choose";
    
    Array.from(document.getElementsByClassName("cell")).forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("bg-gray-300", "active:bg-gray-400"); // Reset any active styles
    });

    // Reset the player indicators (X or O)
    document.getElementById("xPlayerDisplay").classList.remove("player-active");
    document.getElementById("oPlayerDisplay").classList.remove("player-active");

    // Set default player as active (user hasn't chosen yet)
    document.getElementById("xPlayerDisplay").classList.add("player-active");
    document.getElementById("oPlayerDisplay").classList.remove("player-active");

    // Re-enable player selection
    userPlayer = null;
    currentPlayer = "X";
}


