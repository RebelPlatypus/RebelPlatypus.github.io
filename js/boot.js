var Boot = function(game) { };

Boot.prototype = {

	preload: function() { 

		console.log("Boot loading started");
		 this.load.image('loadingBar', 'assets/sprites/load.png');
		 this.load.image('backgroundLoad', 'assets/sprites/lbackground.png');
	},

	create: function() { 

		console.log("Boot processes finished");
		this.game.state.start('Preloader');
	},
}
