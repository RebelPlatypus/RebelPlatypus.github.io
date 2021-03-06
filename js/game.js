var Game = function(game) { };

var flyer;
var music;
var background;
var filter;
var blocks;
var cracks;
var powerblock;
var bar;
var location;
var style = {font: "100px Arial", fill: "#ff0044", align: "center"};
var flyspeed;
var poweruptimer = 100;
var beardriving = false;
var rocketboost = false;
var cont = true; //Whether or not you keep playing. Becomes false when you win or lose.
var bullet;
var bulletup = false;
var snag = false;
var dark;
var emitter;

var uiGroup;
var progressBar;
var progressFlier;
var progressLine;

function controls(game){
	// Move the little guy!

	if(!snag){
		game.physics.arcade.moveToPointer(flyer,flyspeed);
	}
	else{
		blocks.forEach(checkpointer,this,true);
		cracks.forEach(checkpointer,this,true);
	}
}

function checkpointer(sprite){
//	console.log(Phaser.Input.activePointer)
	if(sprite.input.checkPointerOver(sprite.game.input.activePointer)){
		sprite.game.physics.arcade.moveToPointer(flyer,flyspeed);
	}
}
     
//WHat happens when you collide into a cracked brick.
function crumble(sprite, block){
	crash.play();
   	sprite.body.velocity.x = 0;
	block.damage(1);
	if(beardriving) {block.damage(49);}
//	flyspeed -= 150;
}
     
// We've got a winner!
function win() {
	location.content = "Progress: " + 100 + "%!";
	var text = "YOU WIN!";
	var t = flyer.game.add.text(flyer.game.camera.x+200, 0, text, style);
//	t.fixedToCamera = true;
//	t.cameraOffset.setTo(250,25);
	bar.kill();
	cont = false;
}

//Turns any block into a cracked block.
function createCrack(b){
	var c = cracks.create(b.body.x, b.body.y, 'crackblock');
	c.health = 50;
	c.body.immovable = true;
	c.scale.x = 0.5;
	c.scale.y = 0.5;
}
//When you collide with a power-up block, this activates the power up.
function powerup(sprite, block){
	returnToNormalcy(sprite);
	block.damage(10);
var r = Math.random();//Randomly determining which power-ups we get.
	if (r < .2){
		powerupsound.play();
		flyer.damage(1);
		flyer = sprite.game.add.sprite(sprite.body.x, sprite.body.y,'drivingbear');
		sprite.game.physics.enable(flyer, Phaser.Physics.ARCADE);
		sprite.game.camera.follow(flyer);
		beardriving = true;
	}
	else if (r < .4){
		powerupsound.play();
		pew.play();
		bullet = sprite.game.add.sprite(sprite.body.x, sprite.body.y,'bullet');
	    sprite.game.physics.enable(bullet, Phaser.Physics.ARCADE);
		bullet.body.velocity.x = 400;
		bulletup = true;
	}
	else if (r < .6){
		powerupsound.play();
		dark = sprite.game.add.sprite(sprite.body.x, sprite.body.y, 'dark');
		dark.fixedToCamera = true;
		dark.cameraOffset.setTo(0,0);
	}
	else if (r < .8){
		powerupsound.play();
		snag = true;
	}
	else{
		powerupsound.play();
		flyer.damage(1);
		flyer = sprite.game.add.sprite(sprite.body.x, sprite.body.y, 'rocketflyer');
		sprite.game.physics.enable(flyer, Phaser.Physics.ARCADE);
		flyer.body.setSize(40,30,10,20);
		sprite.game.camera.follow(flyer);
		flyspeed = 400;
		rocketboost = true;
	}
	poweruptimer = 150;
}

//After the power-up timer is up, this resets everything back to normal.
function returnToNormalcy(sprite){
	sprite.damage(1);
	bullet.damage(10);
    flyer = sprite.game.add.sprite(sprite.body.x,sprite.body.y,'flyer');
    sprite.game.physics.enable(flyer, Phaser.Physics.ARCADE);
    flyer.animations.add('fly');
    flyer.animations.play('fly',10,true);
	flyer.body.setSize(40,30,10,20);
    sprite.game.camera.follow(flyer);
	flyspeed = 300;
	beardriving=false;
	rocketboost=false;
	snag = false;
	powerdown.play();
}
function end(sprite, doom){
	death.play();
	sprite.damage(1);
	cont = false
	var text = "YOU LOSE!";
	var t = sprite.game.add.text(sprite.game.camera.x+200, 0, text, style);
	music.pause();
}
//What happens when the bullet collides into an object
function shoot(sprite, block){
	block.damage(50);
	sprite.body.velocity.x = 400;
}

Game.prototype = {
	     
	create: function() {
		
		console.log("Main Game Started");
	
		// Funky background!
        	background = this.game.add.sprite(0, 0, 'bg');
		    background.fixedToCamera = true;
        	//filter = this.game.add.filter('Plasma',800,600);
        	//background.filters = [filter];
	
        	// Moving onward!
        	this.game.world.setBounds(0,0,30000,600);

         
        	// Compatability for 2.0.3
        	this.game.physics.startSystem(Phaser.Physics.ARCADE);
			
			//audio sprites
			crash = this.game.add.audio('crash');
			death = this.game.add.audio('death');
			powerdown = this.game.add.audio('powerdown');
			powerupsound = this.game.add.audio('powerupsound');
			pew = this.game.add.audio('pew');
         	
			//rain!
			emitter = this.game.add.emitter(500, 0, 600);

			emitter.width = 1200;
			emitter.fixedToCamera = true;
			// emitter.angle = 30; // uncomment to set an angle for the rain.

			emitter.makeParticles('rain');

			emitter.minParticleScale = 0.2;
			emitter.maxParticleScale = 0.6;

			emitter.setYSpeed(300, 500);
			emitter.setXSpeed(-5, 5);

			emitter.minRotation = 0;
			emitter.maxRotation = 0;

			emitter.start(false, 1600, 1, 0);
			
        	// Playable character
        	flyer = this.game.add.sprite(300,200,'flyer');
        	this.game.physics.enable(flyer, Phaser.Physics.ARCADE);
        	flyer.animations.add('fly');
        	flyer.animations.play('fly',10,true);
			flyer.body.setSize(40,30,10,20);
        	this.game.camera.follow(flyer);
			flyspeed = 300;
			
         //Block creation
        	// Create stone blocks
        	blocks = this.game.add.group();
			blocks.enableBody = true;
			blocks.physicsBodyType = Phaser.Physics.ARCADE;
		
			//Create cracked blocks
			cracks = this.game.add.group();
			cracks.enableBody = true;
			cracks.physicsBodyType = Phaser.Physics.ARCADE;
			
			//Create powerup blocks
			powerblock = this.game.add.group();
			powerblock.enableBody = true;
			powerblock.physicsBodyType = Phaser.Physics.ARCADE;
			
			//Create bullet
			bullet = this.game.add.sprite(300,200, 'bullet');
			this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
			bullet.damage(10);
	
			//Placing the blocks
        	for(var i = 0; i<1500; i++){
        		var b;
				var y = this.game.world.randomY;
				//Determining if the blocks are cracked or not.
				if(i%40 == 0){
					b = powerblock.create(this.game.rnd.integerInRange(700, 30000), y, 'powerup');
					b.health = 1;
				}
				else if(Math.abs(y-300) < 300*Math.random()){
					b = cracks.create(this.game.rnd.integerInRange(700, 30000), y, 'crackblock');
					b.health = 50;
				}
				else{
					b = blocks.create(this.game.rnd.integerInRange(700, 30000), y, 'stoneblock');
					b.events.onKilled.add(function(b) {createCrack(b);}, this);//When the block is 'destroyed', it becomes cracked.
					b.health = 50;
				}
				b.body.immovable = true;
				b.inputEnabled = true;
				b.scale.x = 0.5;
				b.scale.y = 0.5;
        	}
         
        	// Beware the bar
        	bar = this.game.add.sprite(0,0,'bar');
		this.game.physics.enable(bar, Phaser.Physics.ARCADE);
        	bar.body.velocity.x = 213;
        	bar.body.setSize(20,600,100,0);
         
		// UI Setup
		uiGroup = this.game.add.group(null, 'UI');
		progressBar = this.game.add.sprite(100, 515, 'loadingBar');
		progressBar.fixedToCamera = true;
	
		progressFlyer = this.game.add.sprite(100, 500,'flyer');
        	progressFlyer.animations.add('fly');
        	progressFlyer.animations.play('fly',10,true);
		progressFlyer.fixedToCamera = true;
		
		progressBar = this.game.add.sprite(100, 515, 'progressBar');
		progressBar.fixedToCamera = true;

        	music = this.game.add.audio('madeon',1,true);
        	music.play('',0,1,true);
 	},

	update: function() { 

		controls(this.game);
         
        	// Filter changes
        	//filter.update();
        	//filter.blueShift -=0.001;
         
        	// Update game progress
        	var distance = Math.floor(((flyer.body.x)/30000)*100);
        	location.content = "Progress: " + distance + "%";

		//Updates the UI
		progressFlyer.fixedToCamera = false;
		progressFlyer.x = 100 + (600 * (flyer.x/30000));
		progressFlyer.fixedToCamera = true;

		progressBar.fixedToCamera = false;
		progressBar.x = 100 + (600 * (bar.x/30000));
		progressBar.fixedToCamera = true;
         
       
		
        	// Death by bar
//        	this.game.physics.arcade.overlap(flyer, bar, death, null, this);
			
        	// Difficulty increase
			if(flyer.x >= 0){
				bar.body.velocity.x = 200;
			}
			
        	if(flyer.x >=10000){
        	    bar.body.velocity.x = 250;
        	}
         
        	// SUPER HARD MODE
        	if(flyer.x >=20000){
        	    bar.body.velocity.x=300;
        	}
			
			//Slow down the bar when the game gets screwy.
			if(snag){
				bar.body.velocity.x = 200;
			}
         
        	// Collisions
        	this.game.physics.arcade.collide(flyer, blocks);
			this.game.physics.arcade.collide(flyer, cracks, crumble);
			this.game.physics.arcade.collide(flyer, powerblock, powerup);
			this.game.physics.arcade.collide(bullet, blocks, shoot);
			this.game.physics.arcade.collide(bullet, cracks, shoot);
			this.game.physics.arcade.collide(flyer, bar, end);

			
			//Wearing off powerups
			if((beardriving||rocketboost||bulletup||snag)&&cont){
				poweruptimer -= 1;
				if(poweruptimer == 0){
					returnToNormalcy(flyer);
				}
			}
         
        	// Winning!
        	if(flyer.body.x>=29700){
        		win();
        	}
	}
};
