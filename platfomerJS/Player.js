class Player extends Entity
{
    constructor(x, y, w = 0, h = 0)
    {
        super(x, y, w, h);

        this.hasGravity = true;
        this.jumpPower = 250;
        this.isJumping = false;
        this.speed = 200;
        this.tileMap = null;

        this.invulnerable = false;
        this.invuTimer = 0;
        this.movingRight = false;
        this.movingLeft = false;
    }

    initAnimation(imageResources)
    {
        this.animation.setAnimation('idle', [
            imageResources.getImage('playerIdle1'),
            imageResources.getImage('playerIdle2'),
        ], true);
        this.animation.setTimer('idle', 1, 1);

        this.animation.setAnimation('idleFlip', [
            imageResources.getImage('playerIdle1Flip'),
            imageResources.getImage('playerIdle2Flip'),
        ], true);
        this.animation.setTimer('idleFlip', 1, 1);

        this.animation.setAnimation('walking', [
            imageResources.getImage('playerwalking1'),
            imageResources.getImage('playerwalking2'),
        ], true);
        this.animation.setTimer('walking', 1, 2);

        this.animation.setAnimation('walkingFlip', [
            imageResources.getImage('playerwalking1Flip'),
            imageResources.getImage('playerwalking2Flip'),
        ], true);
        this.animation.setTimer('walkingFlip', 1, 2);

        this.animation.setAnimation('jumping', [
            imageResources.getImage('playerjumping'),
        ], true);
        this.animation.setTimer('jumping', 1, 1);

        this.animation.setAnimation('jumpingFlip', [
            imageResources.getImage('playerjumpingFlip'),
        ], true);
        this.animation.setTimer('jumpingFlip', 1, 1);


        this.animation.set(this.position.x, this.position.y, 48, 48);
        this.animation.setCurrentAction('idle');
    }

    shootBullet()
    {
        let bullet = new Bullet(this.position.x, this.position.y + this.h/4, 20, 20);
        bullet.facingRight = this.facingRight;

        return bullet;
    }

    hitByEnemy(damage)
    {
        if (!this.invulnerable)
        {
            this.health -= damage;
            this.invulnerable = true;
            this.invuTimer = 0;
        }
    }

    jump()
    {
        if (!this.onTheGround) return;
        this.isJumping = true;
        this.velocity.y = -this.jumpPower;
        this.onTheGround = false;
    }

    moveLeft(b)
    {
        this.movingLeft = b;
    }

    moveRight(b)
    {
        this.movingRight = b;
    }

    update(dt)
    {

        if (this.movingRight && this.onTheGround)
        {
            this.velocity.x = this.speed;
            this.facingRight = true;
        }
        else if (this.movingRight && !this.onTheGround)
        {
            this.velocity.x = this.speed/2;
            this.facingRight = true;
        }
        else if (this.movingLeft && this.onTheGround)
        {
            this.velocity.x = -this.speed;
            this.facingRight = false;
        }
        else if (this.movingLeft && !this.onTheGround)
        {
            this.velocity.x = -this.speed/2;
            this.facingRight = false;
        }
        else
        {
            this.velocity.x = 0;
        }

        if (this.onTheGround)
        {
            this.isJumping = false;
            if (this.velocity.x != 0)
            {
                this.animation.setCurrentAction(this.facingRight ? 'walking' : 'walkingFlip');
            }
            else
            {
                this.animation.setCurrentAction(this.facingRight ? 'idle' : 'idleFlip');
            }
        }

        if(this.isJumping || !this.onTheGround)
        {
            this.animation.setCurrentAction(this.facingRight ? 'jumping' : 'jumpingFlip');
        }

        if (this.invulnerable)
        {
            this.invuTimer += 1 * dt;

            const invuMaxTime = 2;
            if (this.invuTimer > invuMaxTime) this.invulnerable = false;
        }

        this.pullGravity(dt);
        this.checkWallCollision(dt);

        this.animation.setPosition(this.position.x-10, this.position.y);
        this.animation.update(dt);
    }

    draw(context)
    {
/*        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.w, this.h);*/
        this.animation.draw(context);
    }
}