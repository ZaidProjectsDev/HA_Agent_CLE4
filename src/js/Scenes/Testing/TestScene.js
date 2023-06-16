import {ExtendedScene} from "../ExtendedScene.js";
import {Actor, BoundingBox, CollisionType, Color, CompositeCollider, EdgeCollider, Input, Vector} from "excalibur";
import {GameStateController} from "../../GameState/GameStateController.js";
import {Resources} from "../../resources.js";
import {Textbox} from "../../Textbox/Textbox.js";

export class TestScene extends ExtendedScene
{
    backgroundImage
    backgroundImageCollision;
     testTextbox
    constructor() {
        super();

    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);

        if (_engine.input.keyboard.isHeld(Input.Keys.Space) || _engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face1))
        {
            if(!this.testTextbox.showingTextBox) {
                this.testTextbox.showingTextBox = true;
                this.testTextbox.typeOutText("Johnny Boyo", "This is a test message, I love you.");
            }
        }
    }

    onActivate(_context) {
        super.onActivate(_context);
      //
        //_context.engine.showDebug(true);
        _context.engine.backgroundColor = Color.Black;
        let backgroundImageSprite = Resources.backgroundImageTest.toSprite();
        let backgroundImageSpriteCollision = Resources.backgroundImageCollision.toSprite();
        this.backgroundImage = new Actor({width:backgroundImageSprite.width, height:backgroundImageSprite.height, anchor:new Vector(0,0,)});
        this.backgroundImage.graphics.use(backgroundImageSprite);
        this.backgroundImage.scale = new Vector(2,2);
        this.engine.add(this.backgroundImage);
        this.backgroundImageCollision = new Actor({width:backgroundImageSprite.width, height:backgroundImageSprite.height, collisionType:CollisionType.PreventCollision});

  //      this.backgroundImageCollision.graphics.use(backgroundImageSpriteCollision);
     //   this.backgroundImageCollision.scale = new Vector(1,1);_context.engine.currentScene.add(this.backgroundImage);
      //  _context.engine.currentScene.add(this.backgroundImageCollision);
       // _context.engine.backgroundColor  = Color.Red;

       GameStateController.instance.spawnPlayer(new Vector(0,0));
        this.testTextbox = new Textbox();
        _context.engine.currentScene.add(this.testTextbox);
        _context.engine.currentScene.camera.strategy.elasticToActor(GameStateController.instance.player,0.1,0.1);
        _context.engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox({top:0,bottom:1600,left:0, right:2900}));


    }
}