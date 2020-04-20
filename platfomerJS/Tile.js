class Tile
{
    constructor(x, y, w = 0, h = 0)
    {
        this.position = new Vec2(x, y);
        this.w = w;
        this.h = h;
        this.block = false;
        this.sprite;
    }

    setBlock(b)
    {
        this.block = b;
    }

    isBlock()
    {
        return this.block;
    }

    setSprite(sprite)
    {
        this.sprite = sprite;
    }

    draw(context)
    {
        if (typeof this.sprite == "string")
        {
            context.fillStyle = this.sprite;
            context.fillRect(this.position.x, this.position.y, this.w, this.h);
        }
        else
        {
            context.drawImage(this.sprite, this.position.x, this.position.y, this.w, this.h);
        }
    }
}