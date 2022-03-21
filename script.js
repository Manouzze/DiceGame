
const btnStartMenu = document.querySelector('.btnstart')
const btninputok = document.getElementById('btninputok')
const containerdice = document.getElementById('containerdice')
const blockplayer1 = document.getElementById('blockplayer1')
const blockplayer2 = document.getElementById('blockplayer2')
const inputplayer1 = document.getElementById('inputplayer1')
const inputplayer2 = document.getElementById('inputplayer2')
const currentValueContainerP1 = document.getElementById('current-value-container-P1')
const currentValueContainerP2 = document.getElementById('current-value-container-P2')
const scoreValueContainerP1 = document.getElementById('score-value-container-P1')
const scoreValueContainerP2 = document.getElementById('score-value-container-P2')
const btnHold = document.getElementById('btn-hold')
const btnRollDice = document.getElementById('btn-roll-dice')
const btnNewGame = document.getElementById('btn-new-game')
const menuStart = document.querySelector('.menu-start')
const menuinputplayer = document.querySelector('.container-menu-input-player')
const img_dice = document.getElementById('img_dice');
const btnRandomplayer = document.getElementById('btn-random-player')


let arrayCurrentP1 = []
let arrayScoreTotalP1 = []
let currentValueP1 = 0
let scoreValueP1 = 0


let arrayCurrentP2 = []
let arrayScoreTotalP2 = []
let currentValueP2 = 0
let scoreValueP2 = 0


let randomIndex = 0
let randomPlayer = 0


// ----- * MENU : commencer la partie* -----
btnStartMenu.addEventListener('click', function(){
  menuStart.style.display="none";
  menuinputplayer.style.display='block'
})

//---- * INPUT Name player / BUTTON OK * -----
btninputok.addEventListener('click', function(){
  menuStart.style.display="none";
  menuinputplayer.style.display='none'
  const player1 = inputplayer1.value
  const player2 = inputplayer2.value
  blockplayer1.innerHTML = player1
  blockplayer2.innerHTML = player2
  playerGreeting2.style.display="none"
  playerGreeting1.style.display="none"
  playerProfile1.style.display="block"
  playerProfile2.style.display="block"
})

// ----- * NEW GAME * -----
btnNewGame.addEventListener('click', function(){
  menuinputplayer.style.display='none'
  menuStart.style.display="block";
  imgwin.style.display="none"
  inputplayer1.value = ""
  inputplayer2.value = ""
  reaset()
})

// ----- * Random Player / Initialisation Game * -----
function functionRandomPlayer(){
  randomPlayer = Math.floor(Math.random()*(2 - 0) + 1)
  console.log(randomPlayer)
}
btnRandomplayer.addEventListener('click', function(){
  functionRandomPlayer()
})

function switchPlayer(){
  //question ? premiere condition : deuxieme condition
  //randomPlayer === 1 ? randomPlayer = 2 : randomPlayer = 1
  if (randomPlayer === 1){
    randomPlayer = 2
  } else
    randomPlayer = 1
}

// Lancer les dès aléatoirements
function rollDice(){
  randomIndex = Math.floor(Math.random()*(6 - 1) + 1);
  img_dice.src="./ressources/Dice"+randomIndex+".png";
}


//----- * FUNCTION REASET * -----

function reaset() {
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
  playerGreeting2.style.display="block"
  playerGreeting1.style.display="block"
  playerDead1.style.display = "none"
  playerDead2.style.display = "none"  
  playerProfileAttack1.style.display = "none" 
  playerProfileAttack2.style.display = "none"
  playerProfile1.style.display="none"
  playerProfile2.style.display="none"
}
//----- * IMG WINNER * -----
const blockwinner = document.getElementById('block-winner') //div winner
const imgwin = document.createElement('img')
imgwin.setAttribute('src', 'ressources/winner.png');
imgwin.setAttribute('class', 'imgwin')
//----- * FUNCTION WINNER * -----
function endGame() {
  blockwinner.appendChild(imgwin);

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
      playerProfile1.style.display="block"
      playerProfile1.style.gridColumn="2"
    } 
    if (scoreValueP1 >= 10){
      playerProfile1.style.display = "none"   
      playerProfileAttack1.style.display = "block"  
    }
    if (scoreValueP1 >= 15){
      playerProfileAttack1.style.display = "none"  
      playerBack1.style.display = "block"     
    }
    if (scoreValueP1 >= 20 ){
      console.log('Gagné joueur 1')
      playerBack1.style.display = "none"  
      playerBack2.style.display = "none"  
      end1()
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
      playerProfile2.style.display="block"  
      playerProfile2.style.gridColumn="4"  
     // playerProfileProgress2.style.display = "block"   
    }
    if (scoreValueP2 >= 10){
      playerProfile2.style.display = "none"  
      playerProfileAttack2.style.display = "block"    
    }
    if (scoreValueP2 >= 15){
      playerProfileAttack2.style.display = "none"
      playerBack2.style.display = "block"     
    }
    if (scoreValueP2 >= 20 ){
      console.log('Gagné joueur 2')
      playerBack2.style.display = "none" 
      playerBack1.style.display = "none"
      end2()
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

/*.style.gridColumn ='""*/ 
                              //----- * PERSONNAGES * -----
playerGreeting1 = document.querySelector('.div-idlesP1')
playerGreeting2 = document.querySelector('.div-idlesP2')
playerProfile1 = document.querySelector('.div-idles-profile-P1')
playerProfile2 = document.querySelector('.div-idles-profile-P2')
playerProfileAttack1 = document.querySelector('.div-idles-profile-attack-P1')
playerProfileAttack2 = document.querySelector('.div-idles-profile-attack-P2')
playerBack1 = document.querySelector('.div-idles-back-P1')
playerBack2 = document.querySelector('.div-idles-back-P2')
playerDead1 = document.querySelector('.div-idles-dead-P1')
playerDead2 = document.querySelector('.div-idles-dead-P2')
function end1(){
  playerGreeting1.style.display="block"
  playerGreeting1.style.gridColumn ="3"
  playerGreeting1.style.gridRow ="2"
  playerDead2.style.display = "block"
}
function end2(){
  playerGreeting2.style.display="block"
  playerGreeting2.style.gridColumn ="3"
  playerGreeting2.style.gridRow ="2"
  playerDead1.style.display = "block"
}


/*
function progression(){
  if(scoreValueP1 || currentValueP1 >= 5){
    playerBack1.style.display = "block" 
  } 
  if(scoreValueP2 || currentValueP2 >= 5){
    playerBack2.style.display = "block" 
  }
}
progression()*/