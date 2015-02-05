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
    
    var game = new Phaser.Game( 1925, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/Dogsmall.png' );
		game.load.image( 'logo2', 'assets/Dogsmall2.png' );
		game.load.image( 'bg', 'assets/BG.png' );
		game.load.audio('woof', 'assets/woof.ogg');
    }
    
    var bouncy;
	var floor;
	var map;
	var cursors;
	var jump;
	var height = false;
	var jumping = false;
	var woof;
    
    function create() {
	game.add.tileSprite(0, 0, 2000, 400, 'bg');
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
		bouncy.width = 200;
		bouncy.height = 100;
        // so it will be truly centered.
		bouncy.animations.add('Dogsmall2', true);
        bouncy.anchor.setTo( 20, -2 );
		
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
		
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
		
		//adding in sound
		woof = game.add.audio('woof');
		woof.allowMultiple = true;
        woof.addMarker('woof1', 0, 1.0);
		
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
        var text = game.add.text( 75, game.world.centerY, "Hello Dog", style );
        text.anchor.setTo( 0.5, 0.0 );
		cursors = game.input.keyboard.createCursorKeys();
		jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 250 pixels/second and moving no faster than 250 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 250, 250, 250 );
		// checking if dog has reached max height, then letting him fall
		if (bouncy.body.velocity.y == 500)
			{
				height = false;
				bouncy.body.velocity.y = 0;
			}
		if (height){
			bouncy.body.velocity.y += 25;
			
		}
		// checking if dog is moving left or right, and if the player wants to accellerate
		if (bouncy.body.velocity.x < 0 && cursors.left.isDown){
			bouncy.body.velocity.x -= 25;
			}
		if (bouncy.body.velocity.x > 0 && cursors.right.isDown){
		bouncy.body.velocity.x += 25
		}
		if (jumping)
		{
			bouncy.body.velocity.y += 25;
			if (bouncy.body.velocity.y == 0)
			{
				height = true;
				jumping = false;
			}
		}
		if (cursors.left.isDown && bouncy.body.velocity.x >= 0)
		{
			bouncy.body.velocity.x =-25;
			//player.animations.play('Dogsmall2');
		}
		
		if (cursors.right.isDown && bouncy.body.velocity.x <= 0)
		{
			bouncy.body.velocity.x=+25;
		}
		// starting a jump
		if (jump.isDown && height == false && bouncy.body.velocity.y == 0){
			bouncy.body.velocity.y = -500;
			jumping = true;
			woof.play('woof1');
			}
    }
};
