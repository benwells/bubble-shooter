

//canvas initialization///////////////////////////////////
// var CANVAS_WIDTH = 780;
// var CANVAS_HEIGHT = 420;
// var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
//                       "' height='" + CANVAS_HEIGHT + "'></canvas>");
// var canvas = canvasElement.get(0).getContext("2d");
// canvasElement.appendTo('#container');

//number protyping////////////////////////////////////////
// Number.prototype.clamp = function(min, max) {
//   return Math.min(Math.max(this, min), max);
// };

//Game Loop///////////////////////////////////////////////
// var FPS = 30;
// setInterval(function() {
//   update();
//   draw();
// }, 1000/FPS);

// var shot = false;
//update function/////////////////////////////////////
// function update() {
//   if (keydown.space && shot == false){
//     shot = true
//     player.shoot(); 
//   }
//   else if (!keydown.space){
//     shot = false;
//   }
	
// 	if (keydown.up) {
//     player.y -= 15;
//   }

//   if (keydown.down) {
//     player.y += 15;
//   }

//   //clamps the player to the canvas
//   player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);

//   playerBullets.forEach(function(bullet) {
//     bullet.update();
//   });

//   playerBullets = playerBullets.filter(function(bullet) {
//     return bullet.active;
//   });

//   enemies.forEach(function(enemy) {
//     enemy.update();
//   });

//   enemies = enemies.filter(function(enemy) {
//     return enemy.active;
//   });

//   if(Math.random() < 0.05) {  //this number controls the frequency of enemies
//     enemies.push(Enemy());
//   }

//   //collision detection
//   enemies.forEach(function(enemy) {
//     playerBullets.forEach(function(bullet){

//       if (bullet.x > enemy.x && 
//           bullet.x < (enemy.x + enemy.width) &&
//           bullet.y > enemy.y &&
//           bullet.y < (enemy.y + enemy.height)){
//         // console.log('collision')
//         enemy.explode()
//         var current_score = parseInt($('#score').html())
//         current_score += 10
//         $('#score').html(current_score)
//         bullet.active = false;
//       }
//     })
//   });


// }

//draw function/////////////////////////////////////////
// function draw() {
// 	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
// 	player.draw();

//   playerBullets.forEach(function(bullet) {
//     bullet.draw()
//   });

//   enemies.forEach(function(enemy) {
//     enemy.draw();
//   });

// }

// var player = {
//   color: "#00A",
//   x: 40,
//   y: 100,
//   width: 32,
//   height: 32,
//   draw: function() {
//     canvas.fillStyle = this.color;
//     canvas.fillRect(this.x, this.y, this.width, this.height);
//   }
// };

// var playerBullets = [];

// player.shoot = function(){
//   var bulletPosition = this.midpoint();
//   playerBullets.push(Bullet({
//     speed: 20,
//     x: bulletPosition.x,
//     y: bulletPosition.y
//   }));
// }

// player.midpoint = function() {
//   return {
//     x: this.x + this.width/2,
//     y: this.y + this.height/2
//   };
// };

// function Bullet(I) {
//   I.active = true;

//   I.yVelocity = 0;
//   I.xVelocity = I.speed;  
//   I.width = 3;
//   I.height = 3;
//   I.color = "#000";

//   I.inBounds = function() {
//     return I.x >= 0 && I.x <= CANVAS_WIDTH &&
//       I.y >= 0 && I.y <= CANVAS_HEIGHT;
//   };

//   I.draw = function() {
//     canvas.fillStyle = this.color;
//     canvas.fillRect(this.x, this.y, this.width, this.height);
//   };

//   I.update = function() {
//     I.x += I.xVelocity;
//     I.y += I.yVelocity;

//     I.active = I.active && I.inBounds();
//   };

//   return I;
// }

 // enemies = [];

// function Enemy(I) {
//   I = I || {};

//   I.active = true;
//   I.age = Math.floor(Math.random() * 128);

//   I.color = "#A2B";

//   I.x = CANVAS_WIDTH;
//   I.y = CANVAS_HEIGHT / 4 + Math.random() * CANVAS_HEIGHT / 2;
//   I.xVelocity = 3;
//   I.yVelocity = 0;

//   I.width = 20;
//   I.height = 20;

//   I.inBounds = function() {
//     return I.x >= 0 && I.x <= CANVAS_WIDTH &&
//       I.y >= 0 && I.y <= CANVAS_HEIGHT;
//   };

//   I.draw = function() {
//     canvas.fillStyle = this.color;
//     canvas.fillRect(this.x, this.y, this.width, this.height);
//   };

//   I.update = function() {
//     I.x -= I.xVelocity;
//     I.y += I.yVelocity;

//     //controls the "back and forth" motion of enemy
//     I.yVelocity = 3 * Math.sin(I.age * Math.PI / 64); 

//     I.age++;

//     I.active = I.active && I.inBounds();
//   };

//   I.explode = function(){
//     I.color = "#000"
//     // I.y += 200;
//     I.active = false;
//   }

//   return I;
// }; //end Enemy function


