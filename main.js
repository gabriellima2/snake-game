const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const standardSize = {
    width: 10.5,
    height: 7.5
};

const areaLimit = {
    x: (canvas.width / standardSize.width).toFixed(0),
    y: (canvas.height / standardSize.height).toFixed(0)
};

const endGameScreen = document.querySelector('.end-game');
document.querySelector('.end-game-btn').addEventListener('click', () => document.location.reload())

function handleEndGameScreen() {
    endGameScreen.classList.toggle('active');
};

const fruit = {
    position: {
        x: 20,
        y: 20
    },
    size: {
        width: standardSize.width,
        height: standardSize.height
    },
    spawnArea: {
        x: areaLimit.x,
        y: areaLimit.y
    },

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x * standardSize.width, this.position.y * standardSize.height,
            this.size.width, this.size.height);
    },

    changePosition() {
        this.position.x = Math.floor( Math.random() * this.spawnArea.x );
        this.position.y = Math.floor( Math.random() * this.spawnArea.y );
    },
};

const snake = {
    position: {
        x: 10,
        y: 10
    },
    size: {
        width: standardSize.width ,
        height: standardSize.height 
    },
    body: {
        parts: [],
        total: 2
    },
    movement: {
        x: 0,
        y: 0,
        init: false
    },


    keys: {
        x: {
            ArrowLeft: {
                clicked: false,
                action() {
                    snake.movement.x = -snake.speed;
                    snake.movement.y = 0;
                }
            },
            ArrowRight: {
                clicked: false,
                action() {
                    snake.movement.x = snake.speed;
                    snake.movement.y = 0;
                }
            },
            standardValues() {
                this.ArrowLeft.clicked = false;
                this.ArrowRight.clicked = false;
            }
        },

    
        y: {
            ArrowUp: {
                clicked: false,
                action() {
                    snake.movement.x = 0;
                    snake.movement.y = -snake.speed;
                }
            },
            ArrowDown: {
                clicked: false,
                action() {
                    snake.movement.x = 0;
                    snake.movement.y = snake.speed;
                }
            },
            standardValues() {
                this.ArrowUp.clicked = false;
                this.ArrowDown.clicked = false;
            }
        },
    },
    speed: 1,

    draw() {
        ctx.fillStyle = 'black';
        this.body.parts.forEach( part => {
            ctx.fillRect(part.x * standardSize.width, part.y * standardSize.height, 
                this.size.width, this.size.height);
            if ( part.x === this.position.x && part.y === this.position.y && this.movement.init) {
                this.gameOver();
            };
        });
        this.updateBody();
    },

    updateBody() {
        this.body.parts.push({
            x: snake.position.x,
            y: snake.position.y
        });
        while( this.body.parts.length > this.body.total) {
            this.body.parts.shift();
        };
    },
    
    eatFruit() {
        if ( fruit.position.x === this.position.x && fruit.position.y === this.position.y ) {
            this.body.total++;
            fruit.changePosition();
        };
    },

    control({ key }) {
        if ( !this.movement.init ) {
            this.movement.init = true;
        };

        let keyAxis = undefined;
        if ( key === 'ArrowLeft' || key === 'ArrowRight' ) {
            keyAxis = 'x';

        } else if ( key === 'ArrowUp' || key === 'ArrowDown' ) {
            keyAxis = 'y';
        };

        if ( !this.keys[keyAxis][key].clicked ) {
            this.keys.x.standardValues();
            this.keys.y.standardValues();
            
            this.keys[keyAxis][key].action();
            for ( value in this.keys[keyAxis] ) {
                this.keys[keyAxis][value].clicked = true;
            };
        };
    },

    move() {
        this.position.x += this.movement.x;
        this.position.y += this.movement.y;

        if ( this.position.x < 0 || this.position.x >= areaLimit.x ) {
            return true;
        };

        if ( this.position.y < 0 || this.position.y >= areaLimit.y ) {
            return true;
        };
        return false;
    },

    gameOver() {
        handleEndGameScreen();
        clearInterval(time);
        this.movement.x = 0;
        this.movement.y = 0;
    }
};
document.addEventListener('keydown', snake.control.bind(snake));


function loop() {
    const reachedLimit = snake.move();

    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.draw();
    fruit.draw();
    snake.eatFruit();

    if ( reachedLimit ) {
        snake.gameOver();
    };
};
const time = setInterval(loop, 65);
