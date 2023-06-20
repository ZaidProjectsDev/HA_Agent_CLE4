import {Actor} from "excalibur";

export class Interactable extends Actor
{
    interactionAlreadyTriggered
    interactionToRun
 constructor(width,height,interactionToRun) {
     super({width:width,height:height});
     this.interactionAlreadyTriggered = false;
     this.interactionToRun = interactionToRun;
 }

 interact()
 {
     this.interactionAlreadyTriggered = true;
    this.interactionToRun();
 }
}