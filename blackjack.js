var deck = new Array();
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var point = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

// if score <= 10 {
//   A[point] = 1;
// } else {
//   A[point] = 11;
// };

function getdeck() {
  var deck = new Array();

  for (var s = 0; s < suits.length; s++) {
    for (var n = 0; n < values.length; n++) {
      var card = { Value: values[n], Suit: suits[s], Points: point[n] };
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

//Connect cards to img and randomly deal
$("#deal-button").click(function() {
  getdeck();
  console.info(JSON.stringify(deck, null, "  "));

  $("#dealer-hand").prepend('<img src="img/2_of_clubs.png">');
  $("#dealer-hand").prepend('<img src="img/2_of_clubs.png">');
  $("#player-hand").prepend('<img src="img/2_of_clubs.png">');
  $("#player-hand").prepend('<img src="img/2_of_clubs.png">');
});

$("#hit-button").click(function() {
  $("#player-hand").append('<img src="img/2_of_clubs.png">');
});
