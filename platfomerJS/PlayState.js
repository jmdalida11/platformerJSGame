class PlayState extends State
{
    constructor(gsm)
    {
        super(gsm);

        this.tileSize = 32;
        this.tileMap = new TileMap(lvl1);
        this.playerBullets = [];
        this.particles = new Particles();
    }

    init()
    {
        this.loadImages();
        this.initPlayer();
        this.initEnemies();
        this.initInput();
        this.tileMap.setImageResources(this.imageResources);
        this.tileMap.initTiles()
    }

    loadImages()
    {
        super.loadImages();
        this.imageResources.loadImage('playerIdle1', 'resources/playerIdle1.png');
        this.imageResources.loadImage('playerIdle2', 'resources/playerIdle2.png');
        this.imageResources.loadImage('playerjumping', 'resources/playerjumping.png');
        this.imageResources.loadImage('playerwalking1', 'resources/playerwalking1.png');
        this.imageResources.loadImage('playerwalking2', 'resources/playerwalking2.png');
        this.imageResources.loadImage('playerIdle1Flip', 'resources/playerIdle1Flip.png');
        this.imageResources.loadImage('playerIdle2Flip', 'resources/playerIdle2Flip.png');
        this.imageResources.loadImage('playerjumpingFlip', 'resources/playerjumpingFlip.png');
        this.imageResources.loadImage('playerwalking1Flip', 'resources/playerwalking1Flip.png');
        this.imageResources.loadImage('playerwalking2Flip', 'resources/playerwalking2Flip.png');
        this.imageResources.loadImage('monster1', 'resources/monster1.png');
        this.imageResources.loadImage('monster2', 'resources/monster2.png');
        this.imageResources.loadImage('monster1Flip', 'resources/monster1Flip.png');
        this.imageResources.loadImage('monster2Flip', 'resources/monster2Flip.png');
        this.imageResources.loadImage('ground', 'resources/ground.png');
        this.imageResources.loadImage('ground', 'resources/ground1.jpg');
        this.imageResources.loadImage('bullet', 'resources/bullet.png');
        this.imageResources.loadImage('bulletFlip', 'resources/bulletFlip.png');
    }

    initInput()
    {
        const JUMP = 32;
        const MOVE_RIGHT = 39;
        const MOVE_LEFT = 37;
        const SHOOT_BULLET = 65;

        this.input.justPressed(JUMP, () =>
        {
            this.player.jump();
        });

        this.input.pressed(MOVE_RIGHT, () =>
        {
            this.player.moveRight(true);
        });

        this.input.pressed(MOVE_LEFT, () =>
        {
            this.player.moveLeft(true);
        });

        this.input.keyUp(MOVE_RIGHT, () =>
        {
            this.player.moveRight(false);
        });

        this.input.keyUp(MOVE_LEFT, () =>
        {
            this.player.moveLeft(false);
        });

        this.input.justPressed(SHOOT_BULLET, () =>
        {
            this.addPlayerBullet(this.player.shootBullet());
        });

        this.input.processInput();
    }

    initPlayer()
    {
        this.player = new Player(0, 0, 32, 48);
        this.player.setTileMap(this.tileMap);
        this.player.initAnimation(this.imageResources);
    }

    initEnemies()
    {
        this.enemies = [];
        let enemy = new Enemy(400, 200, 32, 32);
        enemy.setPlayer(this.player);
        enemy.setTileMap(this.tileMap);
        enemy.initAnimation(this.imageResources);
        this.enemies.push(enemy);
    }

    limitBoundery()
    {
        let playerPos = this.player.position;

        if (playerPos.x < 0) this.player.position.x = 0;
        if (playerPos.x + this.player.w > this.gsm.canvas.width)
            this.player.position.x = this.gsm.canvas.width - this.player.w;

        for (let enemy of this.enemies)
        {
            if (enemy.position.x < 0) enemy.position.x = 0;
            if (enemy.position.x + enemy.position.w > this.gsm.canvas.width)
                enemy.position.x = this.gsm.canvas.width - enemy.position.w;
        }
    }

    addPlayerBullet(bullet)
    {
        const bulletSpeed = 500;
        this.playerBullets.push(bullet);
        bullet.setSprite(this.imageResources.getImage(bullet.facingRight ? 'bullet' : 'bulletFlip'));
        bullet.setVelocity(bullet.facingRight ? bulletSpeed : -bulletSpeed, 0);
        bullet.setTileMap(this.tileMap);
    }

    addParticles(x, y, w, h, numOfParticles, duration)
    {
        this.particles.set(x, y, w, h);
        this.particles.addParticles(numOfParticles, duration);
    }

    onBulletCollide()
    {
        const particlesSize = 3;
        const numOfParticles = 50;

        for (let i=0; i<this.playerBullets.length; ++i)
        {
            if (this.playerBullets[i].position.x > this.gsm.canvas.width || this.playerBullets[i].position.x < 0)
            {
                this.addParticles(this.playerBullets[i].position.x, this.playerBullets[i].position.y, particlesSize, particlesSize, numOfParticles, 1);
                this.playerBullets.splice(i, 1);
                --i;
                continue;
            }
            else if (this.playerBullets[i].toRemove)
            {
                this.addParticles(this.playerBullets[i].position.x, this.playerBullets[i].position.y, particlesSize, particlesSize, numOfParticles, 1);
                this.playerBullets.splice(i, 1);
                --i;
                continue;
            }

            for (let j=0; j<this.enemies.length; ++j)
            {
                if (this.playerBullets[i].collide(this.enemies[j]))
                {
                    this.addParticles(this.playerBullets[i].position.x, this.playerBullets[i].position.y, particlesSize, particlesSize, numOfParticles, 1);
                    this.enemies.splice(j, 1);
                    this.playerBullets.splice(i, 1);
                    --i;
                    --j;
                    break;
                }
            }
        }
    }

    update(dt)
    {
        this.player.update(dt);

        for (let enemy of this.enemies)
        {
            enemy.update(dt);
        }

        this.onBulletCollide();

        for (let bullet of this.playerBullets)
        {
            bullet.update(dt);
        }

        this.limitBoundery();
        this.particles.update(dt);
    }

    draw(context)
    {
        super.draw(context);
        this.tileMap.drawTiles(context);

        for (let enemy of this.enemies)
        {
           enemy.draw(context);
        }

        this.player.draw(context);

        for (let bullet of this.playerBullets)
        {
            bullet.draw(context);
        }

        this.particles.draw(context);
    }
}