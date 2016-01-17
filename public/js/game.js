/**
* Parent object containing method shared across all other objects
*/
function ObjectBase(opts){

}

ObjectBase.prototype.setOpts = function(opts) {
  for (var prop in opts) {
    this[prop] = opts[prop];
  }
};

/**
 * Main Game file.  Contains game settings as well as the game loop itself.
 * @return {[type]} [description]
 */

 /**
  * Game object definition
  */
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

  /**
   * draws all of the elements to the canvase
   */
  this.draw = function () {
    var _this = this,
      context = _this.context,
      context2 = _this.context2,
      context3 = _this.context3,
      player = _this.player;

    player.draw();

    //draw the bullets
    for (i = 0; i < player.bullets.length; i++) {
      player.bullets[i].draw();
    }

    //draw the enemies
    for (i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(context);
    }

    //draw explosion particles
    for (i = 0; i < _this.particles.length; i++) {
      _this.particles[i].draw(context2);
    }

    //draw message if active message detected
    if (_this.message.active === true) {
      _this.message.draw(context2);
    }
    _this.score.draw();
    _this.background.draw();
  };

  /**
   * Clear the canvas, used in main game loop
   */
  this.clearCanvas = function () {
    var _this = this;
    _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    _this.context2.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    _this.context3.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
  };

  /**
   * updates position of all of the game elements
   */
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

    //update enemies
    _this.enemies.forEach(function (enemy) {
      enemy.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    });

    //remove inactive enemies
    _this.enemies = _this.enemies.filter(function (enemy) {
      return enemy.active;
    });

    //update explosion particles
    _this.particles.forEach(function (particle) {
      particle.update(20);
    });

    //update messagae
    if (_this.message.active) {
      _this.message.update(_this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
    }

    _this.background.update();

    /**
     * Leveling system.  Controls the frequency of the enemies based on
     * score and level
     */
    if (Math.random() < _this.hardness) {
      _this.enemies.push(new Enemy({
        x: _this.CANVAS_WIDTH,
        y: _this.CANVAS_HEIGHT / 4 + Math.random() * _this.CANVAS_HEIGHT / 2
      }));
    }

    //detect collisions
    _this.detectCollision(_this.enemies, _this.player.bullets, _this.context);

  };

  //MAIN GAME LOOP definition
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


  //initialization, called from main.js
  this.init = function () {
    var _this = this;
    _this.bgScreen.appendTo('#' + _this.containerId);
    _this.gameScreen.appendTo('#' + _this.containerId);
    _this.overlayScreen.appendTo('#' + _this.containerId);
    _this.runLoop();
  };

  //collision detection
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

  //update score
  this.updateScore = function (points) {
    var old_score = this.current_score;
    this.current_score += points;
    if (old_score != this.current_score) {
      this.score.score = this.current_score;
    }

    //make chainable
    return this;
  };

  /**
  * Explosion effect
  * Each particle has a different size, move speed and scale speed.
  * @param  {[number]} x     [x coords of explosion center]
  * @param  {[number]} y     [y coords of explosion center]
  * @param  {[color]} color [particle color code]
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

/**
 * Player object definition
 * @param {[object]} opts [properties to override defaults]
 */
function Player(opts) {
  ObjectBase.call(this);

  this.canvas = {};
  this.color = "#00A";
  this.y = 100;
  this.x = 40;
  this.width = 40;
  this.height = 32;
  this.bullets = [];

  this.setOpts(opts);
}


/**
 * inheritance from ObjectBase Class
 */
Player.prototype = new ObjectBase();
Player.prototype.constructor = Player;
var PlayerProto = Player.prototype;

/**
 * draws the player to the canvas
 */
PlayerProto.draw = function (canvas) {
  this.canvas.drawImage(document.getElementById('shipImg'),this.x, this.y, this.width, this.height);
};

/**
 * Determines midpoint of the player, for collision detection.
 * @return {[object]} [object containing x and y coordinates of midpoint]
 */
PlayerProto.midpoint = function () {
  return {
    x: this.x + this.width / 2,
    y: this.y + this.height / 2
  };
};

/**
 * Creates bullets when the user shoots (spacebar)
 */
PlayerProto.shoot = function () {
  var _this = this;
  var bulletPosition = _this.midpoint();

  _this.bullets.push(new Bullet({
    xVelocity: 20,
    x: bulletPosition.x,
    y: bulletPosition.y,
    context: _this.canvas
  }));
};

/**
 * Bullet Object with default props
 * @param {[object]} opts [key value pair object of properties]
 */
function Bullet(opts) {
  ObjectBase.call(this);
  this.active = true;
  this.yVelocity = 0;
  this.xVelocity = 0;
  this.width = 3;
  this.height = 3;
  this.color = "white";
  this.context = {};
  this.x = 0;
  this.y = 0;

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Bullet.prototype = new ObjectBase();
Bullet.prototype.constructor = Bullet;
var BulletProto = Bullet.prototype;

/**
 * inBounds accepts the width and height of the game screens and
 * determines if the bullet is still inbound or not based on the
 * bullet x and y values
 *
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game scree height]
 * @return {[boolean]}   [true if bullet is in bounds, else false if not]
 */
BulletProto.inBounds = function (w, h) {
  var _this = this,
      x     = _this.x,
      y     = _this.y;
  return x >= 0 && x <= w && y >= 0 && y <= h;
};

/**
 * draw handles drawing the bullet to the canvas element
 * @return {[none]}
 */
BulletProto.draw = function () {
  var context = this.context;
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
};

/**
 * update increments the bullet position based on the velocity props and also
 * used inBounds() to test if the bullet is still active or not.
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} w [game screen height]
 */
BulletProto.update = function (w, h) {
  this.x += this.xVelocity;
  this.y += this.yVelocity;
  this.active = this.active && this.inBounds(w, h);
};

/**
 * Explosion Object definition
 */
function Explosion (opts) {
  ObjectBase.call(this);

  this.color = 'white';
  this.xVelocity = 0;
  this.yVelocity = 25;

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Explosion.prototype = new ObjectBase();
Explosion.prototype.constructor = Explosion;

/**
 * Draws explosion to the screen
 */
Explosion.prototype.draw = function(canvas) {
  var _this = this,
    x = _this.x,
    y = _this.y,
    width = _this.width,
    height = _this.height;

  canvas.fillStyle = _this.color;
  canvas.fillRect(x, y, width, height);
  canvas.fillRect(x+20, y, width, height);
  canvas.fillRect(x+40, y, width, height);
  canvas.fillRect(x+60, y, width, height);
};

/**
 * Updates explosion position on game screen
 */
Explosion.prototype.update = function () {
  var _this = this;
  _this.x += _this.xVelocity;
  _this.y += _this.yVelocity;
};

/**
 * Enemy Object definition
 * @param {[object]} opts [properties to override defaults]
 */
function Enemy(opts) {
  ObjectBase.call(this);

  this.points = 10;
  this.active = true;
  this.age = Math.floor(Math.random() * 128);
  this.color = "#A2B";
  this.y = 0;
  this.xVelocity = 3;
  this.yVelocity = 0;
  this.radius = 20;
  this.context = {};

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Enemy.prototype = new ObjectBase();
Enemy.prototype.constructor = Enemy;
var EnemyProto = Enemy.prototype;

/**
 * Determines if enemy is inbouds or not based on its position and the
 * game screen dimensions
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 * @return {[boolean]}   [true if object is inbounds]
 */
EnemyProto.inBounds = function (w, h) {
  return this.x >= 0 && this.x <= w && this.y >= 0 && this.y <= h;
};

/**
 * handles drawing the bubble shape to the canvas
 * @param  {[element]} canvas [a reference to the canvas element]
 */
EnemyProto.draw = function (canvas) {
  canvas.strokeStyle = this.color;
  canvas.lineWidth = 3;
  // canvas.fillRect(this.x, this.y, this.width, this.height);
  canvas.beginPath();
  canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); // Outer circle
  canvas.stroke();
  canvas.beginPath();
  canvas.arc(this.x, this.y, this.radius - 5, Math.PI, 1.5 * Math.PI, false); // inner arc
  canvas.stroke();
};

/**
 * handles the movement of the enemy based on velocity props
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 */
EnemyProto.update = function (w, h) {
  this.x -= this.xVelocity;
  this.y += this.yVelocity;

  //controls the "back and forth" motion of enemy
  this.yVelocity = 3 * Math.sin(this.age * Math.PI / 64);
  this.age++;
  this.active = this.active && this.inBounds(w, h);
};

/**
 * Enemy explosion awesomeness
 * @param  {[element]} canvas [reference to canvas game screen]
 * @return {[object]} [new Explosion instance]
 */
EnemyProto.explode = function (canvas) {
  //when an enemy explodes, it is no longer active.
  this.active = false;

  //return an explosion object
  return new Explosion({
    width: this.width / 2,
    height: this.height / 2,
    x: this.x,
    y: this.y
  });
};

/**
 * Message object definition.  A message displays to the end user when they
 * level up.
 * @param {[string]} text [text to display to user]
 */
function Message(text) {
  this.active = true;
  this.text = text;
  this.color = 'green';
  this.fontSize = 1;
  this.fontMax = 56;
  this.fontStyle = 'sans-serif';
  this.x = 780/2;
  this.y = 420/4;
}

/**
 * Handles drawing the message to the canvas element
 * @param  {[context]} context2 [canvas context]
 */
Message.prototype.draw = function (context2) {
  context2.font = this.fontSize + "px " + this.fontStyle;
  context2.fillStyle = this.color;
  context2.textBaseline = "top";
  context2.textAlign="center";
  context2.fillText(this.text, this.x, this.y);
};

/**
 * Updates the message position
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 */
Message.prototype.update = function (w, h) {
  if (this.inBounds(w, h)) {
    if (this.fontSize <= this.fontMax) {
      this.fontSize += 4;
    }
    else {
      this.y += 3;
    }
  }
  else {
    this.active = false;
  }
};

/**
 * Determines of the the message is still inbounds
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 * @return {[boolean]}   [true if inbounds, otherwise false]
 */
Message.prototype.inBounds = function (w, h) {
  return this.y <= h;
};

/**
 * Score object definition
 * @param {[object]} opts [object of props to override defaults]
 */
function Score(opts) {
  ObjectBase.call(this);

  this.color = 'green';
  this.fontSize = 18;
  this.fontStyle = 'sans-serif';
  this.scoreLabel = "Score: ";
  this.levelLabel = "Level: ";
  this.score = 0;
  this.level = 1;
  this.x = 780 - 10;
  this.y = 420;
  this.context = {};

  //set the options
  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Score.prototype = new ObjectBase();
Score.prototype.constructor = Score;
var ScoreProto = Score.prototype;


/**
 * Draws the score to the screen
 */
ScoreProto.draw = function () {
  var _this   = this,
      context = _this.context;

  context.font = _this.fontSize + "px " + _this.fontStyle;
  context.fillStyle = _this.color;
  context.textBaseline = "bottom";
  context.textAlign="right";
  context.fillText(this.scoreLabel + this.score + "  |  " + this.levelLabel + this.level, this.x, this.y);
};

/**
 * A single explosion particle
 */
function Particle() {
  this.scale = 1.0;
  this.x = 0;
  this.y = 0;
  this.radius = 20;
  this.color = "#000";
  this.velocityX = 0;
  this.velocityY = 0;
  this.scaleSpeed = 0.5;

  /**
   * Updates the position of the particle
   * @param  {[decimal]} ms [speed in milliseconds]
   */
  this.update = function (ms) {
    // shrinking
    this.scale -= this.scaleSpeed * ms / 1000.0;

    if (this.scale <= 0) {
      this.scale = 0;
    }
    // moving away from explosion center
    this.x += this.velocityX * ms / 1000.0;
    this.y += this.velocityY * ms / 1000.0;
  };

  /**
   * draws the explosion particle to the screen
   * @param  {[type]} context2D [description]
   * @return {[type]}           [description]
   */
  this.draw = function (context2D) {
    // translating the 2D context to the particle coordinates
    context2D.save();
    context2D.translate(this.x, this.y);
    context2D.scale(this.scale, this.scale);

    // drawing a filled circle in the particle's local space
    context2D.beginPath();
    context2D.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    context2D.closePath();

    context2D.fillStyle = this.color;
    context2D.fill();

    context2D.restore();
  };
}

/**
 * Background object with default props
 */
function Background(opts) {
  ObjectBase.call(this);

  this.yVelocity = 0;
  this.xVelocity = 0;
  this.width = 0;
  this.height = 0;
  this.color = "white";
  this.context = {};
  this.x = 0;
  this.y = 0;

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Background.prototype = new ObjectBase();
Background.prototype.constructor = Background;
var BackgroundProto = Background.prototype;

/**
 * Class Methods
 */

/**
 * Draw handles the background image dimensions and scrolling
 * behavior in the game loop
 */
BackgroundProto.draw = function () {
  if(this.x <= - this.width + 780){
    this.x = 0;
  }
  var scrollImg = document.getElementById('bgImg');
  this.context.drawImage(scrollImg,this.width-this.x,0,this.x,this.height, 0, 0, this.x,this.height);
  this.context.drawImage(scrollImg,this.x,0,this.width, this.height);
};

/**
 * Update simply increments the x axis value of the background
 * which handles scrolling speed.
 */
BackgroundProto.update = function () {
  this.x = this.x -4;
};

/**
 * Initialize the game!
 */
$('document').ready(function () {
  var g = new game();
  g.init();
});
