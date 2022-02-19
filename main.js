const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const standardSize = {
    width: 11,
    height: 8
};

const areaLimit = {
    x: (canvas.width / standardSize.width).toFixed(1),
    y: (canvas.height / standardSize.height).toFixed(1)
};

console.log(areaLimit)

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
        y: 0
    },
    speed: 1,

    draw() {
        ctx.fillStyle = 'black';
        this.body.parts.forEach( part => {
            ctx.fillRect(part.x * standardSize.width, part.y * standardSize.height, 
                this.size.width, this.size.height);
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
        switch( key ) {
            case 'ArrowLeft':
                this.movement.x = -this.speed;
                this.movement.y = 0;
                break;
            case 'ArrowRight':
                this.movement.x = this.speed;
                this.movement.y = 0;
                break;
            case 'ArrowUp':
                this.movement.x = 0;
                this.movement.y = -this.speed;
                break;
            case 'ArrowDown':
                this.movement.x = 0;
                this.movement.y = this.speed;
                break;
            default:
                break;
        };
    },

    move() {
        this.position.x += this.movement.x;
        this.position.y += this.movement.y;

        if ( this.position.x < 0 || this.position.x > areaLimit.x ) {
            return true;
        };

        if ( this.position.y < 0 || this.position.y > areaLimit.y ) {
            return true;
        };
        return false;
    },

    gameOver() {
        handleEndGameScreen();
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
        clearInterval(time);
    };
};
const time = setInterval(loop, 65);
