/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
// ctx.lineWidth = 0.5; // border on shape
ctx.globalCompositeOperation = 'destination-over';

ctx.fillStyle = '#FFF5DE';

ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'rgba(0,0,0,0.5)';

class Root {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 7 + 20; // 5 to 12 px
    this.size = 0; //Math.random() * 1 + 2; // 2 to 3 px
    this.vs = Math.random() * 0.2 + 0.5; // the size of the circle thats drawn
    this.angleX = Math.random() * 6.2; // 6.2 is roughly a circle radians?
    this.vaX = Math.random() * 0.6 - 0.3;
    this.angleY = Math.random() * 6.2; // 6.2 is roughly a circle radians?
    this.vaY = Math.random() * 0.6 - 0.3;
    this.lightness = 10;

    this.angle = 0;
    this.va = Math.random() * 0.02 + 0.05;
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vaX;
    this.angleY += this.vaY;
    this.angle += this.va;

    if (this.lightness < 70) this.lightness += 0.25;

    if (this.size < this.maxSize) {
      ctx.save();
      
      // spin
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      
      // draw rectangle
      ctx.fillRect(0 - this.size/2, 0 - this.size/2, this.size, this.size);

      // draw rectangle outline
      let doubleSize = this.size * 2;
      ctx.strokeStyle = '#3c5186';
      ctx.lineWidth = 0.5; // border on shape
      ctx.strokeRect(0 - doubleSize/2, 0 - doubleSize/2, doubleSize, doubleSize);

      // draw rectangle outline
      let tripleSize = this.size * 3;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 0.1; // border on shape
      ctx.strokeRect(0 - tripleSize/2, 0 - tripleSize/2, tripleSize, tripleSize);

      requestAnimationFrame(this.update.bind(this));
      ctx.restore();
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