import './style.css'

let canvas = document.querySelector('canvas')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')!;

// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(100, 100, 100, 100)
// console.log(canvas);


// // line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// // Arc
//   //c.beginPath();
//   //c.arc(300, 300, 30, 0, Math.PI * 2, false)
//   //c.strokeStyle ="blue"
// const colors = ['red', 'blue', 'green']
// for (let i = 0; i < 100; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = colors[i % 3];
//   c.stroke()
// }

// animation
let x = Math.random() * innerWidth;
let y = Math.random() * innerHeight;
let dx = (Math.random() - 0.5) * 10;
let dy = (Math.random() - 0.5) * 10;
let radius = 30

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = 'blue';
  c.stroke()

  if (x + radius > innerWidth || x - radius < 0) {
    dx = -dx
  }
  if (y + radius > innerHeight || y - radius < 0) {
    dy = -dy
  }

  x += dx
  y += dy

}


//animate()
