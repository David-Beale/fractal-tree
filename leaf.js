class Leaf {
  constructor(start) {
    this.start = start;
    this.size = 0;
    this.speed = 3;
    this.grown = false;
    this.r = random(40,60)
    this.g = random(180,220)
    this.b = random(30,60)
    this.randomArr = [];
    for (let i = 0; i < 6; i++) {
      this.randomArr.push(random(2*PI))
      
    }
    this.random = []
  }

  show () {
    if (this.size < 30) this.size += 0.2
    else if (this.size >= 30 && !this.grown) this.grown = true;

    fill(this.r, this.g, this.b,150)
    push()
    translate(this.start.x, this.start.y);
    noStroke();
    for (let i = 0; i < 6; i ++) {
      ellipse(0, this.size/2, this.size/2, this.size);
      rotate(this.randomArr[i]);
    }
    pop()
    // noStroke()
    // ellipse(this.start.x, this.start.y, this.size, this.size)

  }
}