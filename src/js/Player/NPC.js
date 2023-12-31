import {Actor} from "excalibur";
import {Interactable} from "../Generics/Interactable.js";
import {GameStateController} from "../GameState/GameStateController.js";
import {Dialogue} from "../GameState/Dialogue.js";


export class NPC extends Actor
{
    genericDialogue
    missionDialogue
    dialogue
    interactionBox
    canUseMissionDialogue
    canShowDialogues
    showingDialogue
    dialogueDone
    functionToExecute;
    constructor(options) {
        super(options);
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
       // GameStateController.showDialogueMessage(this.genericDialogue);
    }
    setInteractionBox(width, height)
    {
        this.interactionBox = new Interactable(width,height,this.canShowDialogue,true);
        this.addChild(this.interactionBox);
    }
    canShowDialogue()
    {
        GameStateController.instance.lastUsedDialog = this.genericDialogue;
    }
    executeFunction()
    {
        if(this.showingDialogue)
        {
            if(this.dialogueDone)
            {
                if(this.functionToExecute!= "");
                {
                    console.log("Fuck you");
                    eval(this.functionToExecute);
                    this.showingDialogue = false;
                    this.dialogueDone = false;

                }
            }
        }
    }
    runDialogue(dialogue)
    {

        GameStateController.showDialogueMessage(this.genericDialogue)
    }
    checkDialogueOptions()
    {
        if(this.canUseMissionDialogue)
        {
            this.dialogue = this.missionDialogue;
        }
        else {
            this.dialogue = this.genericDialogue;
        }
        if(this.interactionBox!=null) {
            if (this.interactionBox.showing) {
                GameStateController.showDialogueMessage(this.dialogue);
                this.interactionBox.showing = false;
            }
        }
        else
        {
            GameStateController.showDialogueMessage(this.dialogue);
        }
       // console.log(this.genericDialogue)
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.checkDialogueOptions();
        this.executeFunction();
    }
}