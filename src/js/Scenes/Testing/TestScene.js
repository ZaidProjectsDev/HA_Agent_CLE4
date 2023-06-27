import {ExtendedScene} from "../ExtendedScene.js";
import {
    Actor,
    BoundingBox,
    CollisionType,
    Color,
    CompositeCollider,
    EdgeCollider,
    Input, Random,
    Trigger,
    Vector
} from "excalibur";
import {GameStateController} from "../../GameState/GameStateController.js";
import {Resources} from "../../resources.js";
import {Textbox} from "../../Textbox/Textbox.js";
import {BigTextBox} from "../../Textbox/BigTextBox.js";
import {Interactable} from "../../Generics/Interactable.js";
import {SoundProperty} from "../../GameState/SoundProperty.js";
import {NPC} from "../../Player/NPC.js";
import {Dialogue} from "../../GameState/Dialogue.js";

export class TestScene extends ExtendedScene
{
    backgroundImage
    backgroundImageCollision
    testTextbox
    trigger
    sam
    cornelius
    hendrik
    constructor() {
        super();

    }


    showPoliceMessage()
    {
        GameStateController.showTextBoxMessage("Police", "Oh hello detective, I am glad you are here! I am the night guard, and I heard a suspicious sound last night. When I came to check I saw William Pierrie, the chairman dead on the ground. The body is just inside in the room of the left. Please have a look.");
    }
    showTutorialMessage()
    {
        GameStateController.instance.alreadyShowedTutorialMessage =true;
        GameStateController.showPopUpMessage("Welcome",  "You are a detective from the Holland Rotterdam Agency who is investigating the murder of William Pirrie, chairman of Harland and Wolff."+
                                                                                 "A famous businessman and partner of the Holland Amerika Line. He was visiting the Holland Amerika Line Office. As you were doing your investigation ,"+
                                                                                 "someone set off an unsolicited test of a Time Machine which subsequently broke down and caused the entirety of the location to be torn apart between the Present and Past."+
                                                                                 "You must continue your investigation into the murder, despite being stranded in various environments that change based on your interaction with them. You will jump between Past and Present and"+
                                                                                 " must find a way to use that to your advantage or find your way back." );
    }
    showBloodExaminationMessage()
    {
        GameStateController.showTextBoxMessage("You", "This blood seems fresh, unfortunate soul.\nI should follow the trail inside\n to look for more clues.\,My investigation is starting\n to get interesting.");
    }
    defineCollisions()
    {

        GameStateController.parseXMLToCollider("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<mxfile host=\"app.diagrams.net\" modified=\"2023-06-21T12:32:46.128Z\" agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51\" version=\"21.3.6\" etag=\"TpwoRuWfWwxcMMcTJ5kE\" type=\"google\">\n" +
            "  <diagram name=\"Page-1\" id=\"T5fxANU6uVSpAXNNg0ao\">\n" +
            "    <mxGraphModel dx=\"5490\" dy=\"3153\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"1654\" pageHeight=\"1169\" math=\"0\" shadow=\"0\">\n" +
            "      <root>\n" +
            "        <mxCell id=\"0\" />\n" +
            "        <mxCell id=\"1\" parent=\"0\" />\n" +
            "        <mxCell id=\"2\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"520\" width=\"110\" height=\"1518\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"3\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1900\" y=\"550\" width=\"580\" height=\"180\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"4\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"620\" y=\"1458\" width=\"2080\" height=\"60\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"5\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"630\" width=\"1660\" height=\"60\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"6\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"2600\" width=\"98\" height=\"1460\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"7\" value=\"\" style=\"whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1770\" y=\"960\" width=\"50\" height=\"440\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"8\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1820\" y=\"960\" width=\"780\" height=\"60\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"9\" value=\"\" style=\"whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1820\" y=\"1320\" width=\"780\" height=\"80\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"10\" value=\"\" style=\"whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"827\" y=\"1270\" width=\"723\" height=\"120\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"11\" value=\"\" style=\"whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1170\" y=\"960\" width=\"470\" height=\"270\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"12\" value=\"\" style=\"ellipse;whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"820\" y=\"960\" width=\"270\" height=\"270\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"13\" value=\"\" style=\"ellipse;whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1010\" y=\"290\" width=\"120\" height=\"120\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"14\" value=\"\" style=\"ellipse;whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1010\" y=\"30\" width=\"120\" height=\"120\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "      </root>\n" +
            "    </mxGraphModel>\n" +
            "  </diagram>\n" +
            "</mxfile>\n")
       // let col1 = new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:64, height:4098, pos: new Vector(496,15)})
      //  this.engine.add(col1);
     //   let col2= new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:4098, height:64, pos: new Vector(1000,1471)})
     //   this.engine.add(col2);
     //   let col3= new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:64, height:4098, pos: new Vector(2840,15)})
     //   this.engine.add(col3);
     //   let col4= new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:4098, height:64, pos: new Vector(1000,15)})
   //     this.engine.add(col4);
   ////     let colPillar1 = new Actor({collisionType:CollisionType.Fixed, color:Color.Black, radius: 35, pos: new Vector(1086,388)})
     //   this.engine.add(colPillar1) ;
   //     let colPillar2 = new Actor({collisionType:CollisionType.Fixed, color:Color.Black, radius: 35, pos: new Vector(1086,88)})
   //     this.engine.add(colPillar2) ;
    //    let colBooth =  new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:512, height:192, pos: new Vector(2245,764)})
    //    this.engine.add(colBooth);
    }
    goToInteriorA()
    {
        GameStateController.instance.cameFromInside = true;
        GameStateController.playSound(Resources.sndUnlock,1);
       GameStateController.getEngine().goToScene("Interior_A");
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);


        //this.testTextbox = new BigTextBox();
     //   this.add(this.testTextbox);



    }
onPreUpdate(_engine, _delta) {
    super.onPreUpdate(_engine, _delta);
    if(this.hendrik!=null) {
        this.hendrik.rotation =1.56;

     //   console.log(this.hendrik.rotation)
    }
}

    onActivate(_context) {
        super.onActivate(_context);
        _context.engine.backgroundColor = Color.Black;


        this.setBackground(Resources.backgroundImageTest.toSprite(),new Vector(2,2));


        if(GameStateController.instance.cameFromInside)
        {
            GameStateController.spawnPlayer(new Vector(2321,201));
        }
        else
        {
            GameStateController.spawnPlayer(new Vector(722,970));
        }

        this.setCameraToPlayer()
        this.setCameraBariers(0,1600,0,2900);
      //  _context.engine.currentScene.camera.strategy.elasticToActor(GameStateController.instance.player,0.1,0.1);
        //_context.engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox({top:0,bottom:1600,left:0, right:2900}));

       //_context.engine.showDebug(true);

      //  const policeTrigger1 = new Interactable(32, 32, this.showPoliceMessage);
     //   policeTrigger1.pos = new Vector(1369,896);
        const bloodMessageTrigger  = new Interactable(32, 32, this.showBloodExaminationMessage);
        bloodMessageTrigger .pos = new Vector(2449,264);
        const newRoomTrigger = new Interactable(256, 32, this.goToInteriorA);
        newRoomTrigger.pos = new Vector(2445,79);

          //  _context.engine.currentScene.add(policeTrigger1);
         _context.engine.currentScene.add(newRoomTrigger);
        // GameStateController.getEngine().add(bloodMessageTrigger);
        GameStateController.playBGM(Resources.bgmExterior,0.5,true);
      //  this.defineCollisions();


        this.sam = new NPC({width:32,height:32, pos: new Vector(1402,435)});
        this.sam.graphics.use(Resources.npc_cop.toSprite());
        this.sam.setInteractionBox(640,640);
        this.sam.scale = new Vector(0.3,0.3);
        this.sam.genericDialogue = new Dialogue("Sam", ["Hello, thank you for investigating the case.", "Let me know if you need something."],"", this.sam);
        this.sam.missionDialogue = new Dialogue("Sam", ["Eh I am used to people dying around me.","...","If the Wanderson Melody helps you solve the murder case, it ends in a B. Try that?"],"",this.sam);
        this.add(this.sam);

        this.cornelius = new NPC({width:32,height:32, pos: new Vector(709,608)});
        this.cornelius.graphics.use(Resources.npc_white_hat.toSprite());
        this.cornelius.setInteractionBox(640,640);
        this.cornelius.scale = new Vector(0.3,0.3);
        this.cornelius.genericDialogue = new Dialogue("Cornelius", ["This is awful.", "Why?", "The weather is too nice to be sad."],"",this.cornelius);
        this.cornelius.missionDialogue = new Dialogue("Cornelius", ["Oi mornin!","The Wanderson Melody is great alright."," Definitely use an A after the C tone"],"",this.cornelius);
        this.cornelius.rotation =1.56;
        this.add( this.cornelius);

        this.hendrik = new NPC({width:32,height:32, pos: new Vector(1181,1111)});
        this.hendrik.graphics.use(Resources.npc_cap_brown.toSprite());
        this.hendrik.setInteractionBox(640,640);
        this.hendrik.scale = new Vector(0.3,0.3);

        this.hendrik.genericDialogue = new Dialogue("Hendrik", ["Top of the morning!"],"",this.hendrik);
        this.hendrik.missionDialogue = new Dialogue("Hendrik", [" Heh morning.", "The Wanderson Melody is famous for unlocking doors.", "Try C for the second letter."],"",this.hendrik);
        this.add( this.hendrik);


        this.hendrik.canUseMissionDialogue = GameStateController.instance.alreadyExploredInside;
        this.cornelius.canUseMissionDialogue = GameStateController.instance.alreadyExploredInside;
        this.sam.canUseMissionDialogue = GameStateController.instance.alreadyExploredInside;
        if(!GameStateController.instance.alreadyShowedTutorialMessage)
        this.showTutorialMessage();

        GameStateController.logAllActors(_context.engine);
    }

    onDeactivate(_context) {
        super.onDeactivate(_context);
        GameStateController.killAllActors(_context.previousScene)

    }




}