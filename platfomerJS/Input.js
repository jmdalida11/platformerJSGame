class Input
{
    constructor()
    {
        this.isPessedKeys = new Map();
        this.keys = new Map();
    }

    setKey(key, callback, dir)
    {
        let value = {};
        if (this.keys.has(key))
        {
            value = this.keys.get(key);
            value[dir] = callback;
            this.keys.set(key, value);
        }
        else
        {
            value[dir] = callback;
            this.keys.set(key, value);
        }
    }

    pressed(key, callback)
    {
        this.setKey(key, callback, 'down');
    }

    justPressed(key, callback)
    {
        this.setKey(key, callback, 'down');
        this.isPessedKeys.set(key, false);
    }

    keyUp(key, callback)
    {
        this.setKey(key, callback, 'up');
    }

    processInput()
    {
        ['keydown', 'keyup'].forEach((event) => {
            window.addEventListener(event, (e) => {
                this.keys.forEach((value, key) =>
                {
                    if (key == e.keyCode)
                    {
                        if (this.isPessedKeys.has(key))
                        {
                            let keyPressed = this.isPessedKeys.get(key);
                            if (event == 'keydown' && !keyPressed)
                            {
                                value.down();
                                this.isPessedKeys.set(key, true);
                            }
                            else if (event == 'keyup')
                            {
                                this.isPessedKeys.set(key, false);
                            }
                        }
                        else if (event == 'keydown')
                        {
                            value.down();
                        }
                        else if(event == 'keyup')
                        {
                            value.up();
                        }

                    }
                });

            });
        });
    }

}