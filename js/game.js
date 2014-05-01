var Game = function(game) { };

var flyer;
var music;
var background;
var filter;
var blocks;
var bar;
var location;
var style = {font: "100px Arial", fill: "#ff0044", align: "center"};

function controls(game){
	// Move the little guy!

	//if(game.input.mousePointer.isDown){
		game.physics.arcade.moveToPointer(flyer,300);
	//}
}
     
// Kill a flyer caught by the bar
function death(){
	flyer.kill();
	var text = "YOU LOSE!";
	var t = this.game.add.text(this.game.camera.x+200, 0, text, style);
	//music.pause();
}
     
// We've got a winner!
function win() {
	location.content = "Progress: " + 100 + "%!";
	var text = "YOU WIN!";
	var t = this.game.add.text(0, 0, text, style);
	t.fixedToCamera = true;
	t.cameraOffset.setTo(250,25);
	bar.kill();
}

Game.prototype = {

	     
	create: function() {
		
		console.log("Main Game Started");

		// Funky background!
        	background = this.game.add.sprite(0,0);
        	background.width = 800;
        	background.height = 600;
        	filter = this.game.add.filter('Plasma',800,600);
        	background.filters = [filter];
	
        	// Moving onward!
        	this.game.world.setBounds(0,0,30000,600);
         
        	// Compatability for 2.0.3
        	this.game.physics.startSystem(Phaser.Physics.ARCADE);
         
        	// Playable character
        	flyer = this.game.add.sprite(300,200,'flyer');
        	this.game.physics.enable(flyer, Phaser.Physics.ARCADE);
        	flyer.animations.add('fly');
        	flyer.animations.play('fly',10,true);
		flyer.body.setSize(40,30,10,20);
        	this.game.camera.follow(flyer);
         
        	// Create random blocks
        	blocks = this.game.add.group();
		blocks.enableBody = true;
		blocks.physicsBodyType = Phaser.Physics.ARCADE;

        	for(var i = 0; i<1500; i++){
        		var b = blocks.create(this.game.world.randomX, this.game.world.randomY, 'block');
			b.body.immovable = true;
        	}
         
        	// Beware the bar
        	bar = this.game.add.sprite(0,0,'bar');
		this.game.physics.enable(bar, Phaser.Physics.ARCADE);
        	bar.body.velocity.x = 220;
        	bar.body.setSize(20,600,100,0);
         
        	/*// Update text
        	var t1 = this.game.add.text(10000, 0, "10,000!", style);
        	var t2 = this.game.add.text(20000, 0, "20,000!", style); 
        	location = this.game.add.text(0,0, "Progress: 0%", {font: "50px Arial", fill: "#ffffff", align: "center"});
        	//location.fixedToCamera = true;
        	//location.cameraOffset.setTo(260,525);
         
        	// Music
        	music = this.game.add.audio('madeon',1,true);
        	music.play('',0,1,true);*/
 	},

	update: function() { 

		controls(this.game);
         
        	// Filter changes
        	filter.update();
        	filter.blueShift -=0.001;
         
        	// Update game progress
        	var distance = Math.floor(((flyer.body.x)/30000)*100);
        	location.content = "Progress: " + distance + "%";
         
        	// Death by bar
        	this.game.physics.arcade.overlap(flyer, bar, death, null, this);
 
        	// Difficulty increase
        	if(flyer.x >=10000){
        	    bar.body.velocity.x = 250;
        	}
         
        	// SUPER HARD MODE
        	if(flyer.x >=20000){
        	    bar.body.velocity.x=300;
        	}
         
        	// Collisions
        	this.game.physics.arcade.collide(flyer, blocks);
         
        	// Winning!
        	if(flyer.body.x>=29700){
        		win();
        	}
	}	
	

};
