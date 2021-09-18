import { Actor } from "/actor.js";
import { NUM_CORNS } from "/model.js";

const CORN_DIM_X_UNPOPPED = 0.015;
const CORN_DIM_Y_UNPOPPED = 0.015;
const CORN_DIM_X_POPPED = 0.045;
const CORN_DIM_Y_POPPED = 0.045;

const landings = [];
const panWidth = 0.9;
const panHeight = 0.95;
const panLeft = 0.05;
const panTop = 0;
const numLandingRows = Math.ceil(panHeight / CORN_DIM_Y_POPPED);
const numLandingCols = Math.ceil((panWidth / CORN_DIM_X_POPPED) * 2);
const colSize = panWidth / numLandingCols;
const rowSize = panHeight / numLandingRows; 
for (let row = 0; row < numLandingRows; row++) {
  let landingRow = [];
  for (let col = 0; col < numLandingCols; col++) {
    landingRow.push(false);
  }
  landings.push(landingRow);
}
console.log(landings);

export class Popcorn extends Actor {
  constructor() {
    super(
      0.06 + Math.random() * 0.88,
      0.89,
      Math.random() * 2 * Math.PI,
      CORN_DIM_X_UNPOPPED,
      CORN_DIM_Y_UNPOPPED,
      "images/unpopped.png",
      "images/poppedpopcorn.png"
    );
    console.log("Constructing Popcorn");
    this.isPopped = false;
    this.vel = {
      x: -0.001 + 0.002 * Math.random(),
      y: -0.001 - 0.001 * Math.random(),
    };
    setTimeout(() => {
      this.setImage(this.imgFiles[1]);
      this.dim.x = CORN_DIM_X_POPPED;
      this.dim.y = CORN_DIM_Y_POPPED;
      this.isPopped = true;
    }, 3000 + 5000 * Math.random());
  }

  update(timeChange) {
    if (!this.isPopped) {
      return;
    }
    this.pos.x += timeChange * this.vel.x;
    this.pos.y += timeChange * this.vel.y;
    if (this.pos.x < 0.5 * this.dim.x + 0.025) {
      this.pos.x = 0.5 * this.dim.x + 0.025;
      this.vel.x *= -1;
    }
    if (this.pos.x > 1 - 0.5 * this.dim.x - 0.025) {
      this.pos.x = 1 - 0.5 * this.dim.x - 0.025;
      this.vel.x *= -1;
    }
    if (this.pos.y < 0.5 * this.dim.y) {
      this.pos.y = 0.5 * this.dim.y;
      this.vel.y *= -1;
      return;
    }

    let leadingRow = Math.floor((this.pos.y + 0.5 * this.dim.y - panTop) / rowSize);
    let leadingCol;
    if (this.vel.x < 0) {
      //Moving down-left
      leadingCol = Math.floor((this.pos.x - 0.5 * this.dim.x - panLeft) / colSize);
    } else {
      //Moving down-right
      leadingCol = Math.floor((this.pos.x + 0.5 * this.dim.x - panLeft) / colSize);
    }
    
    let centerRow = Math.floor((this.pos.y - panTop) / rowSize);
    let centerCol;
    if (this.vel.x < 0) {
      //Moving down-left
      centerCol = Math.floor((this.pos.x - panLeft) / colSize);
    } else {
      //Moving down-right
      centerCol = Math.floor((this.pos.x - panLeft) / colSize);
    }

    if (this.pos.y > 1 - 0.5 * this.dim.y - 0.075) {
      this.pos.y = 1 - 0.5 * this.dim.y - 0.075;
      this.vel.y = 0;
      this.vel.x = 0;
      landings[numLandingRows - 1][centerCol] = true;
      return;
    }

    if (this.vel.y > 0) {
      if (landings[leadingRow][leadingCol]) {
        if (!landings[leadingRow][centerCol]) {
          this.vel.x *= -1;
          return;
        }
        this.vel.y = 0; 
        this.vel.x = 0;
        landings[centerRow][centerCol] = true;
        return;
      }
    }
  }
}
