window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 1600, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'kitty'.
        //game.load.image( 'kitty', 'assets/Dogsmall.png' );
		game.load.image( 'punch', 'assets/punch.png' );
		game.load.image( 'logo2', 'assets/Dogsmall2.png' );
		game.load.image( 'logoL', 'assets/DogsmallLeft.png' );
		game.load.image( 'logo2L', 'assets/Dogsmall2Left.png' );
		game.load.image( 'bg', 'assets/BG2.png' );
		game.load.audio('woof', 'assets/woof.ogg');
		game.load.audio('meow', 'assets/meow.ogg');
		game.load.image('kitty', 'assets/cat.png');
		game.load.image('kitty2', 'assets/cat2.png');
    }
    
	var punchstart = 0;
    var kitty;
	var floor;
	var map;
	var cursors;
	var out;
	var linger;
	var height = false;
	var jumping = false;
	var woof;
	var meow;
	var jumps = 0;
	var loop = 1;
	var doggy2;
	var punch;
	var knockback = 0;
	var kitty;
	var currentxpos;
    
    function create() {
	game.add.tileSprite(0, 0, 1600, 400, 'bg');
        // Create a sprite at the center of the screen using the 'kitty' image.
        kitty = game.add.sprite( game.world.centerX, game.world.centerY, 'kitty' );
		punch = game.add.sprite( game.world.centerX, game.world.centerY);
		
		kitty.width = 200;
		
		kitty.height = 200;
		punch.width = 200;
		
		punch.height = 200;
		//kitty.body.width = 200;
        // so it will be truly centered.
		//kitty.animations.add('logo2', true);
		
        kitty.anchor.setTo( 20, -2 );
		punch.anchor.setTo( 32, -15 );
		
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( kitty, Phaser.Physics.ARCADE );
		game.physics.enable( punch, Phaser.Physics.ARCADE );
		
		// -----EXPERIMENT-----
		doggy2 = game.add.sprite( game.world.centerX, game.world.centerY, 'logoL' );
		game.physics.enable( doggy2, Phaser.Physics.ARCADE );
		doggy2.body.collideWorldBounds = true;
		doggy2.width = 200;
		doggy2.height = 100;
		doggy2.anchor.setTo( 0, -2 );
		doggy2.body.immovable = false;
		
		// -----EXPERIMENT OVER-----
		
		
        // Make it bounce off of the world bounds.
        kitty.body.collideWorldBounds = true;
		punch.body.collideWorldBounds = true;
		
		//adding in sound
		woof = game.add.audio('woof');
		woof.allowMultiple = true;
        woof.addMarker('woof1', 0, 1.0);
		meow = game.add.audio('meow');
		meow.allowMultiple = false;
        meow.addMarker('meow1', 0, 1.0);
		
		
        // Add some text using a CSS style.
        var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
        var text = game.add.text( 75, game.world.centerY, "Hello Dog", style );
		var style = { font: "25px Verdana", fill: "#000000", align: "center" };
		var text2 = game.add.text( 1250, game.world.centerY, "Goodbye Dog", style );
        text.anchor.setTo( 0.5, 0.0 );
		
		//game.camera.bounds = null;
		//game.camera.setSize(800, 400);
		game.camera.follow(kitty);
		
		
		cursors = game.input.keyboard.createCursorKeys();
		out = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		linger = 0;
    }
	
    
    function update() {
        // Accelerate the 'kitty' sprite towards the cursor,
        // accelerating at 250 pixels/second and moving no faster than 250 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //kitty.rotation = game.physics.arcade.accelerateToPointer( doggy, this.game.input.activePointer, 250, 250, 250 );
		// checking if dog has reached max height, then letting him fall
		if (linger > 0){
			doggy2.body.immovable = false;
			kitty.body.velocity.x = 0;
			}
		else{
			doggy2.body.immovable = true;
			game.physics.arcade.collide(kitty, doggy2);
			game.physics.arcade.collide(punch, doggy2);
			}
		if ( linger > 0 && game.physics.arcade.collide(punch, doggy2)){
			
			doggy2.body.immovable = false;
			if (woof.isPlaying == false){
				woof.play('woof1');
			}
			knockback += 1;
			}
		
		if (knockback > 0){
			if (knockback != 5){
			punch.body.velocity.x = 2000;
				knockback +=1;
				}
			else {
				knockback = 0;
				doggy2.body.velocity.x = 0;
				}
			}
		if (cursors.left.isDown && linger == 0){
			kitty.body.velocity.x  =-200;
			punch.body.velocity.x  =-200;
			}
			
			
		else if (cursors.right.isDown && linger == 0){
			kitty.body.velocity.x = 400;
			punch.body.velocity.x = 400;
			}
			else{
			kitty.body.velocity.x = 0;
			punch.body.velocity.x = 0;
			}
			
		if (out.isDown && linger == 0){
			punchstart = punch.body.x;
			punch.body.velocity.x += 2000;
			linger +=1;
			if (meow.isPlaying == false){
				meow.play('meow1');
				}
		}
		if (linger>0){
			if (linger == 20){
				linger = 0;
				punch.body.x = punchstart;
				kitty.width = 200;
				kitty.loadTexture('kitty');
				}
			else{
				linger +=1;
				//currentxpos = kitty.body.x;
				//kitty.body.width = 250;
				kitty.loadTexture('kitty2');
				//kitty.body.x = currentxpos;
				}
			}
		}
	}