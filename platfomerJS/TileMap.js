class TileMap
{
    constructor(lvl)
    {
        this.map = new Array(lvl.rows);
        this.rows = lvl.rows;
        this.cols = lvl.cols;
        this.tileSize = lvl.tileSize;
        this.lvl = lvl;
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
        switch (lvl.tiles[index])
        {
            case 0:
            {
                let sky = new Tile(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                sky.setSprite('skyblue');
                this.map[row][col] = sky;
                break;
            }
            case 1:
            {
                let ground = new Tile(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                ground.setSprite(this.imageResources.getImage('ground'));
                ground.setBlock(true);
                this.map[row][col] = ground;
                break;
            }
            case 2:
            {
                let grass = new Tile(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                grass.setSprite('skyblue');
                this.map[row][col] = grass;
                break;
            }
            case 3:
            {
                let portal = new Tile(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
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
        return this.map[row][col];
    }

    drawTiles(context)
    {
        for (let row=0; row<this.rows; ++row)
        {
            for (let col=0; col<this.cols; ++col)
            {
                if (this.map[row][col])
                    this.map[row][col].draw(context);
            }
        }
    }
}