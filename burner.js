import {Actor} from "/actor.js";

export class Burner extends Actor {
  constructor() {
    super(0.5, 0.95, 0, 1, 0.1, "./images/burner.png" );
    console.log("Constructing Burner");
  }
}
