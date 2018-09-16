
// NUM Guess Controller 

const numGuessController = (function () { 

    const randomNum  = function (min, max) { 
        return Math.floor(Math.random() * (max-min+1) + min);
     };
    const data = function () { 
        return {
            min: 1,
            max: 10,
            guessesLeft: 3
        };
     };

     return {
        getRandNum: function (min, max) { 
            return randomNum(min, max);
         },
         getData: function() {
            return data();
        }
     };

 })();

// UI controller 
const UIController = (function() { 
    let guessesLeft = 3;
    const DOMStrings = function () { 
        return {
            game: '#game',
            minNum: '.min-num',
            maxNum: '.max-num',
            guessBtn: '#guess-btn',
            guessInput: '.guess-input',
            message: '.message'
        };
     };

     return {
        getDOMStrings: function () { 
            return DOMStrings();
         },

         guessNum: function (data, winingNum) {
             
            const guessInput = parseInt(document.querySelector(DOMStrings().guessInput).value);
            
            if(isNaN(guessInput)  || guessInput > 10 || guessInput < 1) {
                this.setMessage(`Please enter a number between ${data.min} and ${data.max}`, 'red');
            } else {
                // Game Over - win
                if(guessInput === winingNum) {
                    this.gameOver(true, `${winingNum} is correct, YOU WIN!`);
                } else {
                  guessesLeft -= 1; 
                  console.log(data);
                    if( guessesLeft === 0) {
                         // Game Over - lost
                        this.gameOver(true, `Game Over, You lost. The Correct number was ${winingNum}`);
                    } else {
                         // Tell user its wrong number
                         this.setMessage(`${guessInput} is not correct, ${ guessesLeft} guess left`, 'red');
                    }

                   
                   
                }
            }
         },
         setMessage: function(message, color) {
            document.querySelector(DOMStrings().message).textContent = message;
            document.querySelector(DOMStrings().message).style.color = color;
         },
         gameOver: function(win, message) {
             let color;
             win === true ? color = 'green' : color = 'red';

             const guessInput = document.querySelector(DOMStrings().guessInput);

            //Disabled input
            guessInput.disabled = true;
            // Change border color 
            guessInput.style.borderColor = color;
            // Set Message 
            this.setMessage(message, color);

            // Play Again
            document.querySelector(DOMStrings().guessBtn).value = 'Play Again';
            document.querySelector(DOMStrings().guessBtn).className = 'play-again';

         }

     };

 })();

 // APP CONTROLLER
const appController = (function(UICtrl, numGuessCtrl) { 

    // Get DOM String class and ID
    const DOM = UICtrl.getDOMStrings();

    // Wining Number
    const min = numGuessCtrl.getData().min;
    const max = numGuessCtrl.getData().max;
    const winingNum = numGuessCtrl.getRandNum(min, max);

    // Event Listener 
    document.querySelector(DOM.guessBtn).addEventListener('click', guessNum);
    // Paly again event listener
    document.querySelector(DOM.game).addEventListener('mousedown', function (e) {  
        if(e.target.className === 'play-again') {
            window.location.reload();
        }
    });

    function guessNum() { 
        UICtrl.guessNum(numGuessCtrl.getData(),winingNum);
    }
    return {
        init: function() {
            console.log("App Started");
        }
    };

 })(UIController, numGuessController);

 appController.init();

