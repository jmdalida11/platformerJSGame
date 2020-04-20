class ImageResource
{
    constructor()
    {
        this.images = new Map();
    }

    loadImage(key, path)
    {
        const img = new Image(path);
        img.src = path;
        this.images.set(key, img);
    }

    getImage(key)
    {
        if (!this.images.has(key))
        {
            console.log('ImageResource: No key of ' + key);
            return null;
        }

        return this.images.get(key);
    }
}