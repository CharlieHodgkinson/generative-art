/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
ctx.lineWidth = 0.4; // border on circles
// ctx.globalCompositeOperation = 'luminosity';

class Root {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 7 + 5; // 5 to 12 px
    this.size = Math.random() * 1 + 2; // 2 to 3 px
    this.vs = Math.random() * 0.2 + 0.05; // the size of the circle thats drawn
    this.angleX = Math.random() * 6.2; // 6.2 is roughly a circle radians?
    this.vaX = Math.random() * 0.6 - 0.3;
    this.angleY = Math.random() * 6.2; // 6.2 is roughly a circle radians?
    this.vaY = Math.random() * 0.6 - 0.3;
    this.lightness = 10;
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vaX;
    this.angleY += this.vaY;

    if (this.lightness < 70) this.lightness += 0.25;

    if (this.size < this.maxSize) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(140,100%,' + this.lightness + '%)';
      ctx.fill();
      ctx.stroke(); // gives it border, if none border will be black
      requestAnimationFrame(this.update.bind(this));
    } else {
      const flower = new Flower(this.x, this.y, this.size);
      flower.grow();
    }
  }
}

class Flower {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vs = Math.random() * 0.3 + 0.2;
    this.maxFlowerSize = this.size + Math.random() * 100;
    this.image = new Image();
    this.image.src = 'flowers.png';
    this.frameSize = 100;
    this.frameY = Math.floor(Math.random() * 3); // 0, 1 or 2
    this.frameX = Math.floor(Math.random() * 3); // 0, 1 or 2
    this.willFlower = this.size > 11.5 ? true : false;
    this.angle = 0;
    this.va = Math.random() * 0.05 - 0.025;

  };
  grow() {
    if ( this.size < this.maxFlowerSize && this.willFlower ) {
      this.size += this.vs;
      this.angle += this.va;

      ctx.save(); // saves canvas settings
      ctx.translate(this.x, this.y); // sets the 0, 0 to x and y
      ctx.rotate(this.angle);
      ctx.drawImage(
        this.image,
        this.frameSize * this.frameX, // start of image x
        this.frameSize * this.frameY, // start of image y
        this.frameSize, // size width
        this.frameSize, // size height
        0 - this.size/2, // x location to draw
        0 - this.size/2, // y location to draw
        this.size, // size when drawn x
        this.size // size when drawn y
      );
      ctx.restore(); // restores canvas settings to what was saved
      requestAnimationFrame(this.grow.bind(this))
    }
  }
}

window.addEventListener('mousemove', function(e) {
  if (drawing) {
    for (let i=0; i < 3; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
})

// when mouse pressed they should draw
window.addEventListener('mousedown', (e) => {
  drawing=true;
  for (let i=0; i < 30; i++) { // draw multiple when click
    const root = new Root(e.x, e.y);
    root.update();
  }
});

window.addEventListener('mouseup', () => { drawing=false });