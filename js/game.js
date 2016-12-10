
// HTML5 canvas width and height in pixels
var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,
    
    delayToStartLevel: 3,
};






// List of all game states
var states = {
    main: "main",
    game: "game",
};







// List of sprites and their properties
var graphicAssets = {
    
    ship:{URL:'/js/assets/ship1.png', name:'ship'},
    bullet:{URL:'/js/assets/bullet.png', name:'bullet'},
    
    asteroidLarge:{URL:'/js/assets/asteroidLarge.png', name:'asteroidLarge'},
    asteroidMedium:{URL:'/js/assets/asteroidMedium.png', name:'asteroidMedium'},
    asteroidSmall:{URL:'/js/assets/asteroidSmall.png', name:'asteroidSmall'},
    
    background:{URL:'/js/assets/background.png', name:'background'},
    explosionLarge:{URL:'/js/assets/explosionLarge.png', name:'explosionLarge', width:64, height:64, frames:8},
    explosionMedium:{URL:'/js/assets/explosionMedium.png', name:'explosionMedium', width:58, height:58, frames:8},
    explosionSmall:{URL:'/js/assets/explosionSmall.png', name:'explosionSmall', width:41, height:41, frames:8},
};

/*
var soundAssets = {
	fire:{URL:[], name:},
	destroy:{URL:[], name:},
};
*/







var shipProperties = {
	
	// Starting position
    startX: gameProperties.screenWidth * 0.5,
    startY: gameProperties.screenHeight * 0.5,
    
    // How fast the ship increases velocity
    acceleration: 300,
    // friction that slows down the ship
    drag: 100,
    // maximum movement velocity for our ship
    maxVelocity: 300,
    // how fast the ship can rotate
    angularVelocity: 200,
    
    startingLives: 3,
    timeToReset: 3,
    blinkDelay: 0.2,
};






var bulletProperties = {
	
	// veclocity of bullet
	speed: 400,
	// how fast you can shoot (here it is 1 round every .25 sec)
	interval: 250,
	// how long the bullet lasts in the game before fading
	lifespan: 2000,
	// max number of bullets at a given time
	maxCount: 30,
};







var asteroidProperties = {
	// number of asteroids that appear at the start of the game
	startingAsteroids: 3,
	// max number of asteroids that will appear
	maxAsteroids: 20,
	// after each round we increase the number of asteroids that appear by 2
	incrementAsteroids: 1,
	
	// Different types of asteroids and their respective properties
	asteroidLarge: { minVelocity: 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: graphicAssets.asteroidMedium.name, pieces: 2, explosion:'explosionLarge'},
    asteroidMedium: { minVelocity: 50, maxVelocity: 175, minAngularVelocity: 0, maxAngularVelocity: 200, score: 50, nextSize: graphicAssets.asteroidSmall.name, pieces: 2, explosion:'explosionMedium'},
    asteroidSmall: { minVelocity: 50, maxVelocity: 200, minAngularVelocity: 0, maxAngularVelocity: 200, score: 100, explosion:'explosionSmall'},
};





// The properties of the text that appears in the game
var fontAssets = {
	counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align:'center'},
};






// Place to define things like private variables
var gameState = function(game) {
    this.shipSprite;
    this.shipIsInvulnerable;
    
    // keys that will be used
    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;
    
    this.bulletGroup;
    this.bulletInterval = 0;
    
    this.asteroidGroup;
    this.asteroidsCount = asteroidProperties.startingAsteroids;
    
    // the player's remaining lives
    this.shipLives = shipProperties.startingLives;
    // used to display the lives counter
    this.lives_label;
    
    this.score = 0;
    this.score_label;
    
    this.backgroundSprite;
    
    // As it’s possible to have many of the same explosion sprites occurring during game play, 
    // we’ll put each explosion size into its own group
    this.explosionLargeGroup;
    this.explosionMediumGroup;
    this.explosionSmallGroup;
};








// Place to define functions that act on the game
gameState.prototype = {
    
    // loads all game assets (images,sounds,etc.)
    preload: function () {
    	// Load the images using the URL given in p2 with the identifier given in p1
        game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);
		game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
		game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);

		game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
		game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
		
		game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
        
        // Loading spritesheets is different so we use the spritesheet function
        // key : unique asset key of the sheet file
		// url : URL of the sprite sheet file
		// frameWidth : width in pixels of a single frame in the sprite sheet
		// frameHeight : height in pixels of a single frame in the sprite sheet
		// frameMax : number of frames in this sprite sheet
        game.load.spritesheet(graphicAssets.explosionLarge.name, graphicAssets.explosionLarge.URL, graphicAssets.explosionLarge.width, graphicAssets.explosionLarge.height, graphicAssets.explosionLarge.frames);
        game.load.spritesheet(graphicAssets.explosionMedium.name, graphicAssets.explosionMedium.URL, graphicAssets.explosionMedium.width, graphicAssets.explosionMedium.height, graphicAssets.explosionMedium.frames);
        game.load.spritesheet(graphicAssets.explosionSmall.name, graphicAssets.explosionSmall.URL, graphicAssets.explosionSmall.width, graphicAssets.explosionSmall.height, graphicAssets.explosionSmall.frames);
    },
    
    
    
    // first function to run after all game assets have been loaded
    create: function () {
    	// adds the necessary graphics to the canvas
        this.initGraphics();
        // sets the physics attributes for each of the sprites
        this.initPhysics();
        // maps our key variables to keys of the key board
        this.initKeyboard();
        // Creates asteroids and randomly positions their sprites and sets their physics attributes
        this.resetAsteroids();
    },



    // the game loop, this code is repeatedly run 60 times per second
    update: function () {
        this.checkPlayerInput();
        this.checkBoundaries(this.shipSprite);
        this.bulletGroup.forEachExists(this.checkBoundaries, this);
        this.asteroidGroup.forEachExists(this.checkBoundaries, this);
        
        // see if bullet group and asteroid group overlap and if so call asteroidCollision()
        // which will kill the sprites
        game.physics.arcade.overlap(this.bulletGroup, this.asteroidGroup, this.asteroidCollision, null, this);
        
        // see if ship and the asteroids overlap and if so call asteroidCollision() which will kill
        // the sprites
        if (!this.shipIsInvulnerable) {
        	game.physics.arcade.overlap(this.shipSprite, this.asteroidGroup, this.asteroidCollision, null, this);
        }
        
    },




    initGraphics: function() {
    
    	this.backgroundSprite = game.add.sprite(0, 0, graphicAssets.background.name);
		
		// this makes the ship appear on the screen at the given x,y position
		this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
		this.shipSprite.angle = -90;
		// make ship rotate around its center
		this.shipSprite.anchor.set(0.5, 0.5);
		
		this.bulletGroup = game.add.group();
		this.asteroidGroup = game.add.group();
		
		// p1 = x coordinate of text obj, p2 = y coor of text obj, p3 = string to display, p4 = font style
		this.lives_label = game.add.text(20, 10, shipProperties.startingLives, fontAssets.counterFontStyle);
		
		this.score_label = game.add.text(gameProperties.screenWidth-20, 10, this.score, fontAssets.counterFontStyle);
		this.score_label.align = 'right';
		this.score_label.anchor.set(1,0);
		
		// The createMultiple function uses the following arguments:
		// quantity : the number of Sprites to create
		// key : key of the image that this Sprite will use
		// frame : the frame number to start at
		this.explosionLargeGroup = game.add.group();
        this.explosionLargeGroup.createMultiple(20, graphicAssets.explosionLarge.name, 0);
        
        //The setAll function sets a specific property for all objects within a group
		// key : the property, as a string, to be set
		// value : the value that will be set
        this.explosionLargeGroup.setAll('anchor.x', 0.5);
        this.explosionLargeGroup.setAll('anchor.y', 0.5);
        
        //callAll function to call a function for each object in the group
		// method : name of the function on the child to call
		// context : a string containing the context under which the method will be executed. In this case the arguments will be passed to a function in the sprite’s animations property context.
		// arguments : additional parameters that will be passed to the method. If you need to pass in more than 1 argument, just add an additional comma for each argument. In thecode, I have passed in 5 arguments starting with graphicAssets.explosionLarge.name
		
		// All sprites have a property called animations. This refers to the animation manager that enables you to create, play, pause and stop animations.
		//The animation manager itself has a method called add which creates a new animation sequence. When calling this method, we pass in 3 arguments:
		//name : the unique name within this sprite for the animation. The name is a string and here I’ve called it "explode".
		// frames : an array of numbers or strings that correspond to the frames to add to this animation. Since we’re using null, all the frames will be used
		// frameRate : the speed (in frames per second) at which the animation should play. Here I’ve used 30 frames per second.
        this.explosionLargeGroup.callAll('animations.add', 'animations', 'explode', null, 30);
        
        this.explosionMediumGroup = game.add.group();
        this.explosionMediumGroup.createMultiple(20, graphicAssets.explosionMedium.name, 0);
        this.explosionMediumGroup.setAll('anchor.x', 0.5);
        this.explosionMediumGroup.setAll('anchor.y', 0.5);
        this.explosionMediumGroup.callAll('animations.add', 'animations', 'explode', null, 30);
        
        this.explosionSmallGroup = game.add.group();
        this.explosionSmallGroup.createMultiple(20, graphicAssets.explosionSmall.name, 0);
        this.explosionSmallGroup.setAll('anchor.x', 0.5);
        this.explosionSmallGroup.setAll('anchor.y', 0.5);
        this.explosionSmallGroup.callAll('animations.add', 'animations', 'explode', null, 30);
    },
    
    
    
    
    initPhysics: function() {
    	// Start the physics system
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	
    	game.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);
    	this.shipSprite.body.drag.set(shipProperties.drag);
    	this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);
    	
    	this.bulletGroup.enableBody = true;
    	this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    	// create multiple bullet sprites and add them to the group
    	this.bulletGroup.createMultiple(30, graphicAssets.bullet.name);
    	this.bulletGroup.setAll('anchor.x', 0.5);
    	this.bulletGroup.setAll('anchor.y', 0.5);
    	this.bulletGroup.setAll('lifespan', bulletProperties.lifespan);
    	
    	this.asteroidGroup.enableBody = true;
        this.asteroidGroup.physicsBodyType = Phaser.Physics.ARCADE;
    },
    
    
    
    
    initKeyboard: function() {
    	this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    	this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    	this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    	this.key_fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    
    
    
    checkPlayerInput: function() {
    	if (this.key_left.isDown) {
    		this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity;
    	}
    	else if (this.key_right.isDown) {
    		this.shipSprite.body.angularVelocity = shipProperties.angularVelocity;
    	}
    	else {
    		this.shipSprite.body.angularVelocity = 0;
    	}
    	
    	if (this.key_thrust.isDown) {
    		game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, shipProperties.acceleration, this.shipSprite.body.acceleration);
    	}
    	else {
    		this.shipSprite.body.acceleration.set(0);
    	}
    	
    	if (this.key_fire.isDown) {
    		this.fire();
    	}
    },
    
    
    
    
    checkBoundaries: function(sprite) {
    	if (sprite.x < 0) {
    		sprite.x = game.width;
    	}
    	else if (sprite.x > game.width) {
    		sprite.x = 0;
    	}
    	
    	if (sprite.y < 0) {
    		sprite.y = game.height;
    	}
    	else if (sprite.y > game.height) {
    		sprite.y = 0;
    	}
    },
    
    
    
    
    fire: function() {
    
    	if (!this.shipSprite.alive) {
    		return;
    	}
    	
    	if (game.time.now > this.bulletInterval) {
    		// get first object in our bullet group 
    		// false argument retrieves an object that does not exist in our game world
    		var bullet = this.bulletGroup.getFirstExists(false);
    		
    		// check if we have successfully retrieved a bullet sprite from the group
    		if (bullet) {
    			// calculate location where the bullet will appear
    			var length = this.shipSprite.width * 0.5;
    			var x = this.shipSprite.x + Math.cos(this.shipSprite.rotation) * length;
    			var y  = this.shipSprite.y + Math.sin(this.shipSprite.rotation) * length;
    			
    			// move bullet to x,y
    			bullet.reset(x, y);
    			bullet.lifespan = bulletProperties.lifespan;
    			bullet.rotation = this.shipSprite.rotation;
    			
    			game.physics.arcade.velocityFromRotation(this.shipSprite.rotation, bulletProperties.speed, bullet.body.velocity);
    			this.bulletInterval = game.time.now + bulletProperties.interval;
    		}
    	}
    },
    
    
    
    
    // pieces is an optional parameter 
    createAsteroid: function(x, y, size, pieces) {
    	
    	if (pieces == undefined) {pieces = 1;}
    
    	for (var i=0; i < pieces; i++) {
			var asteroid = this.asteroidGroup.create(x, y, size);
		    asteroid.anchor.set(0.5, 0.5);
		    asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);
	 
		    var randomAngle = game.math.degToRad(game.rnd.angle());
		    var randomVelocity = game.rnd.integerInRange(asteroidProperties[size].minVelocity, asteroidProperties[size].maxVelocity);
	 
		    game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
		}
    },
    
    
    
    
    resetAsteroids: function() {
    	for (var i=0; i < this.asteroidsCount; i++ ) {
            var side = Math.round(Math.random());
            var x;
            var y;
            
            if (side) {
                x = Math.round(Math.random()) * gameProperties.screenWidth;
                y = Math.random() * gameProperties.screenHeight;
            } else {
                x = Math.random() * gameProperties.screenWidth;
                y = Math.round(Math.random()) * gameProperties.screenWidth;
            }
            
            this.createAsteroid(x, y, graphicAssets.asteroidLarge.name);
        }
    },
    
    
    
    
    asteroidCollision: function(target, asteroid) {
    	target.kill();
    	asteroid.kill();
    	
    	// Check if the object colliding with the asteroid is the player ship
    	if (target.key == graphicAssets.ship.name) {
    		this.destroyShip();
    	}
    	
    	// update the score
    	this.updateScore(asteroidProperties[asteroid.key].score);
    	this.splitAsteroid(asteroid);
    	
    	if (!this.asteroidGroup.countLiving()) {
            game.time.events.add(Phaser.Timer.SECOND * gameProperties.delayToStartLevel, this.nextLevel, this);
        }
    	
    	// Choose explosion group to use
    	var explosionGroup = asteroidProperties[asteroid.key].explosion + "Group";
    	// select the first sprite from the group that does not exist
        var explosion = this[explosionGroup].getFirstExists(false);
        // reset the explosion sprite and move it to the exact position of the destroyed asteroid
        // When resetting a sprite, it becomes alive, visible and can be updated
        explosion.reset(asteroid.x, asteroid.y);
        // play the animation sequence
        //name : the name of the animation to be play
		// frameRate : the framerate to play the animation at. A value of null makes the animation play at the previously set frameRate. We set it to 30 frames per second when creating the sprites in the initGraphics function.
		// loop : by setting it to false, the animation does not loop and only plays once
		// killOnComplete : since it’s set to true, the parent Sprite will be killed once the animation sequence is completed
        explosion.animations.play('explode', null, false, true);
    	
    	// reset game if no lives remain
    	if (!this.shipLives) {
    		this.resetGame();
    	}
    },
    
    
    
    
    destroyShip: function() {
    	this.shipLives--;
    	this.lives_label.text = this.shipLives;
    	
    	if (this.shipLives) {
    		// add a time event that will call the reset function when time expires
    		// p1 = delay before timer event occurs, p2 = callback function, p3 = context of callback
    		game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.resetShip, this);
    	}
    },
    
    
    
    
    resetShip: function() {
    	this.shipIsInvulnerable = true;
    	this.shipSprite.reset(shipProperties.startX, shipProperties.startY);
    	this.shipSprite.angle = -90;
    	
    	game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.shipReady, this);
    	// p1 delay : the number of milliseconds before the timer event occurs.
		// p2 repeatCount : the number of times the event will repeat. A repeatCount of 1 means it will 			repeat itself once, playing the event twice in total.
		// p3 callback : the callback function that will be called when the timer event occurs
		// p4 callbackContext : the context in which the callback function will be called
    	game.time.events.repeat(Phaser.Timer.SECOND * shipProperties.blinkDelay, shipProperties.timeToReset / shipProperties.blinkDelay, this.shipBlink, this);
    },
    
    
    
    
    shipReady: function() {
    	this.shipIsInvulnerable = false;
    	this.shipSprite.visible = true;
    },
    
    
    
    
    shipBlink: function() {
    	this.shipSprite.visible = !this.shipSprite.visible;
    },
    
    
    
    
    // p1 = asteroid sprite
    splitAsteroid: function(asteroid) {
    	// check if asteroid has a smaller size
    	if (asteroidProperties[asteroid.key].nextSize) {
    		//
    		this.createAsteroid(asteroid.x, asteroid.y, asteroidProperties[asteroid.key].nextSize, asteroidProperties[asteroid.key].pieces);
    	}
    },
    
    
    
    updateScore: function(score) {
    	this.score += score;
    	this.score_label.text = this.score;
    },
    
    
    
    nextLevel: function() {
    	this.asteroidGroup.removeAll(true);
        
        if (this.asteroidsCount < asteroidProperties.maxAsteroids) {
            this.asteroidsCount += asteroidProperties.incrementAsteroids;
        }
        
        this.resetAsteroids();
    },
    
    
    
    resetGame: function() {
    	// reset score and its label
    	this.score = 0;
    	this.score_label.text = this.score;
    	
    	// reset ship lives and its label
    	this.shipLives = shipProperties.startingLives;
    	this.lives_label.text = this.shipLives;
    	this.resetShip();
    	
    	// reset asteroids
    	this.asteroidGroup.removeAll(true);
    	this.asteroidsCount = 3;
    	this.resetAsteroids();
    }
};







var mainState = function(game) {
	this.tf_start;
};

mainState.prototype = {

	create: function() {
		var startInstructions = 'Click to Start -\n\nUP arrow key for thrust.\n\nLEFT and RIGHT arrow keys to turn.\n\nSPACE key to fire.';
        
        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.anchor.set(0.5, 0.5);
        
        
        // adds a simple click or tap event that calls the startGame function to start playing 
        // We’re calling the Input Manager here and adding a signal when the mouse button or pointer is pressed down. 
        // Typically we use the add listener to listen for events but here we’ll be using the addOnce listener instead as the listener will automatically remove itself when the event is triggered. That we don’t need to add additional code to remove the listener if we no longer need it after it triggers once.
        game.input.onDown.addOnce(this.startGame, this);
	},
	
	startGame: function() {
		game.state.start(states.game);
	},
};

// first two args are width and height of canvas
// third is the renderer that will be used
// fourth is the element id we will use
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
// add game states to the game
game.state.add(states.main, mainState);
game.state.add(states.game, gameState);
game.state.start(states.main);




