class State
{
    constructor(gsm)
    {
        this.gsm = gsm;
        this.isResourcesReady = true;
        this.imageResources = new ImageResource();
        this.input = new Input();
    }

    setState(state)
    {
        this.gsm.set(state);
    }

    loadImages(){}
    init(){}
    update(dt){}
    draw(context)
    {
        context.clearRect(0, 0, this.gsm.canvas.width, this.gsm.canvas.height);
    }
}