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

var playerHand = []
var dealerHand = []

function getdeck() {
    for (var s = 0; s < suits.length; s++) {
        for (var n = 0; n < values.length; n++) {
            cardImg = "img/" + values[n] + "_of_" + suits[s] + ".png";
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
getdeck()
// console.log(deck)

function deal() {
    var card = deck.pop()
    playerHand.push(card)
    var card = deck.pop()
    dealerHand.push(card)
    var card = deck.pop()
    playerHand.push(card)
    console.log(playerHand)
    var card = deck.pop()
    dealerHand.push(card)
    console.log(dealerHand)
    var playerCard1 = document.createElement('img')
    // console.log(playerHand[0].img)
    playerCard1.setAttribute('src', playerHand[0].img)
    var playerCard2 = document.createElement('img')
    var dealerCard1 = document.createElement('img')
    var dealerCard2 = document.createElement('img')
    var playerTable = document.getElementById('player-hand')
    var dealerTable = document.getElementById('dealer-hand')
    playerTable.appendChild(playerCard1)
    playerTable.appendChild(playerCard2)
    console.log(playerTable)
}

deal()
