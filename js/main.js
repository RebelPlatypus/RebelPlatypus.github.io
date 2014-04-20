window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to an empty string ''.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
     
    "use strict";
     
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );  
     
    function preload() {
        game.load.spritesheet('flyer','assets/flying.png',63,65,5);
        game.load.audio('madeon',['assets/cutthekid.mp3']);
        game.load.script('filter','assets/Plasma.js');
        game.load.image('block','assets/default.png');
        game.load.image('bar','assets/BAR.png');
    }
     
    var flyer;
    var music;
    var background;
    var filter;
    var blocks;
    var bar;
    var location;
    var style = {font: "100px Arial", fill: "#ff0044", align: "center"};
     
    function create() {
        // Funky background!
        background = game.add.sprite(0,0);
        background.width = 800;
        background.height = 600;
        filter = game.add.filter('Plasma',800,600);
        background.filters = [filter];
         
        // Moving onward!
        game.world.setBounds(0,0,30000,600);
         
         // Compatability for 2.0.0
         game.physics.enable(flyer, Phaser.Physics.P2);
         
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
    }
     
    function update() {
        controls();
         
        // Filter changes
        filter.update();
        filter.blueShift -=0.001;
         
        // Update game progress
        var distance = Math.floor(((flyer.x)/30000)*100);
        location.content = "Progress: " + distance + "%";
         
        // Death by bar
        game.physics.overlap(flyer, bar, death, null, this);
 
        // Difficulty increase
        if(flyer.x >=10000){
            bar.body.velocity.x = 250;
        }
         
        // SUPER HARD MODE
        if(flyer.x >=20000){
            bar.body.velocity.x=300;
        }
         
        // Collisions
        game.physics.collide(flyer, blocks);
         
        // Winning!
        if(flyer.x>=29700){
            win();
        }
    }
     
    function render(){
        game.debug.renderBodyInfo(flyer,32,32);
        game.debug.renderCameraInfo(game.camera,32,32);
    }
     
    function controls(){
        // Move the little guy!
        if(game.input.mousePointer.isDown){
            game.physics.moveToPointer(flyer,300);
            // But not when he's already there!
            if(Phaser.Rectangle.contains(flyer.body, game.input.x, game.input.y)){
                flyer.body.velocity.setTo(0,0);
            }
        }
        else{
            flyer.body.velocity.setTo(0,0);
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
    function win(){
        location.content = "Progress: " + 100 + "%!";
        var text = "YOU WIN!";
        var t = game.add.text(0, 0, text, style);
        t.fixedToCamera = true;
        t.cameraOffset.setTo(250,25);
        bar.kill();
    }
};
