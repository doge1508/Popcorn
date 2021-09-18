import {Actor} from "/actor.js"

export class Flame extends Actor {
  constructor() {
    super(0.5, 0.925, 0, 1, 0.1, "./images/flame-0.png", "./images/flame-1.png", "./images/flame-2.png", "./images/flame-3.png", "./images/flame-4.png")
    console.log("Constructing Flame");
    // this.imgs = [];
    this.imgIndex = 0;
    // for (let i = 0; i < 5; i++) {
    //   let img = new Image();
    //   img.src = `./images/flame-${i}.png`;
    //   this.imgs.push(img);
    // }
  }

  update(timeChange) {
    this.imgIndex++;
    if (this.imgIndex === 5) {
        this.imgIndex = 0;
    }
    this.img = Actor.getImage(this.imgFiles[this.imgIndex]);
  }
}
