var boxColours=["green","red","yellow","blue"];
var gamePattern=[];
var userPattern=[];
var level=0;
var started=false;

$(document).on("keydown",function(){
    if(!started){
        gameStart();
    }
});

function gameStart(){
    started=true;
    level=0;
    gamePattern=[];
    userPattern=[];
    nextSequence();
    
}

function genRandomColour(){
    var randomNo =Math.floor(Math.random()*4);
    return boxColours[randomNo];
}
function pressColour(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function()  {
        $("#"+colour).removeClass("pressed");    
    }, 200);
}
function playSound(colour){
    var audio = new Audio("./sounds/"+colour+".mp3");
    audio.play();
}
function nextSequence(){
    userPattern=[];
    var randomColour=genRandomColour();
    gamePattern.push(randomColour);
    pressColour(randomColour);
    playSound(randomColour);
    level++;
    $("#level-title").text("Level "+level);
}

function gameOver(){
    started=false;
    $("#level-title").text("Game over, Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function()  {
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
}

function matchUser(i){
    if(gamePattern[i]===userPattern[i]){
        pressColour(userPattern[i]);
        playSound(userPattern[i]);
        if(i===gamePattern.length-1){
            setTimeout(function()  {
                nextSequence();
            }, 1000);
        }
    }
    else{
        gameOver(); 
    }
}

$(".btn").on("click",function(){
    var userColour= $(this).attr("id");
    userPattern.push(userColour);
    matchUser(userPattern.length-1);   
});