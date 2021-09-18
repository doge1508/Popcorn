import {Actor} from "/actor.js";

export class View {
  constructor(app) {
    console.log("Constructing View");
    this.app = app;
    this.can = undefined;
    this.con = undefined;
  }

  initialize() {
    console.log("Initializing View");
    this.can = document.getElementById("can");
    this.con = this.can.getContext("2d");
    Actor.setCanvas(this.can);
    window.onresize = this.resize.bind(this);
    this.resize();
  }

  run() {
    //console.log("Running View");
    this.con.clearRect(0, 0, this.can.width, this.can.height);
    this.app.model.burner.draw();
    this.app.model.pan.draw();
    for (let i = 0; i < this.app.model.popcorns.length; i++) {
      this.app.model.popcorns[i].draw();
    }
    this.app.model.flame.draw();
  }

  finalize() {
    console.log("Finalizing View");
  }

  resize() {
    this.can.width = window.innerWidth;
    this.can.height = window.innerHeight;
  }
}
