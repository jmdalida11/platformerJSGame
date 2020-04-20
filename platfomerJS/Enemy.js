class Enemy extends Entity
{
    constructor(x, y, w, h)
    {
        super(x, y, w, h);

        this.hasGravity = true;
        this.rangeSight = 200;
        this.player = null;
        this.damage = 10;
        this.patrolTimer = 0;

        this.enemyState = 'patrol';
    }

    setPlayer(player)
    {
        this.player = player;
    }

    initAnimation(imageResources)
    {
        this.animation.setAnimation('monster', [
            imageResources.getImage('monster1'),
            imageResources.getImage('monster2'),
        ], true);
        this.animation.setTimer('monster', 3, 1);

        this.animation.setAnimation('monsterFlip', [
            imageResources.getImage('monster1Flip'),
            imageResources.getImage('monster2Flip'),
        ], true);
        this.animation.setTimer('monsterFlip', 3, 1);

        this.animation.set(this.position.x, this.position.y, this.w, this.h);
        this.animation.setCurrentAction('monster');
    }

    enemyVision()
    {
        let playerPos = this.player.position;
        if (Math.abs(playerPos.x - this.position.x) <= this.rangeSight
            && Math.abs(playerPos.y - this.position.y) <= this.rangeSight)
        {
            this.enemyState = 'chase';
        }
        else
        {
            this.enemyState = 'patrol';
        }
    }

    checkState(dt)
    {
        let playerPos = this.player.position;
        if (this.enemyState == 'chase')
        {
            this.velocity.x = playerPos.x - this.position.x;
        }
        else if (this.enemyState == 'patrol')
        {
            const patrolDuration = 6;
            const speed = 30;
            this.patrolTimer += 1 * dt;

            if (this.patrolTimer > patrolDuration)
            {
                this.facingRight = !this.facingRight;
                this.velocity.x = this.facingRight ? speed : -speed;
                this.patrolTimer = 0;
            }
        }
    }

    update(dt)
    {
        super.update(dt);

        if (this.collide(this.player))
        {
            this.player.hitByEnemy(this.damage);
        }

        this.checkState(dt);

        if (this.velocity.x > 0)
        {
            this.facingRight = true;
            this.animation.setCurrentAction('monster');
        }
        else if(this.velocity.x < 0)
        {
            this.facingRight = false;
            this.animation.setCurrentAction('monsterFlip');
        }

        this.enemyVision();
        this.checkWallCollision(dt);

        this.animation.setPosition(this.position.x, this.position.y);
        this.animation.update(dt);
    }

    draw(context)
    {
        this.animation.draw(context);
    }
}