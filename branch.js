class Branch {
  constructor(start, end, level) {
    this.start = start;
    this.end = end;
    this.final = true;
    this.speed = 0.05;
    this.mult = 0
    this.level = level
    this.finished = false;
    this.goLeft = random(0.7, 1)
    this.goRight = random(0.7, 1)
    this.leftAngle = random(PI / 5, PI / 6)
    this.rightAngle = random(PI / 5, PI / 6)
    this.childLeft = false;
    this.childRight = false;
    this.max=Math.max(this.goLeft, this.goRight)-0.03

  }
  show () {
    if(this.childLeft===false) this.max = this.goRight;
    if(this.childRight===false) this.max = this.goLeft;

    let dir = p5.Vector.sub(this.end, this.start)
    dir.mult(this.mult)
    let newEnd = p5.Vector.add(this.start, dir)
    stroke(102, 81, 43);
    // stroke(255);
    let weight = (20 - this.level *2) || 1
    strokeWeight( weight)
    line(this.start.x, this.start.y, newEnd.x, newEnd.y)
    if (this.mult <= this.max) this.mult += this.speed;
    else this.finished = true;
  }
  branchLeft () {
    let dirEnd = p5.Vector.sub(this.end, this.start);
    dirEnd.mult(this.goLeft)
    let end = p5.Vector.add(this.start, dirEnd)
    let dir = p5.Vector.sub(end, this.start)
    dir.rotate(-this.leftAngle);
    if (this.goLeft > 0.8) dir.mult(0.8)
    let newEnd = p5.Vector.add(end, dir)
    return new Branch(end, newEnd, this.level + 1)
  }
  branchRight () {
    let dirEnd = p5.Vector.sub(this.end, this.start);
    dirEnd.mult(this.goRight)
    let end = p5.Vector.add(this.start, dirEnd)
    let dir = p5.Vector.sub(end, this.start)
    dir.rotate(this.rightAngle);
    if (this.goRight > 0.8) dir.mult(0.8)
    let newEnd = p5.Vector.add(end, dir)
    return new Branch(end, newEnd, this.level + 1)
  }

}