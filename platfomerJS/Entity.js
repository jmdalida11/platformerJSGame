class Entity
{
    constructor(x, y, w = 0, h = 0)
    {
        this.position = new Vec2(x, y);
        this.velocity = new Vec2();
        this.setSize(w, h);
        this.sprite = null;

        this.gravity = 250;
        this.maxGravity = 300;
        this.hasGravity = false;
        this.onTheGround = false;
        this.tileMap = null;

        this.health = 100;
        this.maxHealth = 100;
        this.animation = new Animation();
        this.facingRight = true;
    }

    setTileMap(map)
    {
        this.tileMap = map;
    }

    setVelocity(x, y)
    {
        this.velocity.set(x, y);
    }

    setPosition(x, y)
    {
        this.position.set(x, y);
    }

    setSprite(sprite)
    {
        this.sprite = sprite;
    }

    setSize(w, h)
    {
        this.w = w;
        this.h = h;
    }

    pullGravity(dt)
    {
        if (this.hasGravity && !this.onTheGround)
        {
            this.velocity.y += this.gravity * dt;

            if (this.velocity.y > this.maxGravity)
                this.velocity.y = this.maxGravity;
        }
    }

    checkWallCollision(dt)
    {
        this.lastPosY = this.position.y;
        this.position.y += this.velocity.y * dt;

        let y = this.position.y;
        let x = this.position.x;
        let tileSize = this.tileMap.tileSize;

        let topright = this.tileMap.getTile(Math.floor(y / tileSize), Math.floor((x + this.w) / tileSize));
        let topleft = this.tileMap.getTile(Math.floor(y / tileSize), Math.floor(x / tileSize));
        let botright = this.tileMap.getTile(Math.floor((y + this.h) / tileSize), Math.floor((x + this.w) / tileSize));
        let botleft = this.tileMap.getTile(Math.floor((y + this.h) / tileSize), Math.floor(x / tileSize));
        let centerLeft = this.tileMap.getTile(Math.floor((y+tileSize) / tileSize), Math.floor(x / tileSize));
        let centerRight = this.tileMap.getTile(Math.floor((y+tileSize) / tileSize), Math.floor((x + this.w) / tileSize));

        if (topright)
        {
           this.collisionY(topright);
        }
        if (topleft)
        {
            this.collisionY(topleft);
        }
        if (botright)
        {
            this.collisionY(botright);
        }
        if (botleft)
        {
            this.collisionY(botleft);
        }
        if (centerLeft)
        {
            this.collisionY(centerLeft);
        }
        if (centerRight)
        {
            this.collisionY(centerRight);
        }

        /////////

        this.lastPosX = this.position.x;
        this.position.x += this.velocity.x * dt;

        y = this.position.y;
        x = this.position.x;

        topright = this.tileMap.getTile(Math.floor(y / tileSize), Math.floor((x + this.w) / tileSize));
        topleft = this.tileMap.getTile(Math.floor(y / tileSize), Math.floor(x / tileSize));
        botright = this.tileMap.getTile(Math.floor((y + this.h) / tileSize), Math.floor((x + this.w) / tileSize));
        botleft = this.tileMap.getTile(Math.floor((y + this.h) / tileSize), Math.floor(x / tileSize));
        centerLeft = this.tileMap.getTile(Math.floor((y+tileSize) / tileSize), Math.floor(x / tileSize));
        centerRight = this.tileMap.getTile(Math.floor((y+tileSize) / tileSize), Math.floor((x + this.w) / tileSize));

        if (topright)
        {
           this.collisionX(topright);
        }
        if (topleft)
        {
            this.collisionX(topleft);
        }
        if (botright)
        {
            this.collisionX(botright);
        }
        if (botleft)
        {
            this.collisionX(botleft);
        }
        if (centerLeft)
        {
            this.collisionX(centerLeft);
        }
        if (centerRight)
        {
            this.collisionX(centerRight);
        }
    }

    collisionY(block)
    {
        if (block.isBlock())
        {
            if (this.velocity.y > 0)
            {
                this.position.y = this.lastPosY;
                this.onTheGround = true;
                this.isJumping = false;
            }
            else if (this.velocity.y < 0)
            {
                this.position.y = this.lastPosY;
                this.velocity.y = 0;
                this.isJumping = false;
            }
        }
    }

    collisionX(block)
    {
        if (block.isBlock())
        {
            if (this.velocity.x < 0)
            {
                this.position.x = this.lastPosX;
            }
            else if (this.velocity.x > 0)
            {
                this.position.x = this.lastPosX;
            }
        }
    }

    collide(entity)
    {
        return !(
        ( ( this.position.y + this.h ) < ( entity.position.y ) ) ||
        ( this.position.y > ( entity.position.y + entity.h ) ) ||
        ( ( this.position.x + this.w ) < entity.position.x ) ||
        ( this.position.x > ( entity.position.x + entity.w ) )
        );
    }

    update(dt)
    {
        this.pullGravity(dt);
    }

    draw(context)
    {
        context.fillStyle = 'black';
        context.fillRect(this.position.x, this.position.y, this.w, this.h);
    }
}