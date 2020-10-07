// Affichage du username sur la page settings

const displayCurrentUser = document.querySelector('.display-current-user');

let currentUserName = sessionStorage.user;
if (currentUserName !== '') {
  displayCurrentUser.innerHTML = currentUserName;
}

// Gestion de l'affichage des différentes vues

const saveButton = document.querySelector('.save');
const scoreButton = document.querySelector('.score-button');
const playBody = document.querySelector('.play-body');
const settingsBody = document.querySelector('.settings-body');
const scoresBody = document.querySelector('.scores-body');

saveButton.addEventListener('click', function () {
  playBody.style.display = 'block';
  settingsBody.style.display = 'none';
});

scoreButton.addEventListener('click', function () {
  scoresBody.style.display = 'block';
  playBody.style.display = 'none';
});

const imageSoundOnOff = document.querySelector('.sound-image');
imageSoundOnOff.addEventListener('click', function () {
  if (imageSoundOnOff.getAttribute('src') == '../images/imgmute.png') {
    imageSoundOnOff.setAttribute('src', '../images/imgmusic.jpg');
    soundActive = true;
  } else {
    imageSoundOnOff.setAttribute('src', '../images/imgmute.png');
    soundActive = false;
  }
});
//Gestion du mode increase speed

let increaseSpeed = false;
let speedInterval = 800;

const buttonIncreaseSpeed = document.querySelector('#switch-speed');
buttonIncreaseSpeed.addEventListener('change', function () {
  if (increaseSpeed == false) {
    increaseSpeed = true;
    speedInterval = 400;
  } else {
    increaseSpeed = false;
    speedInterval = 800;
  }
});

// Variables

let order = []; // on va stocker dans cette variable la séquence de 20 couleurs
let playerOrder = []; // liste des couleurs sur lesquelles le joueur a cliqué
let nbCompTurn; // nombre de tour qu'a joué l'ordinateur
let nbUserTurn; // tour actuel
let good; // retourne true ou false si le joueur clique sur la bonne ou la mauvaise couleur
let compTurn; // true si c'est au tour de l'ordinateur
let interval;
let win; // si true, le joueur a gagné
let soundActive = true;

const score = document.querySelector('.score');
const carreRouge = document.querySelector('.carreRouge');
const carreBleu = document.querySelector('.carreBleu');
const carreJaune = document.querySelector('.carreJaune');
const carreVert = document.querySelector('.carreVert');
const message = document.querySelector('.message');
const startButton = document.querySelector('.start');

// création d'un écouteur, déclenchant le jeu par un clic sur le bouton start

startButton.addEventListener('click', (event) => {
  play();
});

// fonction permettant d'initialiser le jeu

function play() {
  win = false; // en cas de nouveau jeu après une victoire, on remet la variable win à fausse
  order = []; // idem, on vide le tableau order
  playerOrder = []; // on vide également le tableau playerOrder
  nbCompTurn = 0; // l'ordinateur n'a pas joué, donc variable = 0
  interval = 0;
  nbUserTurn = 1; // on initialise le nb de tours de joueurs à 1
  score.innerHTML = 'SCORE : 0'; // on remet le score à 0
  good = true; // on remet good à true si le joueur avait fait une erreur

  for (let i = 0; i < 5; i++) {
    // cette boucle va créer un tableau de 20 chiffres compris entre 1 et 4
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true; // on indique que c'est le tour de l'ordinateur
  interval = setInterval(gameTurn, speedInterval);
}
// cette foncton permet de créer le tour de jeu

function gameTurn() {
  if (nbCompTurn == nbUserTurn) {
    // on compare le nb de tours de l'utilisateur à celui de l'ordinateur
    clearInterval(interval); // on stoppe la fonction
    compTurn = false; // on indique que ce n'est pas le tour de l'ordinateur
    clearColor(); // on éteint les couleurs
  }

  if (compTurn) {
    // on vérifie que ce soit le tour de l'ordinateur
    clearColor(); // on éteint les couleurs
    setTimeout(() => {
      if (order[nbCompTurn] == 1) rouge(); // si dans la séquence, le 1er chiffre est un 1 on allume le rouge au bout de 200mS
      if (order[nbCompTurn] == 2) bleu();
      if (order[nbCompTurn] == 3) jaune();
      if (order[nbCompTurn] == 4) vert();
      nbCompTurn++; // on augmente le nombre de tour de l'ordinateur
    }, 200);
  }
}

function rouge() {
  carreRouge.style.opacity = '0.7';
  rougeSound.play();
}

function bleu() {
  carreBleu.style.opacity = '0.7';
  bleuSound.play();
}

function jaune() {
  carreJaune.style.opacity = '0.7';
  jauneSound.play();
}

function vert() {
  carreVert.style.opacity = '0.7';
  vertSound.play();
}

function clearColor() {
  carreVert.style.opacity = '1';
  carreJaune.style.opacity = '1';
  carreBleu.style.opacity = '1';
  carreRouge.style.opacity = '1';
}

carreRouge.addEventListener('click', (event) => {
  playerOrder.push(1);
  check();
  rouge();
  rougeSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreBleu.addEventListener('click', (event) => {
  playerOrder.push(2);
  check();
  bleu();
  bleuSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreJaune.addEventListener('click', (event) => {
  playerOrder.push(3);
  check();
  jaune();
  jauneSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreVert.addEventListener('click', (event) => {
  playerOrder.push(4);
  check();
  vert();
  vertSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }

  if (playerOrder.length == 5 && good) {
    winGame();
  }

  if (good == false) {
    message.innerHTML = 'YOU LOOSE, TRY AGAIN !';
    setTimeout(() => {
      message.innerHTML = '';
      clearColor();
      play();
    }, 800);
  }

  if (nbUserTurn == playerOrder.length && good && !win) {
    nbUserTurn++;
    playerOrder = [];
    compTurn = true;
    nbCompTurn = 0;
    score.innerHTML = 'SCORE : ' + (nbUserTurn * 10 - 10);
    interval = setInterval(gameTurn, speedInterval);
  }
}

function winGame() {
  message.innerHTML = 'YOU WIN !';
  setTimeout(() => {
    message.innerHTML = '';
  }, 2000);
  win = true;
}
// scores js laurence
let scoreTable = [
  {
    name: 'lolo',
    score: '400',
  },
  {
    name: 'amandine',
    score: '500',
  },
];

function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  } else if (b.score < a.score) {
    return 1;
  } else return 0;
}
