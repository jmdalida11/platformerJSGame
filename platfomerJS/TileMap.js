class TileMap
{
    constructor(lvl)
    {
        this.map = new Array(lvl.rows);
        this.rows = lvl.rows;
        this.cols = lvl.cols;
        this.tileSize = lvl.tileSize;
        this.lvl = lvl;
        this.x = 0;
        this.y = 0;
    }

    initTiles()
    {
        for (let row=0; row<this.rows; ++row)
        {
            this.map[row] = new Array(this.cols);
            for (let col=0; col<this.cols; ++col)
            {
                this.map[row][col] = 0;
            }
        }

        for (let i=0; i<this.lvl.tiles.length; ++i)
        {
            let row = Math.floor(i / this.lvl.cols);
            let col = Math.floor(i % this.lvl.cols);

            this.createTiles(this.lvl, row, col, i);
        }
    }

    setImageResources(imageResources)
    {
        this.imageResources = imageResources;
    }

    createTiles(lvl, row, col, index)
    {
        let xPos = col * this.tileSize + this.x;
        let yPos = row * this.tileSize + this.y;

        switch (lvl.tiles[index])
        {
            case 0:
            {
                let sky = new Tile(xPos, yPos, this.tileSize+1, this.tileSize+1);
                sky.setSprite('skyblue');
                this.map[row][col] = sky;
                break;
            }
            case 1:
            {
                let ground = new Tile(xPos, yPos, this.tileSize, this.tileSize);
                ground.setSprite(this.imageResources.getImage('ground'));
                ground.setBlock(true);
                this.map[row][col] = ground;
                break;
            }
            case 2:
            {
                let grass = new Tile(xPos, yPos, this.tileSize, this.tileSize);
                grass.setSprite('skyblue');
                this.map[row][col] = grass;
                break;
            }
            case 3:
            {
                let portal = new Tile(xPos, yPos, this.tileSize, this.tileSize);
                portal.setSprite('blue');
                this.map[row][col] = portal;
                break;
            }
        }
    }

    addTile(tile, row, col)
    {
        this.map[row][col] = tile;
    }

    getTile(row, col)
    {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return null;
        return this.map[row][col];
    }

    drawTiles(context)
    {
        for (let row=0; row<this.rows; ++row)
        {
            for (let col=0; col<this.cols; ++col)
            {
                if (this.map[row][col])
                {
                    this.map[row][col].draw(context, this.x, this.y);
                }
            }
        }
    }
}