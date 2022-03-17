const menu = document.querySelector('.containermenu')
//let epee = document.querySelector('.epee')
const start = document.getElementById('start')
const btninputok = document.getElementById('btninputok')
const containerdice = document.getElementById('containerdice')
const blockplayer1 = document.getElementById('blockplayer1')
const blockplayer2 = document.getElementById('blockplayer2')
const inputplayer1 = document.getElementById('inputplayer1')
const inputplayer2 = document.getElementById('inputplayer2')
const currentValueP1Container = document.getElementById('current-value-container-P1')
const btnhold = document.getElementById('btnhold')
//const currentplayer2 = document.getElementById('currentplayer2')
const btnrolldice = document.getElementById('btnrolldice')
const limenu = document.querySelector('.limenu')
const menuinputplayer = document.querySelector('.menuinputplayer')
const img_dice = document.getElementById('img_dice');
const scoreValueP1Container = document.getElementById('score-value-container-P1')

let arrayCurrentP1 = []
let arrayScoreTotalP1 = []
let arrayCurrentP2 = []
let arrayScoreTotalP2 = []


// ----- * MENU afficher/enlever * -----
start.addEventListener('click', function(){
  limenu.style.display="none";
  menuinputplayer.style.display='block'
})

//---- * BUTTON OK * -----

btninputok.addEventListener('click', function(){
  limenu.style.display="none";
  menu.style.display="none";
  const player1 = inputplayer1.value
  const player2 = inputplayer2.value
  blockplayer1.innerHTML = player1
  blockplayer2.innerHTML = player2
  //epee.style.display='block'
})

//----- * DICE : LANCER LES DES * -----

//rediriger vers le player 2
//Ne pouvoir appuyer sur hold qu'avec roll dice
let currentValueP1 = 0
let scoreValueP1 = 0

let randomIndex = 0

btnrolldice.addEventListener('click',()=>{
  
  randomIndex = Math.floor(Math.random()*(6 - 1) + 1);
  img_dice.src="./ressources/Dice"+randomIndex+".png";
  
  if (randomIndex === 1){
    
    //rediriger vers le player 2
    arrayCurrentP1 = []
    console.log('vous etes tombé sur un 1')
    currentValueP1Container.innerHTML = ""

  } else{
  
    arrayCurrentP1.push(randomIndex);

    currentValueP1 = arrayCurrentP1.reduce((previousValue, currentValue) => 
    previousValue + currentValue,
    0);
    currentValueP1Container.innerHTML = currentValueP1
  }
})

//----- * DICE : ENREGISTER LE SCORE * -----

btnhold.addEventListener('click',function(){
  
  arrayScoreTotalP1.push(currentValueP1);
  
  scoreValueP1 = arrayScoreTotalP1.reduce((previousValue, currentValue) => 
  previousValue + currentValue,
  0);
  scoreValueP1Container.innerHTML = scoreValueP1
  
  if (arrayScoreTotalP1 >= 10 ){

    console.log('Gagné')
    endGame()

  } else{
// REDIRIGE LE PLAYER 2
    currentValueP1 = 0
    arrayCurrentP1 = []
    currentValueP1Container.innerHTML = ""

  }
    
})


// ----- * IMG WINNER * -----



//----- * FUNCTION WINNER * -----

function endGame() {

  const testwinner = document.getElementById('testwinner') //div winner
  const imgwin = document.createElement('img')
  imgwin.setAttribute('src', 'ressources/winner.png');
  imgwin.setAttribute('class', 'imgwin')
  testwinner.appendChild(imgwin);
  arrayCurrentP1 = []
  arrayScoreTotalP1 = []
  arrayCurrentP2 = []
  arrayScoreTotalP2 = []
  currentValueP1Container.innerHTML = ""
  scoreValueP1Container.innerHTML = ""

}

function reset(){

  
}


//----- * PERSONNAGES * -----
function idleperso (){

}


