ig.module('game.entities.EnemySpawner')
.requires('impact.entity', 'game.entities.Enemy')
.defines(function(){
    EntityEnemySpawner = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NONE,
		type: 2,
		size: {x:40,y:40},
		health: -1,
		spawnTimer: new ig.Timer(5),
		currentEnemies: 0,
		waveNumber: 1,
				
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
			this.pos.y = -20;
        },
			
        update: function() {
            this.parent();
			if (this.currentEnemies <= 0){
				if (this.spawnTimer.delta() > 5){this.spawnTimer = new ig.Timer(5);}
				if (this.spawnTimer.delta() > 0) {
					ig.game.spawnEntity(EntityEnemy, this.pos.x + 20, this.pos.y + 120, {spawner: this});
					ig.game.spawnEntity(EntityEnemy, this.pos.x + 60, this.pos.y + 120, {spawner: this});
					ig.game.spawnEntity(EntityEnemy, this.pos.x - 30, this.pos.y + 120, {spawner: this});
					this.currentEnemies += 3;
					//this.spawnTimer = new ig.Timer(30);
					//anounce wave?
				}
			}
        },
		
		receiveDamage: function(dmg, source) {
			return;
		}
		
    });
});