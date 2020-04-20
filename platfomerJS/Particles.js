class Particles
{
    constructor()
    {
        this.position = new Vec2(0, 0);
        this.w = 0;
        this.h = 0;
        this.particles = [];
        this.durations = [];
        this.timers = [];
        this.startParticle = false;
        this.sprite = 'red';
    }

    set(x, y, w, h)
    {
        this.position.set(x, y);
        this.w = w;
        this.h = h;
    }

    addParticles(numOfParticles, duration)
    {
        let groupParticles = [];
        for (let i=0; i<numOfParticles; ++i)
        {
            let rX = Math.floor(Math.random() * 100);
            let rY = Math.floor(Math.random() * 100);
            let positivePos = (Math.random() * 1) > 0.5;
            let newPos = new Vec2(this.position.x, this.position.y);
            let particle = {position: newPos, w:this.w, h:this.h, randX:rX, randY:rY, positivePos};
            groupParticles.push(particle);
        }
        this.particles.push(groupParticles);
        this.timers.push(0);
        this.durations.push(duration);
    }

    setSprite(sprite)
    {
        this.sprite = sprite;
    }

    update(dt)
    {
        for (let i=0; i<this.particles.length; ++i)
        {
            this.timers[i] += dt;

            if (this.timers[i] > this.durations[i])
            {
                this.timers.splice(i, 1);
                this.durations.splice(i, 1);
                this.particles.splice(i, 1);
                --i;
                continue;
            }

            for (let j=0; j<this.particles[i].length; ++j)
            {
                let particle = this.particles[i][j];
                particle.position.x += (particle.positivePos ? particle.randX : -particle.randX) * dt;
                particle.position.y += (particle.positivePos ? particle.randY : -particle.randY) * dt;

                particle.w = particle.w > 0 ? particle.w-1*dt : 0;
                particle.h = particle.h > 0 ? particle.h-1*dt : 0;
            }
        }
    }

    draw(context)
    {
        context.fillStyle = this.sprite;

        for (let i=0; i<this.particles.length; ++i)
        {
            for (let j=0; j<this.particles[i].length; ++j)
            {
                let particle = this.particles[i][j];
                context.fillRect(particle.position.x, particle.position.y, particle.w, particle.h);
            }
        }
    }
}