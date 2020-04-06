let tree = [];
let flowers = [];
let leaves = [];
let counter;
let counterFlowers;
let counterFlowersFinished;
let counterLeaves;
let c;
let onceA = 0;
let onceB = 0;
let img;
let backgroundImage;

function preload () {
  backgroundImage = loadImage('./background.jpg')
}
function setup () {
  c = createCanvas(window.innerWidth, window.innerHeight);
  background(39, 43, 48);
  let a = createVector(width / 2, height)
  let b = createVector(width / 2, height - (height * 0.3))
  tree[0] = new Branch(a, b, 0)

  function split (branch) {
    if (branch.level < 10) {
      let randA = random(0, 1)
      let randB = random(0, 1)
      if (randA > 0.08 || branch.level === 0) {
        let left;
        left = branch.branchLeft()
        left.parent = branch
        branch.childLeft = true;
        tree.push(left)
        split(left)
      }
      if (randB > 0.08 || branch.level === 0) {
        let right;
        right = branch.branchRight()
        right.parent = branch
        branch.childRight = true;
        tree.push(right)
        split(right)
      }
      branch.final = false;
    }
  }
  split(tree[0]);
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].final) {
      leaves.push(new Leaf(tree[i].end.copy()))
      flowers.push(new Flower(tree[i].end.copy()))
    }
  }
}




function draw () {
  if (counter !== tree.length - 1) {
    // background(39, 43, 48);
    image(backgroundImage, 0, 0, width, height)
    tree[0].show();
    counter = 0
    for (let i = 1; i < tree.length; i++) {
      if (tree[i].parent.finished) {
        tree[i].show()
      }
      if (tree[i].finished) counter++
    }
  } else if (onceA === 0) {
    onceA++;
    img = get();

  } else if (counterFlowersFinished !== flowers.length || counterLeaves !== leaves.length) {
    counterFlowers = 0;
    counterFlowersFinished = 0;
    counterLeaves = 0;
    image(img, 0, 0);
    for (let i = 0; i < flowers.length; i++) {
      if(!flowers[i].finished){
        flowers[i].show();
      }
      else counterFlowersFinished++;
      if (flowers[i].grown) counterFlowers++;
    }
    if (counterFlowersFinished === flowers.length) {
      for (let i = 0; i < leaves.length; i++) {
        leaves[i].show();
        if (leaves[i].grown) counterLeaves++;
      }
    }
  } else (console.log('done'))
}