const btnStartMenu = document.querySelector('.btnstart')
const btninputok = document.getElementById('btninputok')
const blockplayer1 = document.getElementById('blockplayer1')
const blockplayer2 = document.getElementById('blockplayer2')
const inputplayer1 = document.getElementById('inputplayer1')
const inputplayer2 = document.getElementById('inputplayer2')
const currentValueContainerP1 = document.getElementById('current-value-container-P1') // bcp
const currentValueContainerP2 = document.getElementById('current-value-container-P2')
const scoreValueContainerP1 = document.getElementById('score-value-container-P1')
const scoreValueContainerP2 = document.getElementById('score-value-container-P2')
const btnHold = document.getElementById('btn-hold')
const btnRollDice = document.getElementById('btn-roll-dice')
const btnNewGame = document.getElementById('btn-new-game')
const menuStart = document.querySelector('.menu-start') //bcp
const menuinputplayer = document.querySelector('.container-menu-input-player') //bcp
const img_dice = document.getElementById('img_dice');
const divInfo = document.getElementById("div-info")

// ----- * ARRAY : Value & Score* -----
let arrayCurrentP1 = []
let arrayScoreTotalP1 = []
let currentValueP1 = 0
let scoreValueP1 = 0

let arrayCurrentP2 = []
let arrayScoreTotalP2 = []
let currentValueP2 = 0
let scoreValueP2 = 0

// ----- * Values Random* -----
let randomIndex = 0      // random dice roll
let randomPlayer = 0    // the starting player

// ----- * RANDOM PLAYERS * -----
function randomPlayers(){
  randomPlayer = Math.floor(Math.random()*(2 - 0) + 1)
  console.log(randomPlayer)
}

// ----- * RANDOM DICE ROLLS * -----
function rollDice(){
  randomIndex = Math.floor(Math.random()*(6 - 1) + 1);
  img_dice.src="./ressources/Dice"+randomIndex+".png";
}

// ----- * MENU : start game * -----
btnStartMenu.addEventListener('click', function(){
  reset()
  menuStart.style.display="none";
  menuinputplayer.style.display='flex'
})

let player1 = "PLAYER 1";
let player2="PLAYER 2";

//---- * * MENU : input players name * -----
btninputok.addEventListener('click', function(){
  if (inputplayer1.value && inputplayer2.value){
    player1 = inputplayer1.value
    player2 = inputplayer2.value
  }

  menuStart.style.display="none";
  menuinputplayer.style.display='none'
  blockplayer1.innerHTML = player1
  blockplayer2.innerHTML = player2
  profilePlayer1()
  profilePlayer2()
  randomPlayers()
  if (randomPlayer === 1){
    divInfo.innerHTML = `${player1} commence la partie`
  }else{
    divInfo.innerHTML =`${player2} commence la partie`
  }
})

// ----- * SWITCH PLAYER * -----
function switchPlayer(){
  if (randomPlayer === 1){
    randomPlayer = 2
  } else
    randomPlayer = 1
}

//----- * DICE : LANCER LES DES * -----
btnRollDice.addEventListener('click',()=>{

  rollDice()

  if (randomPlayer === 1){ 
    if (randomIndex === 1){
      arrayCurrentP1 = []
      currentValueP1 = 0
      currentValueContainerP1.innerHTML = "0"
      console.log('vous etes tombé sur un 1')
      //divInfo.innerHTML = `${player1} vous etes tombé sur un 1`
      divInfo.innerHTML = `${player1} vous êtes tombé sur un 1 !!!`
      switchPlayer()
    } else{
      arrayCurrentP1.push(randomIndex);
      currentValueP1 = arrayCurrentP1.reduce((previousValue, currentValue) => 
      previousValue + currentValue,
      0);
      currentValueContainerP1.innerHTML = currentValueP1
    }

  } else {
    if (randomIndex === 1){
      arrayCurrentP2 = []
      currentValueP2 = 0
      currentValueContainerP2.innerHTML = "0"
      console.log('vous etes tombé sur un 1')
      divInfo.innerHTML = `${player2} vous êtes tombé sur un 1 !!!`
      switchPlayer()
    } else{
      arrayCurrentP2.push(randomIndex);
      currentValueP2 = arrayCurrentP2.reduce((previousValue2, currentValue2) => 
      previousValue2 + currentValue2,
      0);
      currentValueContainerP2.innerHTML = currentValueP2
    }
  }
})

//----- *ENREGISTER LE SCORE * -----
btnHold.addEventListener('click',function(){
  
  if (randomPlayer === 1){
    arrayScoreTotalP1.push(currentValueP1);
    scoreValueP1 = arrayScoreTotalP1.reduce((previousValue, currentValue) => 
    previousValue + currentValue,
    0);
    scoreValueContainerP1.innerHTML = scoreValueP1
    if(scoreValueP1 >= 5){
      profileProgressPlayer1()
    } 
    if (scoreValueP1 >= 10){
      PlayerAttack1()
    }
    if (scoreValueP1 >= 15 ){
      console.log('Gagné joueur 1')
      PlayerWinner1()
      PlayerDead2()
      endGame()
    } 
    else{
      currentValueP1 = 0
      arrayCurrentP1 = []
      currentValueContainerP1.innerHTML = "0"
      switchPlayer()
      console.log("switch vers le player 2")
    }
  
  } else{
    arrayScoreTotalP2.push(currentValueP2);
    scoreValueP2 = arrayScoreTotalP2.reduce((previousValue2, currentValue2) => 
    previousValue2 + currentValue2,
    0);
    scoreValueContainerP2.innerHTML = scoreValueP2
    if (scoreValueP2 >= 5){
      profileProgressPlayer2()  
    }
    if (scoreValueP2 >= 10){
      PlayerAttack2()
    }
    if (scoreValueP2 >= 15 ){
      console.log('Gagné joueur 2')
      PlayerWinner2()
      PlayerDead1()
      endGame()
    } 
    else{
      currentValueP2 = 0
      arrayCurrentP2 = []
      currentValueContainerP2.innerHTML = "0"
      switchPlayer()
      console.log("switch vers le player 1")
    }
  }
})

//----- * IMG WINNER * -----
const blockwinner = document.getElementById('block-winner') //div winner
const imgwin = document.createElement('img')
imgwin.setAttribute('src', 'ressources/winner.png');
imgwin.setAttribute('class', 'imgwin')

//----- * FUNCTION WINNER * -----
function endGame() {
  blockwinner.appendChild(imgwin);
}

// ----- * NEW GAME * -----
btnNewGame.addEventListener('click', function(){
  menuinputplayer.style.display='none'
  menuStart.style.display="block";
  imgwin.style.display="none"
  location.reload();
})

//----- * FUNCTION RESET * -----
function reset() {
  arrayScoreTotalP1 = []
  scoreValueP1 = 0
  arrayScoreTotalP2 = []
  scoreValueP2 = 0
  arrayCurrentP1 = []
  currentValueP1 = 0
  arrayCurrentP2 = []
  currentValueP2 = 0
  currentValueContainerP1.innerHTML = "0"
  currentValueContainerP2.innerHTML = "0"
  scoreValueContainerP1.innerHTML ="0"
  scoreValueContainerP2.innerHTML ="0"
  blockplayer1.innerHTML ="PLAYER 1" 
  blockplayer2.innerHTML ="PLAYER 2" 
  divInfo.innerHTML = "Bonne chance !"
  inputplayer1.value = ""
  inputplayer2.value = ""
  player2="PLAYER 2";
  player1="PLAYER 1";
  
 
}

//----- * IMG PERSONNAGES * -----

playerGreeting1 = document.querySelector('.div-idlesP1')
playerGreeting2 = document.querySelector('.div-idlesP2')

//----- * FUNCTION PERSONNAGE * -----
//----- *  PLAYER 1  * -----
function profilePlayer1() {
  playerGreeting1.style.background="url(ressources/player1.png)"
  playerGreeting1.classList.add('profil-player1')
}
function profileProgressPlayer1() {
  playerGreeting1.style.background="url(ressources/player1.png)"
  playerGreeting1.classList.add('profil-progress-player1')
}
function PlayerAttack1() {
  playerGreeting1.style.background="url(ressources/P1ProfilAttack.png)"
  playerGreeting1.classList.add('profil-attack-player1')
}
function PlayerWinner1() {
  playerGreeting1.style.background="url(ressources/player1-start.png)"
  playerGreeting1.classList.add('profilWinnerPlayer1')
}
function PlayerDead1(){
  playerGreeting1.style.background="url(ressources/P1Dead.png)"
  playerGreeting1.classList.add('profilDeadPlayer1')
}
//----- *  PLAYER 2  * -----

function profilePlayer2() {
  playerGreeting2.style.background="url(ressources/player2.png)"
  playerGreeting2.classList.add('profil-player2')
}
function profileProgressPlayer2() {
  playerGreeting2.style.background="url(ressources/player2.png)"
  playerGreeting2.classList.add('profil-progress-player2')
}
function PlayerAttack2(){
  playerGreeting2.style.background="url(ressources/P2ProfilAttack.png)"
  playerGreeting2.classList.add('profil-attack-player2')
}
function PlayerWinner2(){
  playerGreeting2.style.background="url(ressources/player2-start.png)"
  playerGreeting2.classList.add('profilWinnerPlayer2')
}
function PlayerDead2(){
  playerGreeting2.style.background="url(ressources/P2Dead.png)"
  playerGreeting2.classList.add('profilDeadPlayer2')
}

