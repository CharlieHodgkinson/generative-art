/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;

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
      // ctx.stroke(); // gives it border, if none border will be black
      requestAnimationFrame(this.update.bind(this));
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
window.addEventListener('mousedown', () => { drawing=true });
window.addEventListener('mouseup', () => { drawing=false });