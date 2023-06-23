//The player character's main script.
import {Actor, CollisionType, Color, Input, Vector} from "excalibur";
import {GameStateController} from "../GameState/GameStateController.js";
import {Weapon} from "../Weapon.js";
import {Interactable} from "../Generics/Interactable.js";
import {Resources} from "../resources.js";

export class Player extends Actor
{
    moveSpeed
    moveMultiplier
    moveVelocity
    engine

    interactBubble
    currentInteracation;
    //Todo: Add possible logic for sprite direction and context cases.
    constructor(movesSpeed) {
        super({ width:32, height:32, radius:496, color: Color.Azure, collisionType:CollisionType.Active});
        this.moveVelocity = new Vector(0,0);
        this.moveSpeed = movesSpeed;
        this.body.useGravity = false;
        this.interactBubble = new Actor({radius:512});
        this.addChild(this.interactBubble);
        this.interactBubble.on('collisionstart', (evt) => {this.evaluateInteraction(evt)})
        this.interactBubble.on('collisionend', (evt) => {this.endInteraction(evt)})
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        _engine.input.gamepads.at(0).on('button', (evt => {
           this.triggerInteraction();
        }))
        _engine.input.keyboard.on('press', (evt) => {
            if(GameStateController.playerCanMove()) {
                if (evt.key == "Space") {
                    this.triggerInteraction()
                }
            }

        })
        this.graphics.use(Resources.sptHat.toSprite());
        this.scale = new Vector(0.1,0.1);
    }
    triggerInteraction()
    {

        if(this.currentInteracation == null)
        {
            return;
        }
        this.currentInteracation.interact();
        GameStateController.setInteractionIconState(false, new Vector(      this.currentInteracation.pos.x,   this.currentInteracation.pos.y-128));
        this.currentInteracation = null;

    }
    evaluateInteraction(evt)
    {
        if(evt.other instanceof Interactable)
        {
            if(evt.other.pos.y<GameStateController.getEngine().currentScene.camera.pos.y-200)
            {
                GameStateController.setInteractionIconState(true, new Vector(evt.other.pos.x,evt.other.pos.y));
            }
            else {
                GameStateController.setInteractionIconState(true, new Vector(evt.other.pos.x, evt.other.pos.y - 128));
            }
            this.currentInteracation=  evt.other;
        }
        else
        {
            let i = null;
            if(evt.other.children.length>0)
            {
                if(evt.other.children[0] instanceof Interactable)
                {
                    i = evt.other.children[0];
                    if(i.pos.y<GameStateController.getEngine().currentScene.camera.pos.y-200)
                    {
                        GameStateController.setInteractionIconState(true, new Vector(evt.other.pos.x,evt.other.pos.y));
                    }
                    else {
                        GameStateController.setInteractionIconState(true, new Vector(evt.other.pos.x, evt.other.pos.y - 128));
                    }
                    this.currentInteracation=  i;
                }
            }
        }

    }
    endInteraction(evt)
    {
        if(evt.other instanceof Interactable)
        {
            GameStateController.setInteractionIconState(false, new Vector(evt.other.pos.x,evt.other.pos.y-128));
            evt.other.interactionAlreadyTriggered = false;
            this.currentInteracation = null;
        }

    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.engine = _engine;
        if(GameStateController.playerCanMove()) {
            this.updateInput();
        }
        this.updateMovement();
    }

    ///Read player input and update the movevelocity.
    updateInput()
    {

        if(this.engine.input.keyboard.isHeld(Input.Keys.ShiftLeft) || this.engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face2))
        {

            this.moveMultiplier = 4;
        }
        else
        {

            this.moveMultiplier =1;
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.D) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) > 0.1)
        {
            this.moveVelocity = new Vector(1*this.moveSpeed*this.moveMultiplier,this.moveVelocity.y);
        }
        else
        {
            if (this.engine.input.keyboard.isHeld(Input.Keys.A) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) < -0.1)
            {
                this.moveVelocity = new Vector(-1*this.moveSpeed*this.moveMultiplier,this.moveVelocity.y);
            }
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.W) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY) < -0.1)
        {
            this.moveVelocity = new Vector(this.moveVelocity.x,-1*this.moveSpeed*this.moveMultiplier);
        }
        else
        {
            if (this.engine.input.keyboard.isHeld(Input.Keys.S) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY) > 0.1)
            {
                this.moveVelocity = new Vector(this.moveVelocity.x,1*this.moveSpeed*this.moveMultiplier);
            }
        }
    }

    //UpdatePlayerMovement
    updateMovement()
    {
        this.vel = this.moveVelocity;
        this.moveVelocity = new Vector(this.moveVelocity.x*0.9, this.moveVelocity.y*0.9)
     if(this.moveVelocity.x>0.8 ||this.moveVelocity.x<-0.8 ||
         this.moveVelocity.y>0.8 ||this.moveVelocity.y<-0.8 ) {
            console.log(this.pos);
        }
    }

}