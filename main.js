var testState = function(game){
};

testState.prototype.preload = function() {
    this.game.load.tilemap('Level', 'TileMaps/TestLevel5.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('Textures', 'sprites/PlatformerTiles.png');
    this.game.load.spritesheet('ss', 'sprites/chickens.png', 32, 32);
}

testState.prototype.create = function() {
    game.camera.deadzone = new Phaser.Rectangle(window.innerWidth, window.innerHeight, 100*32, 10*32);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.flipped = false;
    
    this.map = this.game.add.tilemap('Level');
    this.map.addTilesetImage('PlatformerTiles', 'Textures');
    
    this.backgroundLayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('GroundLayer');
    this.flagLayer = this.map.createLayer('FlagLayer');
    
    this.map.setCollisionBetween(0, 24, true, 'GroundLayer');
    
    this.map.setTileIndexCallback(12, console.log("nice ron!"), this, this.flagLayer);
    
    this.sprite = this.game.add.sprite(0, 750, 'ss');
    this.sprite.frame = 1;
    this.sprite.anchor.setTo(.5, 1);
    
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    
    this.groundLayer.resizeWorld();
   
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2600;
    
    this.game.camera.follow(this.sprite);
    
    this.jumping = false;
    
    this.game.physics.setBoundsToWorld();
     
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);
}

//one sec fam

testState.prototype.update = function() {
    // Collide the player with the ground
    
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);

    if (this.leftInputIsActive()) {
        // If the LEFT key is down, set the player velocity to move left
        this.sprite.body.velocity.x = -300;
        this.flipped = true;
    } else if (this.rightInputIsActive()) {
        // If the RIGHT key is down, set the player velocity to move right
        this.sprite.body.velocity.x = 300;
        this.flipped = false;
    } else {
        this.sprite.body.velocity.x = 0;
    }
    
    if(this.flipped == true){
        this.sprite.scale.x = -1;
    } else {
        this.sprite.scale.x = 1;
    }

    // Set a variable that is true when the player is touching the ground
    var onTheGround = this.sprite.body.blocked.down;

    // If the player is touching the ground, let him have 2 jumps
    if (onTheGround) {
        this.jumps = 2;
        this.jumping = false;
    }

    // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
    if (this.jumps > 0 && this.upInputIsActive(150)) {
        this.sprite.body.velocity.y = -300;
        this.jumping = true;
    }

    // Reduce the number of available jumps if the jump input is released
    if (this.jumping && this.upInputReleased()) {
        this.jumps--;
        this.jumping = false;
    }
    
    if(this.sprite.body.position.y == 928){
        game.state.start('game');
    }
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
testState.prototype.leftInputIsActive = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x < this.game.width/4);

    return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
testState.prototype.rightInputIsActive = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

    return isActive;
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
testState.prototype.upInputIsActive = function(duration) {
    var isActive = false;

    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
        this.game.input.activePointer.x > this.game.width/4 &&
        this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

    return isActive;
};

// This function returns true when the player releases the "jump" control
testState.prototype.upInputReleased = function() {
    var released = false;

    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
    released |= this.game.input.activePointer.justReleased();

    return released;
};

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
game.state.add('game', testState, true);