class MenuState extends State
{
    constructor(gsm)
    {
        super(gsm);
    }

    update(dt)
    {
        this.setState(new PlayState(this.gsm));
    }

    draw(context)
    {
        super.draw(context);
        this.drawBackground(context);
    }

    drawBackground(context)
    {
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.gsm.canvas.width, this.gsm.canvas.height);
    }
}