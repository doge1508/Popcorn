import { Controller } from "./controller.js";
import { Model } from "./model.js";
import { View } from "./view.js";

export class App {
  constructor() {
    console.log("Constructing App");
    this.model = new Model(this);
    this.view = new View(this);
    this.controller = new Controller(this);
    this.isRunning = true;
    window.onload = () => {
      this.initialize();
      requestAnimationFrame(this.run.bind(this));
    };
  }

  initialize() {
    console.log("Initializing App");
    this.model.initialize();
    this.view.initialize();
    this.controller.initialize();
  }

  run(timeNow) {
    console.log("Running App");
    let timePrior = timeNow;
    let that = this;
    requestAnimationFrame(_run);


    function _run(timeNow) {
      if (!that.isRunning) {
        that.finalize();
        return;
      }
      let timeChange = timeNow - timePrior;
      that.controller.run();
      that.model.run(timeChange);
      that.view.run();
      timePrior = timeNow;
      requestAnimationFrame(_run);
    }
  }

  finalize() {
    console.log("Finalizing App");
    this.model.finalize();
    this.view.finalize();
    this.controller.finalize();
  }
}
