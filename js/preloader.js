var Preloader = function(game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
 };

Preloader.prototype = {

	preload: function() {

		console.log("Preloader starting");
		
		this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'backgroundLoad');
		this.background.anchor.setTo(0.5, 0.5);

		this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
		this.loadingBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.loadingBar);
		//this.background = this.add.sprite(0, 0, 800, 800, 'backgroundLoad');

		this.load.spritesheet('flyer','assets/sprites/flying.png',63,65,5);
		this.load.spritesheet('rain', 'assets/sprites/rain.png', 17, 17);
       		this.load.audio('button','assets/sounds/button.wav');
			this.load.audio('crash','assets/sounds/crash.wav');
			this.load.audio('death','assets/sounds/death.wav');
			this.load.audio('ominous','assets/sounds/ominous.wav');
			this.load.audio('pew','assets/sounds/pew.wav');
			this.load.audio('powerdown','assets/sounds/powerdown.wav');
			this.load.audio('powerupsound','assets/sounds/powerup.wav');
			this.load.audio('thump','assets/sounds/thump.wav');
			this.load.audio('turkey','assets/sounds/turkey.wav');
			this.load.audio('madeon','assets/sounds/cutthekid.wav');
        	this.load.script('filter','assets/effects/Plasma.js');
        	this.load.image('bar','assets/sprites/BAR.png');
			this.load.image('bg','assets/sprites/rainbackground.png');	
			this.load.image('stoneblock','assets/sprites/RockTile.jpg');
			this.load.image('crackblock','assets/sprites/RockCrackTile.jpg');
			this.load.image('drivingbear','assets/sprites/BearIsDriving.png');
			this.load.image('powerup','assets/sprites/PowerUpBlock.jpg');
			this.load.image('rocketflyer', 'assets/sprites/RocketFlyer.png');
			this.load.image('bullet', 'assets/sprites/VisitorBullet.png');
			this.load.image('dark', 'assets/sprites/Darkness.png');
			this.load.image('progressBar', 'assets/sprites/progressBar.png');
		
		console.log("Resources loaded");
 	},

	create: function() {

		//Use this for when the loading is done, remove crop and such
	},

	update: function() { 


		//Temporary Music loading bypass
		//console.log("Preloader processes finished");
		//this.game.state.start('MainMenu');

		//Waits for the music to finish loading

   		if (this.cache.isSoundDecoded('madeon') && this.ready == false)
		{
			console.log("Preloader processes finished");
			this.ready = true;
			this.game.state.start('MainMenu');
		}
	}

};
