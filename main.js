const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const standardSize = {
    width: 11,
    height: 7
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
    partsBody: [],
    tail: 2,

    draw() {
        ctx.fillStyle = 'gray';
        this.partsBody.forEach( part => {
            ctx.fillRect(part.x * this.size.width, part.y * this.size.height, 
                this.size.width, this.size.height);
        });
        this.updateBody();
    },

    updateBody() {
        this.partsBody.push(this.position);
        while( this.partsBody.length > this.tail ) {
            this.partsBody.shift();
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

function loop() {
    snake.position.x += snake.speed.x;
    snake.position.y += snake.speed.y;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    snake.draw();
};
setInterval(loop, 65);
