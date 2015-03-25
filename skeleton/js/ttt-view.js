(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
  };

  View.prototype.bindEvents = function () {
    function move(event) {
      var $square = $(event.currentTarget);
      try {
      this.game.playMove(JSON.parse($square.data("pos")));
      }
      catch(MoveError) {
        alert("Square already taken!");
        return;
      }
      this.makeMove($square);
      var winner = this.game.winner();
      if (winner) {
        alert(winner + " wins the game!");
        this.$el.off("click", ".cell", this.clickHandler);
      }
    }
    this.clickHandler = move.bind(this);
    this.$el.on("click", ".cell", this.clickHandler);
  };

  View.prototype.makeMove = function ($square) {
    var klass = this.game.currentPlayer;
    $square.addClass(klass);
    $square.text(klass);
  };

  View.prototype.setupBoard = function () {
    for(var i = 0; i < 3; i++) {
      var $row = $("<div class='row group'></div>");
      for(var j = 0; j < 3; j++) {
        var $cell = $("<div class='cell'></div>");
        $cell.data('pos', "[" + i + ", " + j + "]");
        $row.append($cell);
      }
      this.$el.append($row);
    }
  };

})();
