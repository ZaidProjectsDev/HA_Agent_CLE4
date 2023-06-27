import {Actor} from "excalibur";
import {NPC} from "../Player/NPC.js";
import {Dialogue} from "../GameState/Dialogue.js";
import {GameStateController} from "../GameState/GameStateController.js";

export class Interactable extends Actor
{
    interactionAlreadyTriggered
    interactionToRun
    showing
    faker
    sceneConn
 constructor(width,height,interactionToRun,faker) {
     super({width:width,height:height});
     this.interactionAlreadyTriggered = false;
     this.interactionToRun = interactionToRun;
     this.sceneConn = GameStateController.getEngine().currentScene;
   this.faker = faker;
 }
 onPreUpdate(_engine, _delta) {
     super.onPreUpdate(_engine, _delta);
     if(_engine.currentScene!= this.sceneConn)
     {
         this.kill();
     }
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