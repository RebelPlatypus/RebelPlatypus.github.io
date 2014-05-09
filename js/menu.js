var Menu = function(game) { };
	
	function startGame (pointer) {
	
		this.game.state.start('Game');

	}

Menu.prototype = {

	preload: function() { 
		
	},
	
	
	create: function() { 
		
		console.log("Main Menu Entered");
		//this.game.state.start('Game');
		
		this.background = this.add.sprite(0, 0, 'backgroundLoad');
		this.playButton = this.add.button(300, 350, 'playButton', startGame, this, 'buttonHover.png', 'button.png', 'buttonHover.png');

		this.titleText = "Escape Flyer"
		this.style = { font: "85px Jokerman", fill: "#ff0044", align: "center" };
		this.title = this.add.text(this.game.world.centerX, this.game.world.centerY-100, this.titleText, this.style);
		this.title.anchor.setTo(0.5, 0.5);
	},

};
