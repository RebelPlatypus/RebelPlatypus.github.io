var Boot = function(game) { };

Boot.prototype = {

	preload: function() { 

		console.log("Boot loading started");
	},

	create: function() { 

		console.log("Boot processes finished");
		this.game.state.start('Preloader');
	},
}
