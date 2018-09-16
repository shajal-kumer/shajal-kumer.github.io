/*
GAME FUNCTION
- Player must guess a number betweer a min and max
- Palyer gets a certain amount og guesses
- Notify player of guess remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/


/// Game values

let min = 1,
    max = 10,
    winingNum = getRandomNum(min, max),
    guessesLeft = 3;

// UL Element
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('.guess-input'),
      message = document.querySelector('.message');

// Assign the UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Paly again event listener
game.addEventListener('mousedown', function (e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
  })

// Listen for guess
guessBtn.addEventListener('click', function(){
   
    let guess = parseInt(guessInput.value);
    // Validate
    if(isNaN(guess) || guess < 1 || guess > 10) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    } else {

    // Check if won
    if(guess === winingNum) {
        // Game Over - win
        gameOver(true, `${winingNum} is correct, YOU WIN!`);

         // Take the all bellow code in a function

        // // Disabled input
        // guessInput.disabled = true;
        // //Change border color
        // guessInput.style.borderColor = 'green';
        // // Set message
        // setMessage(`${winingNum} is correct, YOU WIN!`, 'green');
    } else {
        // Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0 ) {
            // Game Over - lost
            gameOver(false, `Game Over, You lost. The Correct number was ${winingNum}`);

            // Take the all bellow code in a function

            // //Disabled input
            // guessInput.disabled = true;
            // // Change border color 
            // guessInput.style.borderColor = 'red';
            // // Set Message 
            // setMessage(`Game Over, You lost. The Correct number was ${winingNum}`, 'red');
        } else {
            // Game Continues - answer wrong

            // Change border color 
            guessInput.style.borderColor = 'red';
            // Clear Input 
            guessInput.value = '';
            // Tell user its wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guess left`, 'red');
        }
    }
}
})


// Game Over Function

function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';

    //Disabled input
    guessInput.disabled = true;
    // Change border color 
    guessInput.style.borderColor = color;
    // Set Message 
    setMessage(msg, color);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again';
}

// getRandomNum
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}


// SET Message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}