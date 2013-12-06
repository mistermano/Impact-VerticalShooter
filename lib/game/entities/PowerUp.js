ig.module('game.entities.PowerUp')
.requires('impact.entity')
.defines(function(){
    EntityPowerUp = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.PASSIVE,
		checkAgainst: 1,
		size: {x:40,y:40},
		health: -1,
		bounciness: 1,
		despawnTimer: new ig.Timer(10),
				
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
			
        update: function() {
            this.parent();
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
		
		upgradesWhat: function(what){
			if (!what) {
				console.log('randomize it');
			}
		},
		
		receiveDamage: function(dmg, source) {
			return;
		},
		
		//PowerUp only checks with the Player entity
		check: function( other ) {
			//Increment player's weapon
			this.kill();
		}
		
    });
	ig.EntityPool.enableFor( EntityPowerUp );
});