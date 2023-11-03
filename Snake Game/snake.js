// JavaScript for Snake Game

// Snake Game JavaScript

const board = document.getElementById("board");
const foodsound = new Audio('./sound/eat.mp3');
const bumpsound = new Audio('./sound/bump.mp3');
const click = new Audio('./sound/ping.mp3');
const music = new Audio('./sound/music.mp3');

let speed = 10;
let lastPaintTime = 0;
let score = 0;
let hiScoreVal = 0; // Initialize hiScoreVal here

let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 3, y: 4 };
let inputDir = { x: 0, y: 0 };

// Game Loop
function main(ctime) {
    music.play();
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    } else {
        lastPaintTime = ctime;
        gameEngine();
    }
}

// Check if snake collides with itself or the wall
function isCollide(snakeArr) {
    if (snakeArr[0].x < 0 || snakeArr[0].y < 0 || snakeArr[0].x > 18 || snakeArr[0].y > 18) {
        return true;
    }
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    return false;
}

// Game logic
function gameEngine() {
    // Part 1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        bumpsound.play();
        music.pause();
        inputDir = { x: 0, y: 0 };
        let person = prompt("Please enter your name", "Harry Potter");
        let text;
        if (person == null || person == "") {
        text = 'Hello! User';
        } else {
        text = 'Hello! ' + person;
        }
        localStorage.setItem("person",JSON.stringify(text));
        window.location.href = "frontPage.html";
        snakeArr = [{ x: 13, y: 15 }];
        music.play();
        score = 0;
    }

    // After eating the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        foodsound.play();
        score += 10;
        if (score > hiScoreVal) {
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            // Define highestBox here if it wasn't previously defined
            const highestBox = document.getElementById("highestBox");
            highestBox.innerHTML = "HS: " + hiScoreVal;
        }
        // Define scoreBox here if it wasn't previously defined
        const scoreBox = document.getElementById("score");
        scoreBox.innerHTML = "Score: " + score;
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and food
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // Display the foodElement
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    // Display the score
    const scoreBox = document.getElementById("score");
    scoreBox.innerHTML = "Score: " + score;
}

// Start the game
const highestBox = document.getElementById("highestBox"); // Define highestBox
let hiScore = localStorage.getItem("hiScore");

if (hiScore !== null) {
    hiScoreVal = JSON.parse(hiScore);
    highestBox.innerHTML = "HS: " + hiScoreVal;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 };
    click.play();

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

