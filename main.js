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
    this.game.load.tilemap('level1', 'TileMaps/tm1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('textures', 'sprites/tm2.png');
    this.game.load.spritesheet('ss', 'sprites/tm2.png', 32, 32);
}

function create() {
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    map = this.game.add.tilemap('level1');
    map.setCollisionByExclusion([22]);
    map.addTilesetImage('tilemap', 'textures');  
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
            
    sprite = this.game.add.sprite(200, 200, 'ss');
    this.game.physics.p2.enable(sprite);sprite.frame = 32;           
    sprite.collideWorldBounds = true;
    this.game.physics.p2.convertTilemap(map, layer);
    this.game.camera.follow(sprite);
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    cursors = this.game.input.keyboard.createCursorKeys();
}

function update() {
    sprite.body.setZeroVelocity();

    if (cursors.left.isDown) {
        sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown) {
        sprite.body.moveRight(400);
    }

    if (cursors.up.isDown) {
        sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown) {
        sprite.body.moveDown(400);
    }
}