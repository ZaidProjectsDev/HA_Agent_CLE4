import {Textbox} from "./Textbox.js";
import {Actor, Color, Font, FontUnit, Input, Label, TextAlign, Timer, Vector} from "excalibur";
import {GameStateController} from "../GameState/GameStateController.js";
import {Resources} from "../resources.js";

export class BigTextBox extends Actor
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
    overflowCount 
    constructor(engine) {
        super({width:1152, height:900, color:Color.fromHex("f18805"), anchor: new Vector(0.5,0.5)});
            this.overflowCount = 0;
            this.engine = engine;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine)
            this.buildBigTextBox(_engine);
    }
    buildBigTextBox(_engine)
    {
        this.pos = new Vector(_engine.halfCanvasWidth, _engine.halfCanvasHeight);
        this.engine = _engine;


        this.speakerLabel = new Label({width:1152,height:128,font: new Font({
                family: "impact",
                size: 5,
                unit: FontUnit.Em,
                textAlign:TextAlign.Right
            }), color:Color.Yellow})
        this.addChild(this.speakerLabel);
        this.speakerLabel.anchor = new Vector(1,0.5);
        this.speakerLabel.pos = new Vector(0,-300);


        this.contentLabel  = new Label({width:1152,height:512,font: new Font({
                family: "impact",
                size: 3,
                unit: FontUnit.Em,
                textAlign:TextAlign.Start,
            }), color:Color.White,})
    
        this.addChild(this.contentLabel);
        this.contentLabel.anchor = new Vector(0.5,0.5);
        this.contentLabel.pos = new Vector(0,0);

        this.typeInterval =  new Timer({fcn:() =>this.typeWriterEffect(), interval:2, repeats: true});
        this.engine.add(this.typeInterval);
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
        if(this.textBufferIndex<this.content.length) {
            if(this.overflowCount>=53 ||this.content[this.textBufferIndex] == '.')
            {
                this.textBuffer+="\n";
                this.overflowCount = 0;
                
                if(this.content[this.textBufferIndex] == '.')
                {
                    this.textBuffer+=this.content[this.textBufferIndex];
                    this.textBufferIndex++;
                }
            }
            else
            {
                this.textBuffer+=this.content[this.textBufferIndex];
                this.overflowCount++;
                this.textBufferIndex++;
            }
            
        }
        else
        {
            this.typeInterval.stop();
            this.typeInterval.reset();
        }
        this.contentLabel.text = this.textBuffer;

    }
    typeOutText(speaker,content)
    {
        GameStateController.playSound(Resources.sndPopUp,0.9);
        this.buildBigTextBox(this.engine)
        this.showingTextBox = true;
        this.speakerLabel.text = speaker;
        let sanitizedContent = "";
        let overflow = 0;
        GameStateController.instance.showingMessage = true;
        for(let i=0; i<content.length; ++i)
        {
            if((i+32)<=content.length)
            if(content[i+32] == '.')
            {
                sanitizedContent+=content[i]+"\n" 
                overflow =0;
            }
            if(overflow>=64)
            {
                sanitizedContent+="\n" 
                sanitizedContent+=content[i]; 
                overflow =0;
              
            }

            else
            {
            
                sanitizedContent+=content[i]; 
                overflow++;
            }
            
        }
        this.content = GameStateController.wrapText(content,68);
        this.contentLabel.text = this.content;
        this.engine.clock.schedule(()=>{this.canContinue = true},500);

      //  this.typeInterval.start();
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
            if(this.typeInterval!=null)
                this.typeInterval.stop();

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
            this.spawnPosition =  new Vector(_engine.currentScene.camera.viewport.center.x, _engine.currentScene.camera.viewport.center.y);
            this.pos = this.spawnPosition;
        }
    }
}