import {Actor} from "excalibur";
import {NPC} from "../Player/NPC.js";
import {Dialogue} from "../GameState/Dialogue.js";

export class Interactable extends Actor
{
    interactionAlreadyTriggered
    interactionToRun
    showing
    faker
 constructor(width,height,interactionToRun,faker) {
     super({width:width,height:height});
     this.interactionAlreadyTriggered = false;
     this.interactionToRun = interactionToRun;
   this.faker = faker;
 }
setFakeInteract()
{
    this.showing = true;
}
 interact()
 {
     this.interactionAlreadyTriggered = true;
     if(!this.faker) {
         this.interactionToRun();
     }
     else
     {
         this.showing = true;
     }
 }
}