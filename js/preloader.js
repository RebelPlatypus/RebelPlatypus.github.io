var Preloader = function(game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
 };

Preloader.prototype = {

	preload: function() {

		//ADD PRELOAD BAR LOADING AND STARTING HERE!!!
		// ^WHAT THIS SAYS!!

		game.load.spritesheet('flyer','assets/sprites/flying.png',63,65,5);
       		game.load.audio('madeon',['assets/music/cutthekid.mp3']);
        	game.load.script('filter','assets/sprites/Plasma.js');
        	game.load.image('block','assets/sprites/default.png');
        	game.load.image('bar','assets/sprites/BAR.png');	

 	},

	create: function() {

		//Use this for when the loading is done, remove crop and such
	},

	update: function() { 

		//Waits for the music to finish loading

   		if (this.cache.isSoundDecoded('music') && this.ready == false)
		{
			this.ready = true;
			this.game.state.start('MainMenu');
		}
	}

};
