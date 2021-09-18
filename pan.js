import {Actor} from "/actor.js";

export class Pan extends Actor {
  constructor() {
    super(0.5, 0.475, 0, 1, 0.95, "/images/pan.svg");
    console.log("Constructing Pan");
  }
}
