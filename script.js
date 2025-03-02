const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer, gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();

//Let's create a function to initialise the game
function initGame()
{
    currentPlayer = "X";
    //changes the internal logic
    gameGrid = ["","","","","","","","",""];
    //changes the UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//Click listners for all grid boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);

//Swaps players turn and updates the UI
function swapTurn()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }
    //UI Updation
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver()
{
    let answer = "";
    winningPositions.forEach((position) => {
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
    && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
    {
        //check if winner is X
        if(gameGrid[position[0]] === "X")
            answer = "X";
        else
            answer = "O";
        
        //Diable pointer events
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
    });

    if(answer !== "")
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //Check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        {
            fillCount++;
        }
    })

    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        //Update Value on UI
        boxes[index].innerText = currentPlayer;
        //Update internal logic
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //Swap Turn
        swapTurn();
        //Win check
        checkGameOver();
    }
}

