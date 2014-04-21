var Game = function(game) { };

var flyer;
var music;
var background;
var filter;
var blocks;
var bar;
var location;
var style = {font: "100px Arial", fill: "#ff0044", align: "center"};

function controls(){
	// Move the little guy!
	if(game.input.mousePointer.isDown){
		game.physics.arcade.moveToPointer(flyer,300);
	}
}
     
// Kill a flyer caught by the bar
function death(){
	flyer.kill();
	var text = "YOU LOSE!";
	var t = game.add.text(game.camera.x+200, 0, text, style);
	music.pause();
}
     
// We've got a winner!
function win() {
	location.content = "Progress: " + 100 + "%!";
	var text = "YOU WIN!";
	var t = game.add.text(0, 0, text, style);
	t.fixedToCamera = true;
	t.cameraOffset.setTo(250,25);
	bar.kill();
}

Game.prototype = {

	     
	create: function() {

		// Funky background!
       		background = game.add.sprite(0,0);
        	background.width = 800;
        	background.height = 600;
        	filter = game.add.filter('Plasma',800,600);
        	background.filters = [filter];
         
        	// Moving onward!
        	game.world.setBounds(0,0,30000,600);
         
        	// Compatability for 2.0.3
        	game.physics.startSystem(Phaser.Physics.ARCADE);
        	game.physics.enable(flyer, Phaser.Physics.ARCADE);
         
        	// Playable character
        	flyer = game.add.sprite(300,200,'flyer');
        	flyer.animations.add('fly');
        	flyer.animations.play('fly',10,true);
        	game.camera.follow(flyer);
        	flyer.body.collideWorldBounds = true;
        	flyer.body.setRectangle(40,30,10,20);
         
        	// Create random blocks
        	blocks = game.add.group();
        	for(var i = 0; i<1500; i++){
        		blocks.create(game.world.randomX, game.world.randomY, 'block');
        	}
        	blocks.setAll('body.immovable',true);
         
        	// Beware the bar
        	bar = game.add.sprite(0,0,'bar');
        	bar.body.velocity.x = 220;
        	bar.body.setRectangle(20,600,100,0);
         
        	// Update text
        	var t1 = game.add.text(10000, 0, "10,000!", style);
        	var t2 = game.add.text(20000, 0, "20,000!", style); 
        	location = game.add.text(0,0, "Progress: 0%", {font: "50px Arial", fill: "#ffffff", align: "center"});
        	location.fixedToCamera = true;
        	location.cameraOffset.setTo(260,525);
         
        	// Music
        	music = game.add.audio('madeon',1,true);
        	music.play('',0,1,true);
 	},

	update: function() { 

		controls();
         
        	// Filter changes
        	filter.update();
        	filter.blueShift -=0.001;
         
        	// Update game progress
        	var distance = Math.floor(((flyer.body.x)/30000)*100);
        	location.content = "Progress: " + distance + "%";
         
        	// Death by bar
        	game.physics.arcade.overlap(flyer, bar, death, null, this);
 
        	// Difficulty increase
        	if(flyer.x >=10000){
        	    bar.body.velocity.x = 250;
        	}
         
        	// SUPER HARD MODE
        	if(flyer.x >=20000){
        	    bar.body.velocity.x=300;
        	}
         
        	// Collisions
        	game.physics.arcade.collide(flyer, blocks);
         
        	// Winning!
        	if(flyer.body.x>=29700){
        		win();
        	}
	}	
	

};
