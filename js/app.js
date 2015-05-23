// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Every enemy starts from the leftmost side and a random row and has random speed
    this.x = -101;
    this.y = 60 + Math.floor(Math.random() * 3) * 83;
    this.speed = (Math.random() * 3 + 0.5) * 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // If the enemy moves out of the screen, then starts from the left side again, with random row and speed
    if (this.x >= 505) {
        this.x = -101;
        this.y = 60 + Math.floor(Math.random() * 3) * 83;
        this.speed = (Math.random() * 3 + 0.5) * 101;
    }
    // If the enemy and player collide with each other
    if (((385 - player.y) / 83 + (this.y - 60) / 83) == 4 && this.x + 80 > player.x && player.x + 80 > this.x) {
        player.x = 202;
        player.y = 385;
        score -= 10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    // The player starts from the center
    this.x = 202;
    this.y = 385;
};

Player.prototype.update = function(dt) {
    // Nothing to be done for the player on each update
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    // Four kinds of inputs
    switch(input) {
        case 'left':
            // Move left, if out of screen, appear on the other side
            if (this.x > 0) this.x -= 101;
            else this.x = 404;
            break;
        case 'right':
            // Move right, if out of screen, appear on the other side
            if (this.x < 404) this.x += 101;
            else this.x = 0;
            break;
        case 'up':
            // Move up towards the river, when the player reaches there, starts from the beginning and gets scores
            if (this.y > 53) this.y -= 83;
            else {
                this.y = 385;
                this.x = 202;
                score += 15;
            }
            break;
        case 'down':
            // Move down, unless already at bottom
            if (this.y < 385) this.y += 83;
            break;
        default:
            break;
    }
};

// TODO: A Treasure class representing the gem and other stuff that can be collected

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
};
var player = new Player();
var score = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
