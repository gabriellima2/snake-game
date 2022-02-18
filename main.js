const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const standardSize = {
    width: 11,
    height: 8
};

class Fruit {
    constructor() {
        this.position = {
            x: 20,
            y: 20
        };
        this.size = {
            width: standardSize.width - 1,
            height: standardSize.height - 1
        };
        this.spawnArea = {
            x: canvas.width / this.position,
            y: canvas.height / this.position
        };
    };

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x * standardSize.width, this.position.y * standardSize.height,
        this.size.width, this.size.height);
    };

    changePosition() {
        this.position.x = Math.floor( Math.random() * 20 );
        this.position.y = Math.floor( Math.random() * 20 );
    };
};

const snake = {
    speed: {
        standard: 1,
        x: 0,
        y: 0
    },
    position: {
        x: 15,
        y: 15
    },
    size: {
        width: standardSize.width - 1,
        height: standardSize.height - 1
    },
    body: {
        parts: [],
        total: 2
    },

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

    move({ key }) {
        switch( key ) {
            case 'ArrowLeft':
                this.speed.x = -this.speed.standard;
                this.speed.y = 0;
                break;
            case 'ArrowRight':
                this.speed.x = this.speed.standard;
                this.speed.y = 0;
                break;
            case 'ArrowUp':
                this.speed.x = 0;
                this.speed.y = -this.speed.standard;
                break;
            case 'ArrowDown':
                this.speed.x = 0;
                this.speed.y = this.speed.standard;
                break;
            default:
                break;
        };
    }
};
document.addEventListener('keydown', snake.move.bind(snake));

const fruit = new Fruit;
console.log(fruit)

function loop() {
    snake.position.x += snake.speed.x;
    snake.position.y += snake.speed.y;

    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    snake.draw();
    fruit.draw();
    snake.eatFruit();
};
setInterval(loop, 65);
