class Bullet extends Entity
{
    constructor(x, y, w, h)
    {
        super(x, y, w, h);
        this.toRemove = false;
        this.damage = 30;
    }

    collisionY(block)
    {
        super.collisionY(block);
        if (block.isBlock())
        {
            this.toRemove = true;
        }
    }

    collisionX(block)
    {
        super.collisionX(block);
        if (block.isBlock())
        {
            this.toRemove = true;
        }
    }

    update(dt)
    {
        this.position.x += this.velocity.x * dt;
        this.checkWallCollision(dt);
    }

    draw(context)
    {
        context.shadowColor = 'red';
        context.shadowBlur = 10;
        if (this.toRemove) return;
        context.drawImage(this.sprite, this.position.x, this.position.y, this.w, this.h);
    }
}