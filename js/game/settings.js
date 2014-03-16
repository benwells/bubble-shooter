function game() {
  this.CANVAS_WIDTH = 780;
  this.CANVAS_HEIGHT = 420;
  this.FPS = 20;
  this.containerId = "container";
  this.gameScreen = $("<canvas id='canvas1' width='" + this.CANVAS_WIDTH + "' height='" + this.CANVAS_HEIGHT + "'></canvas>");
  this.bgScreen = $("<canvas id='canvas3' width='" + this.CANVAS_WIDTH + "' height='" + this.CANVAS_HEIGHT + "'></canvas>");
  this.overlayScreen = $("<canvas id='canvas2' width='" + this.CANVAS_WIDTH + "' height='" + this.CANVAS_HEIGHT + "'></canvas>");
  this.context = this.gameScreen.get(0).getContext("2d");
  this.context2 = this.overlayScreen.get(0).getContext("2d");
  this.context3 = this.bgScreen.get(0).getContext("2d");
  this.player = new Player({canvas: this.context});
  this.shot = false;
  this.enemies = [];
  this.current_score = 0;
  this.pointsPerLevel = 500;
  this.hardness = 0.005;
  this.timeId = 0;
  this.level = 1;
  this.message = new Message("LEVEL " + this.level);
  this.score = new Score({context: this.context2});
  this.background = new Background({context: this.context3, height:this.CANVAS_HEIGHT, width:this.CANVAS_WIDTH * 4});
  this.particles = [];
  this.explosions = [];

  this.draw = function () {
    var _this = this,
      context = _this.context,
      context2 = _this.context2,
      context3 = _this.context3,
      player = _this.player;

    player.draw();

    for (i = 0; i < player.bullets.length; i++) {
      player.bullets[i].draw();
    }

    for (i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(context);
    }

    for (i = 0; i < _this.particles.length; i++) {
      _this.particles[i].draw(context2);
    }

    if (_this.message.active === true) {
      _this.message.draw(context2);
    }
    _this.score.draw();
    _this.background.draw();
  };

  this.clearCanvas = function () {
    var _this = this;
    _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    _this.context2.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    _this.context3.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
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

    // get rid of inactive bullets
    _this.player.bullets = _this.player.bullets.filter(function (bullet) {
      return bullet.active;
    });

    _this.enemies.forEach(function (enemy) {
      enemy.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    });

    _this.enemies = _this.enemies.filter(function (enemy) {
      return enemy.active;
    });

    // _this.explosions.forEach(function (explosion) {
    //   explosion.update();
    // });

    _this.particles.forEach(function (particle) {
      particle.update(20);
    });

    if (_this.message.active) {
      _this.message.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    }

    _this.background.update();

    // if (_this.current_score % 20 == 0 ) {
    //   console.log('mod!')
      // _this.message.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    // }
    // else {
    //   console.log('resetting message stuff')
    //
    //   this.message.active = true;
    // }

    if (Math.random() < _this.hardness) { //this number controls the frequency of enemies
      _this.enemies.push(new Enemy({
        x: _this.CANVAS_WIDTH,
        y: _this.CANVAS_HEIGHT / 4 + Math.random() * _this.CANVAS_HEIGHT / 2
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
    _this.bgScreen.appendTo('#' + _this.containerId);
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

          //update score
          _this.updateScore(enemy.points).explosions.push(new Explosion(enemy.explode(ctxt)));

          //increase the frequency of enemies at regular point intervals
          if (_this.current_score % (_this.pointsPerLevel / 10) === 0) {

            _this.hardness += 0.005;
          }


          //initiate new level message if level up
          if (_this.current_score % _this.pointsPerLevel === 0) {
            _this.level++;
            _this.score.level++;
            _this.message = new Message("LEVEL " + _this.level);
            _this.message.active = true;
          }

          _this.createExplosion(enemyX, enemyY, "#525252");
          _this.createExplosion(enemyX, enemyY, "#FFA318");
          _this.createExplosion(enemyX, enemyY, "white");

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
  };
}
