ig.module('game.entities.Enemy')
.requires('impact.entity', 'game.entities.Projectile')
.defines(function(){
    EntityEnemy = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet( 'media/ships.png', 40, 40),
		type: 2,
		checkAgainst: 1,
		size: {x:40,y:40},
		friction: {x: 5, y:5},
		health: 10,
		shootTimer: new ig.Timer(5),
		spawner: 0, //Used to identify the EnemySpawner entity, so it can keep track of how many enemies the screen has
				
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
			this.addAnim('enemy', 1, [1]);
			this.addAnim('enemy2', 1, [2]);
        },
			
        update: function() {
            this.parent();
			if (this.shootTimer.delta() > 0) {
				ig.game.spawnEntity(EntityProjectile, this.pos.x + 10, this.pos.y , {checkAgainst: 1, speed: 400, whoShot: this});
				this.shootTimer = new ig.Timer(2);
			}
			if (this.health <= 0) {
				this.kill();
			}
			//Kills the enemy if he gets past player's side of the screen
			if (this.pos.y > ig.system.height){ this.kill()}
        },
		
		reset: function( x, y, settings ) {
			// This function is called when an instance of this class is
			// resurrected from the entity pool.
			// The parent implementation of reset() will reset the .pos to 
			// the given x, y and will reset the .vel, .accel, .health and 
			// some other properties.
			this.parent( x, y, settings );
		},
		
		kill: function(){ 
			this.spawner.currentEnemies -= 1;
			this.parent();
		},
		
		check: function( other ) {
			//other.receiveDamage( this.damage, this );
			other.receiveDamage(this.health, this);
			if (other.health > this.health) {this.kill();}
		},
		
		receiveDamage: function(dmg, source) {
			this.health -= dmg;
			if (this.health <= 0) {
				this.kill();
			}
		}
		
		
    });
	ig.EntityPool.enableFor( EntityEnemy );
});