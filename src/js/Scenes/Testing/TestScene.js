import {ExtendedScene} from "../ExtendedScene.js";
import {
    Actor,
    BoundingBox,
    CollisionType,
    Color,
    CompositeCollider,
    EdgeCollider,
    Input,
    Trigger,
    Vector
} from "excalibur";
import {GameStateController} from "../../GameState/GameStateController.js";
import {Resources} from "../../resources.js";
import {Textbox} from "../../Textbox/Textbox.js";
import {BigTextBox} from "../../Textbox/BigTextBox.js";

export class TestScene extends ExtendedScene
{
    backgroundImage
    backgroundImageCollision
    testTextbox
    trigger
    constructor() {
        super();

    }


    showPoliceMessage()
    {
        GameStateController.instance.showTextBoxMessge("Police", "OH YEAH");
    }
    showTutorialMessage()
    {
        GameStateController.instance.showPopUpMessage("Welcome", "You are a detective from the Holland Rotterdam Agency who is investigating the murder of William Pirrie, chairman of Harland and Wolff."+
                                                                                 "A famous businessman and partner of the Holland Amerika Line. He was visiting the Holland Amerika Line Office. As you were doing your investigation ,"+
                                                                                 "someone set off an unsolicited test of a Time Machine which subsequently broke down and caused the entirety of the location to be torn apart between the Present and Past."+
                                                                                 "You must continue your investigation into the murder, despite being stranded in various environments that change based on your interaction with them. You will jump between Past and Present and"+
                                                                                 " must find a way to use that to your advantage or find your way back." );
    }
    defineCollisions()
    {
        let col1 = new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:64, height:4098, pos: new Vector(496,15)})
        this.engine.add(col1);
        let col2= new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:4098, height:64, pos: new Vector(1000,1471)})
        this.engine.add(col2);
        let col3= new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:64, height:4098, pos: new Vector(2840,15)})
        this.engine.add(col3);
        let col4= new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:4098, height:64, pos: new Vector(1000,15)})
        this.engine.add(col4);
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.testTextbox = new BigTextBox();
        this.add(this.testTextbox);
        this.defineCollisions();
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
    //    this.backgroundImageCollision = new Actor({width:backgroundImageSprite.width, height:backgroundImageSprite.height, collisionType:CollisionType.PreventCollision});

  //      this.backgroundImageCollision.graphics.use(backgroundImageSpriteCollision);
     //   this.backgroundImageCollision.scale = new Vector(1,1);_context.engine.currentScene.add(this.backgroundImage);
      //  _context.engine.currentScene.add(this.backgroundImageCollision);
       // _context.engine.backgroundColor  = Color.Red;

       GameStateController.instance.spawnPlayer(new Vector(722,970));

        _context.engine.currentScene.camera.strategy.elasticToActor(GameStateController.instance.player,0.1,0.1);
        _context.engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox({top:0,bottom:1600,left:0, right:2900}));

        _context.engine.showDebug(true);
        this.showTutorialMessage();

         const policeTrigger1 = new Trigger({
            width: 32,
            height: 32,
            repeat: 1,
            pos: new Vector(1369, 896),
            target: GameStateController.instance.player,
            action: this.showPoliceMessage,
            color: Color.Red
        })
        _context.engine.currentScene.add(policeTrigger1);

    }

}