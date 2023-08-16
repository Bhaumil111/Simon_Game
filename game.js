
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var lev = 0;

$("body").keypress(function () {
    if (!started) {
        $("h1").text("level " + lev);
        nextSequence();
        started = true;
    }
    

}); 

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);
});





function nextSequence() {
    userClickedPattern = [];
    lev++;
    $("h1").text("level " + lev);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    // console.log(randomChosenColour);
    console.log(gamePattern);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // var lev;
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        var body = $("body")
        body.addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        setTimeout(() => {
            body.removeClass("game-over");
        }, 1000);
        startOver();

    }


}
function startOver(){
    gamePattern = [];
    lev = 0; 
    // $("h1").text("level " + lev);
    started = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentkey) {
    var currentColor = document.querySelector("." + currentkey);
    currentColor.classList.add("pressed");
    setTimeout(() => {
        currentColor.classList.remove("pressed");
    }, 100);

}
