import {Actor, Font, FontUnit, Label, TextAlign, Color, Vector, Input, Timer} from "excalibur";
import {GameStateController} from "../GameState/GameStateController.js";


export class Textbox extends Actor
{
    isDisplaying
    content
    speaker
    contentList
    canContinue
    typeSpeed

    speakerLabel
    contentLabel

    textBuffer
    textBufferIndex
    typeInterval

    dockedPosition

    spawnPosition

    showingTextBox;
    engine
    canContinue;

    normalTextBoxParent
    bigTextBoxParent
    constructor(engine) {
        super({width:1152, height:256, color:Color.DarkGray, anchor: new Vector(0.5,0)});
            this.engine = engine;
    }

    onInitialize(_engine) {

        super.onInitialize(_engine);

        this.buildNormalTextBox(_engine);
    }
    buildNormalTextBox(_engine)
    {
        this.pos = new Vector(_engine.halfCanvasWidth, _engine.halfCanvasHeight);



        this.speakerLabel = new Label({width:1152,height:128,font: new Font({
                family: "impact",
                size: 5,
                unit: FontUnit.Em,
                textAlign:TextAlign.Center
            }), color:Color.Yellow})
        this.addChild(this.speakerLabel);
        this.speakerLabel.anchor = new Vector(0,0.5);
        this.speakerLabel.pos = new Vector(0,112);


        this.contentLabel  = new Label({width:1152,height:128,font: new Font({
                family: "impact",
                size: 4,
                unit: FontUnit.Em,
                textAlign:TextAlign.Left
            }), color:Color.White})
        this.addChild(this.contentLabel);
        this.contentLabel.anchor = new Vector(0.5,0.5);
        this.contentLabel.pos = new Vector(0,168);

      //  this.typeInterval =  new Timer({fcn:() =>this.typeWriterEffect(), interval:90,repeats :true});
       // this.engine.add(this.typeInterval);
    }

    hideTextBox()
    {
        this.active = false;
    }
    completeText()
    {
        GameStateController.instance.showingMessage = false;
        this.showingTextBox = false;
    }
    typeWriterEffect()
    {
        console.log("beep");

        if(this.textBufferIndex<this.content.length) {
            this.textBuffer+=this.content[this.textBufferIndex];
            this.textBufferIndex++;
        }
        else
        {
            this.typeInterval.stop();
        }
        this.contentLabel.text = this.textBuffer;
    }
    typeOutText(speaker,content)
    {
        this.buildNormalTextBox(this.engine);
        this.showingTextBox = true;
        this.speakerLabel.text = speaker;
        this.content = content;
        this.engine.clock.schedule(()=>{this.canContinue = true},500);
        this.contentLabel.text = this.content;
        GameStateController.instance.showingMessage = true;
        // this.typeInterval.start();
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(!this.showingTextBox)
        {
            this.dockedPosition =  new Vector(_engine.halfDrawWidth, _engine.halfDrawHeight*32);

            this.pos = this.dockedPosition;
            this.speakerLabel.text = ""
            this.contentLabel.text ="";
            this.content = "";
            this.textBufferIndex = 0;
            this.textBuffer = "";
            this.canContinue = false;
        //    if(this.typeInterval!=null)
        //    this.typeInterval.stop();

        }
        else
        {



        }


    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        if(this.canContinue)
            if (_engine.input.keyboard.isHeld(Input.Keys.Space) || _engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face1))
            {
                this.completeText();


            }
        if(this.showingTextBox)
        {
            this.spawnPosition =  new Vector(_engine.currentScene.camera.viewport.center.x, _engine.currentScene.camera.viewport.center.y+200);
            this.pos = this.spawnPosition;
        }
    }

}