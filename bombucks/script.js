document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const playButton = document.querySelector('.play-button');
    const resetButton = document.querySelector('.reset-button');
    const fieldSelect = document.getElementById('fieldSelect');
    let dotsCount = 0;
    let numRows = 5;
    let numCols = 6;
    let maxDots = 15;
    let squareSize = 52;

    function initializeBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < numRows; i++) {
            const newRow = document.createElement('div');
            newRow.className = 'row';
            for (let j = 0; j < numCols; j++) {
                const newSquare = document.createElement('div');
                newSquare.className = 'square';
                newSquare.style.width = `${squareSize}px`;
                newSquare.style.height = `${squareSize}px`;

                const neonCircle = document.createElement('div');
                neonCircle.className = 'neon-circle';
                newSquare.appendChild(neonCircle);

                newRow.appendChild(newSquare);
            }
            gameBoard.appendChild(newRow);
        }
        updateSelectAndButtonWidth();
    }
    function triggerHapticFeedback() {
            if (window.Telegram && window.Telegram.WebApp.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
            }
        }

    function updateBoardSize() {
        triggerHapticFeedback();
        const rowWidth = squareSize * numCols + (numCols - 1) * 2.7;
        gameBoard.style.width = `${rowWidth}px`;
        updateSelectAndButtonWidth();
    }

    function updateSelectAndButtonWidth() {
        const firstRow = gameBoard.querySelector('.row');
        if (firstRow) {
            const firstRowWidth = firstRow.offsetWidth;
            fieldSelect.style.width = `${firstRowWidth}px`;
            playButton.style.width = `${firstRowWidth}px`;
            resetButton.style.width = `${firstRowWidth}px`;
        }
    }

    function placeDot(rowNumber) {
        triggerHapticFeedback();
        const rows = Array.from(gameBoard.querySelectorAll('.row'));
        const squares = rows[numRows - 1 - rowNumber].querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);

        const neonCircle = squares[randomSquare].querySelector('.neon-circle');
        neonCircle.style.opacity = 1;
    }

    function addRowWithDot() {
        triggerHapticFeedback();
        const newRow = document.createElement('div');
        newRow.className = 'row';
        for (let i = 0; i < numCols; i++) {
            const newSquare = document.createElement('div');
            newSquare.className = 'square';
            newSquare.style.width = `${squareSize}px`;
            newSquare.style.height = `${squareSize}px`;

            const neonCircle = document.createElement('div');
            neonCircle.className = 'neon-circle';
            newSquare.appendChild(neonCircle);

            newRow.appendChild(newSquare);
        }
        gameBoard.insertBefore(newRow, gameBoard.firstChild);
        placeDotInNewRow(newRow);
        updateSelectAndButtonWidth();
    }

    function placeDotInNewRow(newRow) {
        const squares = newRow.querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);

        const neonCircle = squares[randomSquare].querySelector('.neon-circle');
        neonCircle.style.opacity = 1;
    }

    function removeRowWithDot() {
        gameBoard.removeChild(gameBoard.lastChild);
        updateSelectAndButtonWidth();
    }

    function maintainRowCount() {
        while (gameBoard.children.length > numRows) {
            gameBoard.removeChild(gameBoard.lastChild);
        }
    }

    function clearAllSquares() {
        const circles = gameBoard.querySelectorAll('.neon-circle');
        circles.forEach(circle => circle.style.opacity = 0);
    }

    resetButton.addEventListener('click', () => {
        triggerHapticFeedback();
        clearAllSquares();
        dotsCount = 0;
    });

    playButton.addEventListener('click', () => {
        if (dotsCount >= maxDots) {
            alert('Game end!');
            return;
        }

        if (dotsCount < numRows) {
            placeDot(dotsCount);
        } else {
            removeRowWithDot();
            addRowWithDot();
        }
        dotsCount++;
        maintainRowCount();
    });

    fieldSelect.addEventListener('change', () => {
        const selectedField = fieldSelect.value;
        if (selectedField === "6x15") {
            numRows = 5;
            numCols = 6;
            maxDots = 15;
            squareSize = 52;
        } else if (selectedField === "3x6") {
            numRows = 3;
            numCols = 3;
            maxDots = 6;
            squareSize = 70;
        } else if (selectedField === "2x3") {
            numRows = 2;
            numCols = 2;
            maxDots = 3;
            squareSize = 90;
        } else if (selectedField === "4x9") {
            numRows = 4;
            numCols = 4;
            maxDots = 9;
            squareSize = 65;
        } else if (selectedField === "5x12") {
            numRows = 5;
            numCols = 5;
            maxDots = 12;
            squareSize = 60;
        }
        initializeBoard();
        updateBoardSize();
        clearAllSquares();
        dotsCount = 0;
    });

    window.addEventListener('resize', () => {
        updateBoardSize();
    });

    initializeBoard();
    updateBoardSize();
});

// Анимация белых точек
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initParticles();
animateParticles();

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault(); // Отключаем стандартное поведение при мультитач событиях
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); // Отключаем двойное нажатие
    }
    lastTouchEnd = now;
}, false);
