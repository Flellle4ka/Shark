document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const resetButton = document.querySelector('.reset-button');
    const playButton = document.querySelector('.play-button');
    let dotsCount = 0;
    let numRows = 8;

    function initializeBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < numRows; i++) {
            const newRow = document.createElement('div');
            newRow.className = 'row';
            for (let j = 0; j < 6; j++) {
                const newSquare = document.createElement('div');
                newSquare.className = 'square';
                newRow.appendChild(newSquare);
            }
            gameBoard.appendChild(newRow);
        }
    }

    resetButton.addEventListener('click', () => {
        document.getElementById('reset-sound').play();
        clearAllSquares();
        dotsCount = 0;
    });

    playButton.addEventListener('click', () => {
        if (dotsCount >= 15) {
            showNotification();
            return;
        }

        if (dotsCount < numRows) {
            document.getElementById('click-sound').play();
            placeDot(dotsCount);
        } else {
            document.getElementById('click-sound').play();
            removeRowWithDot();
            addRowWithDot();
        }
        dotsCount++;
        maintainRowCount();
    });

    function placeDot(rowNumber) {
        const rows = Array.from(gameBoard.querySelectorAll('.row'));
        const squares = rows[numRows - 1 - rowNumber].querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);
        squares[randomSquare].classList.add('active');
        setTimeout(() => {
            squares[randomSquare].style.opacity = '1'; // Убедитесь, что это свойство управляется CSS
        }, 100); // Задержка для начала анимации
    }


    function addRowWithDot() {
        const newRow = document.createElement('div');
        newRow.className = 'row';
        for (let i = 0; i < 6; i++) {
            const newSquare = document.createElement('div');
            newSquare.className = 'square';
            newRow.appendChild(newSquare);
        }
        gameBoard.insertBefore(newRow, gameBoard.firstChild);
        placeDotInNewRow(newRow);
    }

    function placeDotInNewRow(newRow) {
        const squares = newRow.querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);
        squares[randomSquare].classList.add('active');
    }

    function removeRowWithDot() {
        gameBoard.removeChild(gameBoard.lastChild);
    }

    function maintainRowCount() {
        while (gameBoard.children.length > numRows) {
            gameBoard.removeChild(gameBoard.lastChild);
        }
    }

    function clearAllSquares() {
        const squares = gameBoard.querySelectorAll('.square');
        squares.forEach(square => square.classList.remove('active'));
    }

    function adjustOrientation() {
        if (window.matchMedia('(min-aspect-ratio: 16/9)').matches) {
            numRows = 8;
        } else {
            numRows = 5;
        }
        initializeBoard();
        clearAllSquares();
        dotsCount = 0;
    }

    window.addEventListener('resize', adjustOrientation);
    adjustOrientation();
});
function showNotification() {
    document.getElementById('not-sound').play();
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.style.top = '10%';
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.top = '20%';
    }, 10);
}

function closeNotification() {
    document.getElementById('cl-sound').play();
    const notification = document.getElementById('notification');
    notification.style.opacity = '0';
    notification.style.top = '10%';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 500);
}
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-background', {
        height: '100%',
        width: '100%',
        videoId: 'ppt39XycwW4', // Замените YOUR_VIDEO_ID на ID вашего видео
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'ppt39XycwW4', // Требуется для зацикливания видео
            controls: 0,
            rel: 0, // Не показывать другие видео после окончания воспроизведения
            showinfo: 0,
            modestbranding: 1,
            mute: 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.mute(); // Убедитесь, что видео воспроизводится без звука
    event.target.playVideo();
}
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.reset-button, .play-button');

    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.classList.add('button-pressed');
        });
        button.addEventListener('touchend', () => {
            button.classList.remove('button-pressed');
        });
    });
});
