const WIDTH = 960;
const HEIGHT = 640;

class Game
{
    constructor(deltaTime = 1/60)
    {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        //this.canvas.style.border = '1px solid black';
        document.body.append(this.canvas);

        this.deltaTime = deltaTime;
        this.lastTime = 0;
        this.accumulator = 0;

        this.init();
    }

    init()
    {
        this.gsm = new GameStateManager(this.canvas);
        this.menuState = new MenuState(this.gsm);
        this.gsm.push(this.menuState);
    }

    run(time = 0)
    {
        this.accumulator += (time - this.lastTime) / 1000;

        while(this.accumulator > this.deltaTime)
        {
            this.gsm.update(this.deltaTime);
            this.gsm.draw(this.context);

            this.accumulator -= this.deltaTime;
        }

        this.lastTime = time;

        requestAnimationFrame((time) => {this.run(time)});
    }
}