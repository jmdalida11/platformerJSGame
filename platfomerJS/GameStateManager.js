class GameStateManager
{
    constructor(canvas)
    {
        this.states = [];
        this.canvas = canvas;
    }

    set(state)
    {
        this.states.shift();
        this.states.unshift(state);
        state.init();
    }

    pop()
    {
        this.states.shift();
    }

    push(state)
    {
        this.states.unshift(state);
        state.init();
    }

    update(dt)
    {
        if (this.states.length > 0)
        {
            if (this.states[0].isResourcesReady)
            {
                this.states[0].update(dt);
            }
        }
    }

    draw(context)
    {
        if (this.states.length > 0)
        {
            if (this.states[0].isResourcesReady)
            {
                this.states[0].draw(context);
            }
        }
    }
}