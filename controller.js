export class Controller {
  constructor(app) {
    console.log("Constructing Controller");
    this.app = app;
  }

  initialize() {
    console.log("Initializing Controller");
  }

  run() {
    //console.log("Running Controller");
  }

  finalize() {
    console.log("Finalizing Controller");
  }
}
