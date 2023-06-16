//The player character's main script.
import {Actor, CollisionType, Color, Input, Vector} from "excalibur";

export class Player extends Actor
{
    moveSpeed
    moveVelocity
    engine
    //Todo: Add possible logic for sprite direction and context cases.
    constructor(movesSpeed) {
        super({width:64, height:64, color: Color.Azure, collisionType:CollisionType.Active});
        this.moveVelocity = new Vector(0,0);
        this.moveSpeed = movesSpeed;
        this.body.useGravity = false;
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.engine = _engine;
        this.updateInput();
        this.updateMovement();
    }

    ///Read player input and update the movevelocity.
    updateInput()
    {
        if (this.engine.input.keyboard.isHeld(Input.Keys.D) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) > 0.5)
        {
            this.moveVelocity = new Vector(1*this.moveSpeed,this.moveVelocity.y);
        }
        else
        {
            if (this.engine.input.keyboard.isHeld(Input.Keys.A) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) < -0.5)
            {
                this.moveVelocity = new Vector(-1*this.moveSpeed,this.moveVelocity.y);
            }
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.W) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY) > 0.5)
        {
            this.moveVelocity = new Vector(this.moveVelocity.x,-1*this.moveSpeed);
        }
        else
        {
            if (this.engine.input.keyboard.isHeld(Input.Keys.S) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY) < -0.5)
            {
                this.moveVelocity = new Vector(this.moveVelocity.x,1*this.moveSpeed);
            }
        }
    }

    //UpdatePlayerMovement
    updateMovement()
    {
        this.vel = this.moveVelocity;
        this.moveVelocity = new Vector(this.moveVelocity.x*0.9, this.moveVelocity.y*0.9)
        console.log(this.pos);
    }

}