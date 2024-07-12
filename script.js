console.log("Welcome to the game.");

//adding audios 
let won=new Audio("gameover.mp3");
let lost= new Audio("over.mp3");
let click= new Audio("click.mp3");
let music= new Audio("music.mp3");
music.volume=0.5;
click.volume=0.9;
//initialising the turn variable with 'X'
let turn="X";

let boxes=document.querySelectorAll(".box");
let isgameover=false;

//function to check the winning combinations
const checkWin=()=>{
    let wins=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
    ]
    wins.forEach((e)=>{
        if(boxes[e[0]].innerText===boxes[e[1]].innerText && boxes[e[1]].innerText===boxes[e[2]].innerText && boxes[e[0]].innerText!=="")
        {
            music.pause();
            isgameover=true;
            document.querySelector(".text").innerText=boxes[e[0]].innerText+" Won!";
            won.play();
            document.querySelector(".image").getElementsByTagName("img")[0].style.width="200px";
        }
    })
    //check for the draw
    if (isgameover==false) {
        let isDraw = true;
        for (let i = 0; i < boxes.length; i++) {
          if (boxes[i].innerText === "") {
            isDraw = false;
            break;
          }
        }
        if (isDraw==true) {
          music.pause();
          isgameover = true;
          document.querySelector(".text").innerText = "It's a Draw!";
          lost.play();
        }
}};


//function to change the turn
const changeTurn=()=>{
    return turn==="X"?"O":"X";
};


//game logic
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(isgameover==true)
        {
            return; // to ignore click is the game is over
        }
    if(box.innerText==="")
    {
        music.play();
        box.innerText=turn;
        turn=changeTurn();
        click.play();
        checkWin();
        if(isgameover==false){
        document.querySelector(".text").innerText="Turn of "+turn;}
    }});
});

//reset button
let reset=document.querySelector(".reset-btn");
reset.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        music.pause();
    })
    turn="X";
    isgameover=false;
    document.querySelector(".text").innerText="Turn for "+turn;
    document.querySelector(".image").getElementsByTagName("img")[0].style.width="0px";
});

