class Flower {
  constructor(start) {
    this.start = start;
    this.size = 0;
    this.gravity = 3;
    this.maxSize = random(5,14);
    this.color = color(255, random(145,240),255)
    this.growthSpeed = random(0.05,0.2);
    this.finished = false;
    this.grown = false;
    this.windSpeedX = random(-0.4, 0.4);
    this.windSpeedY = random(-0.4, 0.4);
    this.limit = 0.5;
    this.random = random(0, 1)
    if (this.random < 0.5) {
      this.stepX = 0.01;
      this.stepY = 0.01;
    }
    else {
      this.stepX = -0.01;
      this.stepY = -0.01;

    }

  }
  show () {
    if (this.size < this.maxSize) this.size += this.growthSpeed
    else if (this.size >= this.maxSize && !this.grown) this.grown = true;
    if(!this.image){
      fill(this.color)
      push()
      translate(this.start.x, this.start.y);
      noStroke();
      for (let i = 0; i < 5; i ++) {
        ellipse(0, this.size/2, this.size/2, this.size);
        rotate(PI/2.5);
      }
      pop()
    } else {
      image(this.image, this.start.x-this.size, this.start.y-this.size)
    }
    if(this.grown && !this.image){
      this.image = createGraphics(this.size*2, this.size*2)
      this.image.fill(this.color)
      this.image.translate(this.size, this.size);
      this.image.noStroke();
      for (let i = 0; i < 5; i ++) {
        this.image.ellipse(0, this.size/2, this.size/2, this.size);
        this.image.rotate(PI/2.5);
      }
    }
    if (this.grown && this.start.y < window.innerHeight) {
      this.windSpeedX += this.stepX;
      this.windSpeedY += this.stepY;
      if(Math.abs(this.windSpeedX) > this.limit) this.stepX = - this.stepX;
      if(Math.abs(this.windSpeedY) > this.limit) this.stepY = - this.stepY;

      this.start.y += this.gravity
      this.start.x += this.windSpeedX
      this.start.y += this.windSpeedY
    } else if (this.start.y > window.innerHeight) this.finished = true;
  }


}