/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scroes, roundScore, activePlayer, dice;

init();

function diceRollFunc() {
		dice = Math.floor(Math.random() * 6) + 1;
		if (dice !== 1 ) {
			var diceDom = document.querySelector(".dice");
			diceDom.style.display = "block";
			diceDom.src = "dice-" + dice + ".png";
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
}

function btnHoldFunc() {
		scroes[activePlayer] += roundScore;
		document.querySelector("#score-" + activePlayer).textContent = scroes[activePlayer];
		if(scroes[activePlayer] > 20) {
			document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
			document.querySelector(".btn-roll")
			document.querySelector(".dice").style.display = "none";
			document.querySelector("#current-" + activePlayer).textContent = "0";
			document.querySelector(".btn-roll").removeEventListener("click", diceRollFunc);
			document.querySelector(".btn-hold").removeEventListener("click", btnHoldFunc);
			
		} else {
			nextPlayer();
		}
}

document.querySelector(".btn-new").addEventListener("click",function(){
	init();
});

function nextPlayer() {
	// Next Player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		document.querySelector("#current-0").textContent = "0";
		document.querySelector("#current-1").textContent = "0";
		roundScore = 0;
		document.querySelector(".player-0-panel").classList.toggle("active");
		document.querySelector(".player-1-panel").classList.toggle("active");
		document.querySelector(".dice").style.display = "none";
}

function init() {
	scroes = [0,0];
	roundScore = 0;
	activePlayer = 0;
	document.querySelector(".dice").style.display = "none";
	document.querySelector("#current-0").textContent = "0";
	document.querySelector("#current-1").textContent = "0";
	document.querySelector("#score-0").textContent = "0";
	document.querySelector("#score-1").textContent = "0";
	document.querySelector("#name-0").textContent = "Player 1";
	document.querySelector("#name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");

	document.querySelector(".btn-hold").addEventListener("click",btnHoldFunc);
	document.querySelector(".btn-roll").addEventListener("click",diceRollFunc)
}