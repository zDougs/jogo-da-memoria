// Crie uma matriz com pares de números representando as cartas
const cards = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

// Crie um objeto para armazenar as imagens correspondentes para cada carta
const imageUrls = [
  'img/apple.jpg',
  'img/banana.jpg',
  'img/grape.jpg',
  'img/coconut.jpg',
  'img/orange.jpg',
  'img/pineapple.jpg'
]

// Embaralhe a matriz de cartas
function shuffleCards(cards) {
  cards.sort(() => Math.random() - 0.5);
}


// Selecione as cartas e atribua um número da matriz a cada carta
function createCards() {
  
  shuffleCards(cards)
  const cardsList = document.querySelector(".container")
  
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("div")
    const cardBack = document.createElement("div")
    const cardFront = document.createElement("div")
    
    card.classList.add("card")
    cardBack.classList.add("back")
    cardFront.classList.add("front")
    cardBack.style.backgroundImage = `url('img/card-back.jpg')`
    
    const cardNumber = cards[i]
    const cardImage = imageUrls[cardNumber] 
    cardFront.style.backgroundImage = `url(${cardImage})`
    
    card.setAttribute("data-card", cardNumber)
    card.appendChild(cardBack)
    card.appendChild(cardFront)
    card.addEventListener("click", flipCard)
    cardsList.appendChild(card)
  }
}

let flippedCards = 0;
let firstCard, secondCard;
let attempts = 0;

// Vire a carta clicada
function flipCard() {
  if (flippedCards < 2 && !this.classList.contains("flip")) {
    flippedCards++;
    this.classList.add("flip");
    if (flippedCards === 1) {
      firstCard = this;
    } else {
      secondCard = this;
      attempts++;
      updateAttempts();
      checkForMatch();
    }
  }
}

// Verifique se as cartas viradas são iguais
function checkForMatch() {
  const isMatch =
    firstCard.getAttribute("data-card") ===
    secondCard.getAttribute("data-card");
  isMatch ? disableCards() : unflipCards();
}

// Desabilita as cartas viradas se forem iguais
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  console.log(document.querySelectorAll(".card:not(.flip)").length);
  if (document.querySelectorAll(".card:not(.flip)").length === 0) {
    showCongratulations();
    reset()
  }

  resetBoard();
}

// Desvira as cartas se não forem iguais
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

// Reinicia o tabuleiro
function resetBoard() {
  [flippedCards, firstCard, secondCard] = [0, null, null];
}

// Atualiza o número de tentativas
function updateAttempts() {
  const attemptsElement = document.querySelector(".attempts");
  attemptsElement.textContent = `Tentativas: ${attempts}`;
}

//Mostra mensagem de parabens quando o jogo é terminado
function showCongratulations() {
  const congratulationsContainer = document.querySelector(".congratulations-message");
  
  const congratulationsElement = document.createElement("p");
  congratulationsElement.classList.add("congratulations");
  congratulationsElement.textContent = `Parabéns! Você venceu em ${attempts} tentativas!`;
  congratulationsContainer.appendChild(congratulationsElement);
}

//Cria um botao que reinicia o jogo
function reset() {
    const resetButtonContainer = document.querySelector('.reset-game')
    
    const resetButton = document.createElement('button')
    resetButton.classList.add('resetar')
    resetButton.textContent = 'Jogar Novamente'
    resetButtonContainer.appendChild(resetButton)
  
    resetButton.addEventListener('click', resetGame)
}

function resetGame() {
    window.location.reload()
}

createCards();