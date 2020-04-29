class Animation
{
    constructor()
    {
        this.animations = {};
        this.timer = 0;
        this.currentAction = null;
        this.w = 0;
        this.h = 0;
        this.x = 0;
        this.y = 0;
    }

    setAnimation(action, frames, isLoop = false)
    {
        let anim = {frames:frames, index:0, duration:0, speed:0, isLoop:isLoop};
        this.animations[action] = anim;
    }

    setTimer(action, duration, speed)
    {
        if (!this.animations.hasOwnProperty(action))
        {
            console.log('No action ' + action);
        }
        this.animations[action].duration = duration;
        this.animations[action].speed = speed;
    }

    setCurrentAction(action)
    {
        if (!this.animations.hasOwnProperty(action))
        {
            console.log('No action ' + action);
            return;
        }
        this.currentAction = action;
    }

    set(x, y, w, h)
    {
        this.setSize(w, h);
        this.setPosition(x, y);
    }

    setSize(w, h)
    {
        this.w = w;
        this.h = h;
    }

    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }

    getCurrentFrame()
    {
        if (!this.currentAction) return null;

        let action = this.animations[this.currentAction];
        return action.frames[action.index];
    }

    update(dt)
    {
        if (this.currentAction == null) return;

        let action = this.animations[this.currentAction];
        this.timer += action.speed * dt;

        if (this.timer > action.duration / action.frames.length)
        {
            this.timer = 0;
            action.index++;
            if (action.index >= action.frames.length)
            {
                action.index = 0;
            }
        }
    }

    draw(context)
    {
        if (this.currentAction == null) return;
        let action = this.animations[this.currentAction];
        context.drawImage(action.frames[action.index], this.x, this.y, this.w, this.h);
    }
}