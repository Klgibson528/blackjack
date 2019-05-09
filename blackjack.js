// Global Variables
var deck = [];
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king"
];
var point = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
var dealerCards = [];
var playerCards = [];
var dealerPoints = 0;
var playerPoints = 0;

// Getting Divs
var message = document.getElementById("messages");
var dealerDiv = document.getElementById("dealer-hand");
var playerDiv = document.getElementById("player-hand");
var dealerPointsDiv = document.getElementById("dealer-points");
var playerPointsDiv = document.getElementById("player-points");

// Event Listeners
var dealButton = document
  .getElementById("deal-button")
  .addEventListener("click", deal);

var hitButton = document
  .getElementById("hit-button")
  .addEventListener("click", hit);

var standButton = document
  .getElementById("stand-button")
  .addEventListener("click", stand);

// Function Definitions
function getdeck() {
  for (var s = 0; s < suits.length; s++) {
    for (var n = 0; n < values.length; n++) {
      cardImg = "./img/" + values[n] + "_of_" + suits[s] + ".png";
      var card = {
        Value: values[n],
        Suit: suits[s],
        Points: point[n],
        img: cardImg
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function deal() {
  removeCards(dealerDiv, playerDiv);
  getdeck();
  shuffleArray(deck);
  message.textContent = "";
  dealerCards = [];
  playerCards = [];
  dealerPoints = 0;
  playerPoints = 0;
  document.getElementById("hit-button").removeAttribute("disabled", true);
  document.getElementById("stand-button").removeAttribute("disabled", true);
  var i = 0;
  while (i < 2) {
    card1 = deck.pop();
    card2 = deck.pop();
    var playerCard = document.createElement("img");
    var dealerCard = document.createElement("img");
    playerCard.setAttribute("src", card1.img);
    dealerCard.setAttribute("src", card2.img);
    playerDiv.append(playerCard);
    dealerDiv.append(dealerCard);
    playerCards.push(card1);
    checkAce(playerCards, playerPoints)
    playerPoints += card1.Points;
    dealerCards.push(card2);
    checkAce(dealerCards, dealerPoints)
    dealerPoints += card2.Points;
    dealerPointsDiv.textContent = dealerPoints;
    playerPointsDiv.textContent = playerPoints;
    i++;
  }



  checkScore(playerPoints, dealerPoints);
}

function hit() {
  if (playerPoints < 21) {
    card1 = deck.pop();
    var playerCard = document.createElement("img");
    playerCard.setAttribute("src", card1.img);
    playerDiv.append(playerCard);
    playerCards.push(card1);
    checkAce(playerCards, playerPoints)
    playerPoints += card1.Points;
    playerPointsDiv.textContent = playerPoints;
  }
  checkScore(playerPoints, dealerPoints);
}

function disableButtons() {
  document.getElementById("hit-button").setAttribute("disabled", true);
  document.getElementById("stand-button").setAttribute("disabled", true);
}

function stand() {
  disableButtons()
  while (dealerPoints < 17) {
    card1 = deck.pop();
    var dealerCard = document.createElement("img");
    dealerCard.setAttribute("src", card1.img);
    dealerDiv.append(dealerCard);
    dealerCards.push(card1);
    dealerPoints += card1.Points;
    dealerPointsDiv.textContent = dealerPoints;
    playerPointsDiv.textContent = playerPoints;
  }
  if (dealerPoints > 21) {
    message.textContent = "Dealer Busted";
  } else if (playerPoints > dealerPoints && playerPoints <= 21) {
    message.textContent = "You Win!";
  } else if (dealerPoints > playerPoints && dealerPoints <= 21) {
    message.textContent = "Dealer Wins";
  } else if (playerPoints == dealerPoints) {
    message.textContent = "It's a tie!";
  }
}

function checkAce(playerHand, playerPoints) {
  playerHand.forEach(card => {
    if (card.Value == 'ace') {
      if (playerPoints + 11 > 21) {
        card.Points = 1
      }
      else {
        card.Points = 11
      }
    }
  })
}

function checkScore(player, dealer) {
  if (player == 21) {
    message.textContent = "You Win!";
    disableButtons()
  } else if (dealer == 21) {
    message.textContent = "Dealer Wins";
    disableButtons()
  } else if (player > 21) {
    message.textContent = "You Busted";
    disableButtons()
  } else if (dealer > 21) {
    message.textContent = "Dealer Busted";
    disableButtons()
  } else {
    message.textContent = "Hit?";
  }
}

function removeCards(div1, div2) {
  while (div1.firstChild) {
    div1.removeChild(div1.firstChild);
  }
  while (div2.firstChild) {
    div2.removeChild(div2.firstChild);
  }
}
