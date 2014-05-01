var Menu = function(game) { };

Menu.prototype = {

	preload: function() { },

	create: function() { 

		console.log("Main Menu Entered");
		this.game.state.start('Game');
	},

};
