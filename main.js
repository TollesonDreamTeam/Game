var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map;
var layer;
var sprite;
var cursors;

var enemyID;
var enemySprite;
var enemyStats;
var enemy;
var clickme;

function preload() {
    this.game.load.tilemap('Level', 'TileMaps/TestLevel.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('Textures', 'sprites/PlatformerTiles.png');
    this.game.load.spritesheet('ss', 'sprites/tm2.png', 32, 32);
}

function create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.map = this.game.add.tilemap('Level');
    this.map.addTilesetImage('PlatformerTiles', 'Textures');
    
    this.backgroundLayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('GroundLayer');
    
    this.map.setCollisionBetween(0, 24, true, 'GroundLayer');
    
    this.sprite = this.game.add.sprite(0, 750, 'ss');
    this.game.physics.arcade.enable(this.sprite);
    
    this.groundLayer.resizeWorld();
    
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2000;
    this.sprite.body.gravity.x = 20;
    this.sprite.body.velocity.x = 100;
    
    this.game.camera.follow(this.sprite);
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
}

//one sec fam

function update() {
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);
    
    if (this.cursors.up.isDown) {
        this.sprite.body.velocity.y = -500;
    }
}