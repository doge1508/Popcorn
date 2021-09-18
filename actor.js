let can = undefined;
let con = undefined;
let imgs = {};

export class Actor {
  constructor(posX, posY, posA, dimX, dimY, ...imgFiles) {
    this.imgFiles = imgFiles;
    this.pos = { x: posX, y: posY, a: posA };
    this.dim = { x: dimX, y: dimY };
    for (let imgFile of imgFiles) {
      if (!imgs[imgFile]) {
        imgs[imgFile] = new Image();
        imgs[imgFile].src = imgFile;
      }
    }
    this.img = imgs[imgFiles[0]];
  }

  draw() {
    con.translate(this.pos.x * can.width, this.pos.y * can.height);
    con.rotate(this.pos.a);
    con.drawImage(
      this.img,
      -0.5 * this.dim.x * can.width,
      -0.5 * this.dim.y * can.height,
      this.dim.x * can.width,
      this.dim.y * can.height
    );
    con.rotate(-this.pos.a);
    con.translate(-this.pos.x * can.width, -this.pos.y * can.height);
  }

  update(timeChange) {}

  static setCanvas(canvas) {
    can = canvas;
    con = can.getContext("2d");
  }

  static getImage(imgFile) {
    return imgs[imgFile];
  }

  setImage(imgFile) {
    this.img = imgs[imgFile];
  }
}
