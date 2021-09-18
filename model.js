import {Burner} from "/burner.js";
import { Flame } from "/flame.js";
import {Pan} from "/pan.js";
// import {Lid} from "/lid.js";
// import {Dial} from "/dial.js";
// import {Temperature} from "/temp.js";
import {Popcorn} from "/popcorn.js";

export const NUM_CORNS = 1000;

export class Model {
  constructor(app) {
    console.log("Constructing Model");
    this.app = app;
    this.burner = new Burner();  
    this.flame = new Flame();
    this.pan = new Pan();
    // this.lid = undefined;
    // this.dial = undefined;
    // // this.temperature = undefined;
    this.popcorns = [];
    for (let i = 0; i < NUM_CORNS; i++) {
      this.popcorns.push(new Popcorn());
    }
  }

  initialize() {
    console.log("Initializing Model");
    // this.lid = new Lid();
    // this.dial = new Dial();
    // this.temperature = new Temperature();
  }

  run(timeChange) {
    //console.log("Running Model");
    this.flame.update(timeChange);
    for (let i = 0; i < NUM_CORNS; i++) {
      this.popcorns[i].update(timeChange);
    }
  }

  finalize() {
    console.log("Finalizing Model");
  }
}
