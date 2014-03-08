function game() {
  this.CANVAS_WIDTH = 780;
  this.CANVAS_HEIGHT = 420;
  this.FPS = 30;
  this.containerId = "container";
  this.gameScreen = $("<canvas width='" + this.CANVAS_WIDTH + "' height='" + this.CANVAS_HEIGHT + "'></canvas>");
  this.context = this.gameScreen.get(0).getContext("2d");
  this.player = new player(this.context);
  this.shot = false;
  this.enemies = [];
  this.explosions = [];
  this.current_score = 0;
  this.timeId;

  this.draw = function () {
    var context = this.context;
    this.player.draw();

    this.player.bullets.forEach(function (bullet) {
      bullet.draw(context);
    });

    this.enemies.forEach(function (enemy) {
      enemy.draw(context);
    });

    this.explosions.forEach(function (explosion) {
      explosion.draw(context);
    });
  };

  this.clearCanvas = function () {
    this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  };

  this.update = function () {
    var _this = this;
    if (keydown.space && this.shot == false) {
      this.shot = true
      this.player.shoot();
    } else if (!keydown.space) {
      this.shot = false;
    }

    if (keydown.up) {
      this.player.y -= 15;
    }

    if (keydown.down) {
      this.player.y += 15;
    }

    //clamps the player to the canvas
    this.player.y = this.player.y.clamp(0, this.CANVAS_HEIGHT - this.player.height);

    //update every bullet
    this.player.bullets.forEach(function (bullet) {
      bullet.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    });

    //get rid of inactive bullets
    this.player.bullets = this.player.bullets.filter(function (bullet) {
      return bullet.active;
    });

    this.enemies.forEach(function (enemy) {
      enemy.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    });

    this.enemies = this.enemies.filter(function (enemy) {
      return enemy.active;
    });

    this.explosions.forEach(function (explosion) {
      explosion.update();
    });

    if (Math.random() < 0.05) { //this number controls the frequency of enemies
      this.enemies.push(Enemy({
        x: _this.CANVAS_WIDTH,
        cHeight: _this.CANVAS_HEIGHT
      }));
    }

    this.detectCollision(this.enemies, this.player.bullets, this.context);

  }

  this.runLoop = function () {
    var _this = this;
    _this.clearCanvas();
    _this.draw();
    _this.update();

    clearTimeout(_this.timeId);

    // Recursive call
    _this.timeId = setTimeout(function () {
      _this.runLoop();
    }, _this.FPS);
  };

  this.init = function () {
    var _this = this;
    _this.gameScreen.appendTo('#' + _this.containerId);
    _this.runLoop();
  };

  this.detectCollision = function (enemies, bullets, ctxt) {
    var _this = this,
        xmax,
        xmin,
        ymax,
        ymin, 
        enemyX,
        enemyY,
        enemyRadius;

    enemies.forEach(function (enemy) {
      enemyX = enemy.x;
      enemyY = enemy.y;
      enemyRadius = enemy.radius;
      xmax = enemyX + enemyRadius - 2;
      xmin = enemyX - enemyRadius + 2;
      ymax = enemyY + enemyRadius - 2;
      ymin = enemyY - enemyRadius + 2;

      bullets.forEach(function (bullet) {
        if (bullet.x <= xmax && bullet.x >= xmin && bullet.y <= ymax && bullet.y >= ymin) {
          _this.updateScore(enemy.points).explosions.push(new explosion(enemy.explode(ctxt)));
          bullet.active = false; 
        }
      })
    });
  };

  this.updateScore = function (points) {
    var old_score = this.current_score;
    this.current_score += points;
    if (old_score != this.current_score) {
      $('#score').html(this.current_score);
    }

    //make chainable
    return this; 
  };
}