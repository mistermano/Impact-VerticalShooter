ig.module('game.entities.Projectile')
.requires('impact.entity', 'impact.entity-pool')
.defines(function(){
	EntityProjectile = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet( 'media/projectiles.png', 10, 20),
		checkAgainst: 2,
		size: {x:5,y:8},
		damage: 1,
		speed: -800,
		friction: {x: 50, y:50},
		init: function( x, y, settings ) {
            this.parent( x, y, settings );
			this.addAnim('weapon1', 1, [0]);
			this.addAnim('weapon2', 1, [1]);
			this.addAnim('weapon3', 1, [2]);
			this.addAnim('weapon4', 1, [3]);
		},
		update: function() {currentAnim = this.anims[this.color]
            this.parent();
			this.vel.y = this.speed;
			
			//Kill if out of screen
			if (this.pos.y < -10 ||  this.pos.y > ig.system.height + 10) {
				this.kill();
			}
			
			//What animation to play, depending on who shot
			if (this.whoShot.type == 1) {
				this.currentAnim = this.anims['weapon2'];
			} else {this.currentAnim = this.anims['weapon3'];}
		},
		
		reset: function( x, y, settings ) {
			// This function is called when an instance of this class is
			// resurrected from the entity pool.
			// The parent implementation of reset() will reset the .pos to 
			// the given x, y and will reset the .vel, .accel, .health and 
			// some other properties.
			this.parent( x, y, settings );
			
			// Play the shoot sound again. Remember, init() is never called 
			// when the entity is revived from the pool. http://impactjs.com/documentation/entity-pooling
			//this.shootSound.play();
		},
		
		check: function( other ) {
			other.receiveDamage( this.damage, this );
			this.kill();
		},
		
		handleMovementTrace: function( res ) {
			this.parent( res );
			//Kill this on any collision
			if( res.collision.x || res.collision.y || res.collision.slope ) {
				this.kill();
			}
		}
	})
	ig.EntityPool.enableFor( EntityProjectile );
});