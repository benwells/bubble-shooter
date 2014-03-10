function game() {
  this.CANVAS_WIDTH = 780;
  this.CANVAS_HEIGHT = 420;
  this.FPS = 20;
  this.containerId = "container";
  this.gameScreen = $("<canvas width='" + this.CANVAS_WIDTH + "' height='" + this.CANVAS_HEIGHT + "'></canvas>");
  this.overlayScreen = $("<canvas id='canvas2' width='" + this.CANVAS_WIDTH + "' height='" + this.CANVAS_HEIGHT + "'></canvas>");
  this.context = this.gameScreen.get(0).getContext("2d");
  this.context2 = this.overlayScreen.get(0).getContext("2d");
  this.player = new player(this.context);
  this.shot = false;
  this.enemies = [];
  this.explosions = [];
  this.current_score = 0;
  this.timeId = 0;
  this.level = 1;
  this.message = new message("LEVEL " + this.level);
  this.score = new score();
  this.particles = [];

  this.draw = function () {
    var _this = this,
      context = _this.context,
      context2 = _this.context2,
      player = _this.player;

    player.draw();

    for (i = 0; i < player.bullets.length; i++) {
      player.bullets[i].draw(context);
    }

    for (i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(context);
    }

    for (i = 0; i < _this.explosions.length; i++) {
      _this.explosions[i].draw(context);
    }

    for (i = 0; i < _this.particles.length; i++) {
      _this.particles[i].draw(context2);
    }

    _this.message.draw(context2);
    _this.score.draw(context2);
  };

  this.clearCanvas = function () {
    var _this = this;
    _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    _this.context2.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
  };

  this.update = function () {
    var _this = this;

    if (keydown.space && _this.shot === false) {
      _this.shot = true;
      _this.player.shoot();
    } else if (!keydown.space) {
      _this.shot = false;
    }

    if (keydown.up) {
      _this.player.y -= 27;
    }

    if (keydown.down) {
      _this.player.y += 27;
    }

    //clamps the player to the canvas
    _this.player.y = _this.player.y.clamp(0, _this.CANVAS_HEIGHT - _this.player.height);

    //update every bullet
    _this.player.bullets.forEach(function (bullet) {
      bullet.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    });

    //get rid of inactive bullets
    _this.player.bullets = _this.player.bullets.filter(function (bullet) {
      return bullet.active;
    });

    _this.enemies.forEach(function (enemy) {
      enemy.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    });

    _this.enemies = _this.enemies.filter(function (enemy) {
      return enemy.active;
    });

    _this.explosions.forEach(function (explosion) {
      explosion.update();
    });

    _this.particles.forEach(function (particle) {
      particle.update(20);
    });

    _this.message.update();

    if (Math.random() < 0.01) { //this number controls the frequency of enemies
      _this.enemies.push(Enemy({
        x: _this.CANVAS_WIDTH,
        cHeight: _this.CANVAS_HEIGHT
      }));
    }

    _this.detectCollision(_this.enemies, _this.player.bullets, _this.context);

  };

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
    _this.overlayScreen.appendTo('#' + _this.containerId);
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

          var x = randomFloat(100, 400);
          var y = randomFloat(100, 400);
          _this.createExplosion(enemyX, enemyY, "#525252");
          _this.createExplosion(enemyX, enemyY, "#FFA318");

          bullet.active = false;
        }
      });
    });
  };

  this.updateScore = function (points) {
    var old_score = this.current_score;
    this.current_score += points;
    if (old_score != this.current_score) {
      this.score.score = this.current_score;
    }

    //make chainable
    return this;
  };

  /*
   * Advanced Explosion effect
   * Each particle has a different size, move speed and scale speed.
   *
   * Parameters:
   *  x, y - explosion center
   *  color - particles' color
   */
  this.createExplosion = function (x, y, color) {
    var minSize = 10;
    var maxSize = 30;
    var count = 10;
    var minSpeed = 60.0;
    var maxSpeed = 200.0;
    var minScaleSpeed = 1.0;
    var maxScaleSpeed = 4.0;

    for (var angle = 0; angle < 360; angle += Math.round(360 / count)) {
      var particle = new Particle();

      particle.x = x;
      particle.y = y;

      particle.radius = randomFloat(minSize, maxSize);

      particle.color = color;

      particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

      var speed = randomFloat(minSpeed, maxSpeed);

      particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
      particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

      this.particles.push(particle);
    }
  }
}