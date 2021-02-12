// THE STRUCTURE OF THE CODE/GAME:

// 1: If we click on the START/RESET button, then: 
// - if we are playing: reload page

// - if we are NOT playing, then: 
     // * set score to 0
     // *show countdown box
     // * reduce time by 1 sec in loops:
     //       --> if there is time left
                 // --> yes: continue
                 // --> no: show "game over" message and change button to "start game"
     // *change button text to "reset game"
     // * generate new question & answers

// 2: If we click on the ANSWER BOX, then:
//  - if we are playing: (yes)
//      * was the answer correct?

          // --> if yes, then:
             // * increase the score by 1
             // * show the correct box for 1 sec
             // * generate new Q&A

          // --> if no, then:
             // * show try again box for 1 sec


var playing = false; //(*) / we're in NO PLAY mode
var score; //we have to define it, it will have values that'll keep changing throughout the game
var action;
var timeremaining;
var correctAnswer;

// 1: If we click on the START/RESET button
document.getElementById("start-reset").onclick = 
    function() {
//     - if we are playing: yes or no: we need a boolean here, or a variable that we will set at the beinning of our code. when we will load our page, the var playing will be false by default(*) 
    if (playing == true) { //if playing is true, NOT if playing mode is true

         
/* reloading the page - rewritten since Codepen removed the location.reload() method */
   var reload = function() {
  		location.href = location.href;
    }
	setTimeout(reload, 10); 
        
    } else {//if we are not playing
        
        //change MODE TO PLAYING
        playing = true; //the page gets reloaded and has the default settings
        score = 0; //set the score to 0
        
	document.getElementById("score-value").innerHTML = score; //we need to access it in order to change the value of the score. if we don't, it'll always be the 0 written in the HTML file, in span
        
        
//document.getElementById("timeremaining").style.display = "block"; //to access the display property, we're gonna use .style.display. in order to show the element, we're gonna use set the display to block because in the HTML file it's set to display: none. so this segment is: SHOW COUNTDOWN BOX
        show("timeremaining");
        timeremaining = 60; //a timeremaining variable, needs to be defined in order to use it in function startCountdow
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide game over box
        hide("gameOver");
        
// *change button text to "reset game"
document.getElementById("start-reset").innerHTML = "Reset Game!";
        
        
//start countdown, we'll define the function at the end of the code, I don't understand why, tho
        startCountdown(); 
        
        //generate new question and answers:
        
        generateQA(); //we'll define the function at the end, here we are calling it 
        
    
    }
}

//clicking on the answer box
for (i=1;i<5;i++) {
    document.getElementById("box" + i).onclick = 
    function() {
        //check if we are playing
        if(playing == true) { //yes
            if(this.innerHTML == correctAnswer) {
                //this means that you caught the correct answer
                
                //increase score
                score++;
                
document.getElementById("score-value").innerHTML = score;
                
                //hide wrong box and correct box
                hide ("wrong");
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 1000);
                
                //generate new Q&A
                generateQA();
                
            } else {
                //wrong answer     
                hide("correct");
                show("wrong");
                setTimeout(function() {
                    hide("wrong");
                }, 1000);
            }
        } 
    }
}



//functions:

//1st: start counter:
function startCountdown() {
    action = setInterval(function() {
        timeremaining -= 1;  
        
document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0) {//game over
            stopCountdown();
            show("gameOver");
            
document.getElementById("gameOver").innerHTML = "<p>Game Over</p><p>Your score is: " + score + "</p>";
         hide("timeremaining"); 
         hide("correct");
         hide("wrong");
         playing = false;
         document.getElementById("start-reset").innerHTML = "Start Game";
        }
    }, 1000);
}
   
    
//2nd: stop counter:
function stopCountdown() {
    clearInterval(action);
}

//3rd: hide an element:
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}
    
//4th: show an element:
function show(Id) {
    document.getElementById(Id).style.display = "block";
} 
    
//5th: generate question and multiple answers
    
function generateQA() {
    var x = 1 + Math.round(9 * Math.random() );
    var y = 1 + Math.round(9 * Math.random() );
    correctAnswer = x*y;

document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random() );
    
document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    var answers = [correctAnswer];
        
    for(i=1; i<5; i++) {
        if(i != correctPosition) {
            var wrongAnswer; 
            do{ 
                wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9 * Math.random() )); //a wrong answer
                
                } while (answers.indexOf(wrongAnswer) > - 1 )
                
document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
    



