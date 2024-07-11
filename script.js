let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetButton");
let newGameBtn = document.querySelector("#newButton");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnBox = document.querySelector(".bg");
let turnx = true;
let count = 0;

const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


const resetGame = () => {
    turnx = true;
    enableAllGrids();
    msgContainer.classList.add("hide");
    count = 0;
    document.querySelector(".bg").style.left = "0px";
    boxes.forEach((box)=>{
        box.classList.remove("winbg");
    })
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const showTie = () => {
    msg.innerText = `This game was a Tie`;
    msgContainer.classList.remove("hide");
}

const ReturnWinner = () => {
    count++;
    console.log(count);
    for(let pattern of winningPatterns){
        let gridPos1Val = boxes[pattern[0]].innerHTML;
        let gridPos2Val = boxes[pattern[1]].innerHTML;
        let gridPos3Val = boxes[pattern[2]].innerHTML;
        
        if(gridPos1Val != "" && gridPos2Val != "" && gridPos3Val != ""){
            if(gridPos1Val === gridPos2Val && gridPos2Val === gridPos3Val){
                boxes[pattern[0]].classList.add("winbg");
                boxes[pattern[1]].classList.add("winbg");
                boxes[pattern[2]].classList.add("winbg");
                console.log("winner", gridPos1Val);
                showWinner(gridPos1Val);
                disableAllGrids();
                break;
            }
            else if(count==9){
                showTie();
            }
        }
    }
}

const disableAllGrids = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableAllGrids = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box was clicked")
        if(turnx){
            box.classList.add("boxX");
            box.classList.remove("boxO");
            box.innerHTML = "X";
            turnx=false;
            document.querySelector(".bg").style.left = "85px";
        }
        else{
            box.classList.add("boxO");
            box.classList.remove("boxX");
            box.innerHTML = "O";
            turnx=true;
            document.querySelector(".bg").style.left = "0px";
        }
        console.log(box);
        box.disabled = true;
        
        ReturnWinner();
    })
})


newGameBtn.addEventListener("click",resetGame);
resetButton.addEventListener("click",resetGame);