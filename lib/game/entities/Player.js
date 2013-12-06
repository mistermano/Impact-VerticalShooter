ig.module('game.entities.Player')
.requires('impact.entity', 'game.entities.Projectile')
.defines(function(){
    EntityPlayer = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet( 'media/ships.png', 40, 40),
		type: 1,
		checkAgainst: 2,
		size: {x:40,y:40},
		//Friction is mandatory to be higher than 1, otherwise the actual ship speed will greatly decrease
		friction: {x: 5, y:5},
		health: 100,
		maxHealth: 100, //maximum health for the player
		speed: 250, //player's movement speed
		damage: 1, //The damage that the player's shots cause to the enemy.
		weapons: [0,1,2],
		currentWeapon: 0,
		shootInterval: 0.8, //Interval between automatic shots.
		shootTimer: new ig.Timer(0),
		
		/**
			Most of the details of the player ship and its subsequent shots can be defined here,
			as they get sent to the EntityProjectile. This is so that there can be powerups for
			pretty much all aspects of the player, like ship speed, max health, damage caused,
			rate of (automatic) fire 
		*/
		
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
			this.addAnim('player', 1, [0]);
        },
			
        update: function() {
            this.parent();
			this.movementKeys();
			this.stayOnScreen();
			this.shoot();
			
			if (ig.input.pressed("bomb")){this.upgradesWhat();}
			
			if (ig.input.pressed("changeweapon")) {
				this.upgradesWhat(1);
				if (this.currentWeapon >= this.weapons.size){
					this.currentWeapon = 0;
				} else { this.currentWeapon +=1;}
			}
			
			//Health never goes over maxHealth. Powerups can increase maxHealth
			if(this.health > this.maxHealth) {this.health = this.maxHealth;}
			
			if (this.health <= 0) {
				this.kill();
			}
        },
		
		upgradesWhat: function(what){
			if (!what) {
				console.log('randomize it '+what);
			}
		},
		
		movementKeys: function(){
			if (ig.input.state("left")) {this.vel.x = -this.speed;}
			if (ig.input.state("right")) {this.vel.x = this.speed;}
			if (ig.input.state("up")) {this.vel.y = -this.speed;}
			if (ig.input.state("down")) {this.vel.y = this.speed;}
			//If no movement button is pressed, set speed to 0
			if (!ig.input.state("left") && !ig.input.state("right")){this.vel.x = 0}
			if (!ig.input.state("up") && !ig.input.state("down")){this.vel.y = 0}
		},
		
		stayOnScreen: function(){
			if (this.pos.x < 3 && this.vel.x < -1){this.vel.x = 0}
			if (this.pos.x > ig.system.width - this.size.x && this.vel.x > 1){this.vel.x = 0}
			if (this.pos.y < 3 && this.vel.y < -1){this.vel.y = 0}
			if (this.pos.y > ig.system.height - this.size.y && this.vel.y > 1){this.vel.y = 0}
		},
		
		shoot: function(){
			if (ig.input.pressed("shoot")){ ig.game.spawnEntity(EntityProjectile, this.pos.x + 10, this.pos.y - 20, {speed: -700, whoShot: this, damage: this.damage}); }
			if (ig.input.state("shoot")){ 
				if (this.shootTimer.delta() > 0){
					this.shootTimer = new ig.Timer(this.shootInterval);
					ig.game.spawnEntity(EntityProjectile, this.pos.x + 10, this.pos.y - 20, {speed: -700, whoShot: this, damage: this.damage});
				}
			}
		},
		
		receiveDamage: function(dmg, source) {
			this.health -= dmg;
		}
		
    });
});