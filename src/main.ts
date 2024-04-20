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
let mouse = {
  x: undefined as number | undefined,
  y: undefined as number | undefined
}

let maxRadius = 40;

let colors = [
  '#606c38',
  '#283618',
  '#fefae0',
  '#dda15e',
  '#bc6c25'
]

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse)
})



interface Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  draw: () => void;
  update: () => void;
  color:string;
  minRadius:number;
  
}
 
function createCircle(x: number, y: number, dx: number, dy: number, radius: number): Circle {
  let circle: Circle = {
    x: x,
    y: y,
    dx: dx,
    dy: dy,
    radius:radius,
    minRadius:radius,
    color:colors[Math.floor(Math.random() * colors.length)],
    draw: function(): void {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color
      c.fill()
      this.update()
    },
    update: function(): void {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy
      }
    
      this.x += this.dx
      this.y += this.dy

      if (mouse.x && mouse.y) {
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius <= maxRadius) {
          this.radius += 1;
        } else if (this.radius >= this.minRadius) {
          this.radius -= 1
        }
        
      }
      
    }
  };
  return circle;
}




let circleArray: any = [];

for (let i = 0; i < 600; i++) {
  let radius = Math.random() * 3 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5);
  let dy = (Math.random() - 0.5);

  circleArray.push(createCircle(x, y, dx, dy, radius));
}



function animate(): void {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  for(let i = 0; i < circleArray.length; i++) {
    circleArray[i].draw()
  }
}


animate()
