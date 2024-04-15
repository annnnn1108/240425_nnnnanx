let bg = ["ffe8d6"];
let p = ["#cb997e","#ddbea9","#ffe8d6","#b7b7a4","#a5a58d","#6b705c"];

class GridObject {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
    this.speedX = random(-1, 1); 
    this.speedY = random(-1, 1); // 隨機初始垂直速度
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 反彈至畫布邊緣
    if (this.x <= 0 || this.x + this.w >= width) {
      this.speedX *= -1;
    }
    if (this.y <= 0 || this.y + this.h >= height) {
      this.speedY *= -1;
    }
  }

  display() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);

    noStroke();
    fill(this.color);
    rectMode(CENTER);
    ellipse(10, 10, this.w, this.h, this.w / 20, this.w / 200, 100, 100);

    fill("#000000");
    circle(-this.w / 6, -this.w / 50, this.w / 7.5);
    circle(this.w / 6, -this.w / 50, this.w / 7.5);

    fill(bg);
    ellipse(0, this.w / 7.5, this.w / 2.2, this.w / 3);

    fill(this.color);
    ellipse(0, this.w / 11, this.w / 5, this.w / 7);

    fill(this.color);
    circle(-this.w / 3, -this.w / 5, this.w / 5);
    circle(this.w / 3, -this.w / 5, this.w / 5);

    pop();
  }
}

let gridObjects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bg);

  let cells = 6;
  let offset = width / 50;
  let margin = 0;
  let w = (width - offset * 2 - margin * (cells - 1)) / cells;
  let h = (height - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (w + margin);
      let y = offset + j * (h + margin);
      let c = random(p);
      let obj = new GridObject(x, y, w, h, c);
      gridObjects.push(obj);
    }
  }
}

function draw() {
  background(bg);

  for (let obj of gridObjects) {
    obj.move();
    obj.display();
  }
}
