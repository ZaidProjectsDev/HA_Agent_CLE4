import {ExtendedScene} from "../../ExtendedScene.js";
import {Actor, Vector, Scene, Color, Trigger, CollisionType} from "excalibur";
import {GameStateController} from "../../../GameState/GameStateController.js";
import {Resources} from "../../../resources.js";
import {Interactable} from "../../../Generics/Interactable.js";
import {NPC} from "../../../Player/NPC.js";
import {Dialogue} from "../../../GameState/Dialogue.js";
export class Interior_A extends ExtendedScene
{
    policeTrigger3
    exteriorDoor
    pianoTrigger
    johanna
    aletta
    waluwigi
    blackvoid
    onActivate(_context) {
        super.onActivate(_context);
        this.setCollisions();
        _context.engine.backgroundColor = Color.Black;
        this.setBackground(Resources.bkgInteriorA.toSprite(),new Vector(2,2));
        if(GameStateController.instance.pianoWasIncorrect)
        {
            this.spawnPlayer( new Vector(1600,998));
        }
        else {
            this.spawnPlayer(new Vector(1354, 1240));
        }
        this.setCameraToPlayer();
        this.setCameraBariers(150,1445,0,2640)
        /*
        this.policeTrigger3 = new Trigger({
            width: 90,
            height: 90,
            repeat: 1,
            pos: new Vector(668, 775),
            target: GameStateController.instance.player,
            action: this.deadBodyExamine,
            color: Color.Red
        })
        */
        this.blackvoid = new Actor({collisionType:CollisionType.Fixed, color:Color.Black,width:2048,height:2048,pos: new Vector(1885,640),anchor: new Vector(0,0)})
        this.add(this.blackvoid);

        this.deadbody = new NPC({width:32,height:32, pos: new Vector(668,755)});
       // this.deadbody.graphics.use(Resources.npc_lady_blue.toSprite());
        this.deadbody.setInteractionBox(640,640);
        this.deadbody.scale = new Vector(0.3,0.3);
        this.deadbody.genericDialogue = new Dialogue("You", ["Oh dear.","Oh, there's a note.","It says...","I have done the unthinkable", "To find me, you must solve the Wanderson Melody."],"",this.deadbody);
        this.deadbody.functionToExecute = `GameStateController.getEngine().currentScene.diaJoannaChangeState()`;
        this.deadbody.rotation =-1.2;
        this.add(this.deadbody);

        this.exteriorDoor = new Trigger({
            width: 90,
            height: 90,
            repeat: true,
            pos: new Vector(1354, 1353),
            target: GameStateController.instance.player,
            action: this.goToExterior,
            color: Color.Red
        })
        this.pianoTrigger = new Interactable(96,96, this.goToPianoPuzzle);
        this.pianoTrigger.pos = new Vector(1730,1031);
        GameStateController.getEngine().add(this.pianoTrigger);
        //GameStateController.instance.showPopUpMessage("Test", "BogosBinted");

        GameStateController.getEngine().add(this.deadbody);
        GameStateController.getEngine().add(this.exteriorDoor);

        GameStateController.playBGM(Resources.bgmInteriorA,0.5,true);
        GameStateController.checkForRequiredStuff();
        GameStateController.checkForDialog();





        this.johanna = new NPC({width:32,height:32, pos: new Vector(218,758)});
        this.johanna.graphics.use(Resources.npc_lady_blue.toSprite());
        this.johanna.setInteractionBox(640,640);
        this.johanna.scale = new Vector(0.3,0.3);
        this.johanna.genericDialogue = new Dialogue("Johanna", ["Oh no my husband!"],"", this.johanna);
        this.johanna.missionDialogue =  new Dialogue("Johanna", ["A melody?", "Well, we have a piano in the main hall.", "My husband loved to play the piano"],"", this.johanna);
        this.johanna.canUseMissionDialogue = GameStateController.instance.joannaMission;
        this.johanna.genericDialogue.playSound = Resources.voice_2;
        this.johanna.missionDialogue.playSound = Resources.voice_2;
        this.johanna.rotation =-1.2;
        this.add(this.johanna);


        this.aletta = new NPC({width:32,height:32, pos: new Vector(886,1201)});
        this.aletta.graphics.use(Resources.npc_lady_red.toSprite());
        this.aletta.setInteractionBox(640,640);
        this.aletta.scale = new Vector(0.3,0.3);
        this.aletta.genericDialogue = new Dialogue("Aletta", ["Dont talk to me.", "I didn't do squat!", "AGGGH!"],"", this.aletta);
        this.aletta.missionDialogue = new Dialogue("Aletta", ["A melody?", "The Wanderson Melody?", "I think t started with the D tone?", "Why do you need it anyway?", "Try heading outside, someone else probably knows the rest."],"", this.aletta)
        this.aletta.canUseMissionDialogue = GameStateController.instance.alettaMission;
        this.aletta.genericDialogue.playSound = Resources.voice_6;
        this.aletta.missionDialogue.playSound = Resources.voice_6;
        this.aletta.rotation =-1;
        this.add(this.aletta);

    }
    onDeactivate(_context) {
        super.onDeactivate(_context);
        GameStateController.killAllActors(_context.previousScene);
    }

    diaJoannaChangeState()
    {
        console.log("BOGOS BINTED")
        this.johanna.canUseMissionDialogue = true;
        this.aletta.canUseMissionDialogue = true;
        GameStateController.instance.alettaMission = this.aletta.canUseMissionDialogue;
        GameStateController.instance.joannaMission = this.johanna.canUseMissionDialogue;
        GameStateController.instance.alreadyExploredInside = true;
        this.johanna.interactionBox.interact();
    }
    getRidOfBlackBox()
    {
        this.blackvoid.kill();
        this.waluwigi = new NPC({width:32,height:32, pos: new Vector(2200,809)});
        this.waluwigi.graphics.use(Resources.npc_cop.toSprite());
        this.waluwigi.setInteractionBox(640,640);
        this.waluwigi.scale = new Vector(0.3,0.3);
        this.add(this.waluwigi);
        this.waluwigi.genericDialogue = new Dialogue("Wallace Anderson", ["WHAAAAAAAAAAA!", "YOU FOUND ME??!", "NOOOOOOOOO!!!!"],"", this.waluwigi);
        this.waluwigi.genericDialogue.playSound = Resources.voice_3;
        GameStateController.playSound(Resources.sndUnlockPiano,9);

    }
    onInitialize(_engine) {
        super.onInitialize(_engine);



    }

    setCollisions() {
       // GameStateController.getEngine().showDebug(true);
        GameStateController.parseXMLToCollider("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<mxfile host=\"app.diagrams.net\" modified=\"2023-06-23T09:07:50.478Z\" agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51\" version=\"21.5.0\" etag=\"EKjFgECsw29NwOSynrkV\" type=\"device\">\n" +
            "  <diagram name=\"Page-1\" id=\"kskFcylJZtOD5sif23d7\">\n" +
            "    <mxGraphModel dx=\"3471\" dy=\"1962\" grid=\"0\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"1654\" pageHeight=\"1169\" math=\"0\" shadow=\"0\">\n" +
            "      <root>\n" +
            "        <mxCell id=\"0\" />\n" +
            "        <mxCell id=\"1\" parent=\"0\" />\n" +
            "        <mxCell id=\"2\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"838.3237092514199\" y=\"315.0199052132702\" width=\"19.899417489778937\" height=\"134.12701421800946\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"3\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1855.1839429791235\" y=\"315.0199052132702\" width=\"19.899417489778937\" height=\"464.43981042654036\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"4\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"119\" y=\"285.02\" width=\"1761\" height=\"30\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"5\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"113.98491262346684\" y=\"295.00094786729863\" width=\"19.899417489778937\" height=\"688.6521327014218\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"6\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"103\" y=\"978\" width=\"731\" height=\"14\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"7\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"818.424291761641\" y=\"871.5469194312795\" width=\"19.899417489778937\" height=\"108.10236966824644\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"8\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"818.424291761641\" y=\"441.13933649289106\" width=\"19.899417489778937\" height=\"316.2995260663507\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"9\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"818.424291761641\" y=\"979.649289099526\" width=\"19.899417489778937\" height=\"364.34502369668246\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"10\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1609\" y=\"1117\" width=\"260\" height=\"28\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"11\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1856\" y=\"1331\" width=\"713\" height=\"22\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"12\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"820\" y=\"1327\" width=\"452\" height=\"27\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"13\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1865\" y=\"638\" width=\"722\" height=\"28\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"14\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"2561.6132638662757\" y=\"659.345971563981\" width=\"19.899417489778937\" height=\"690.654028436019\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"15\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1865\" y=\"886\" width=\"18\" height=\"461\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"16\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1212.4327580592642\" y=\"557.2492890995261\" width=\"260.682369116104\" height=\"60.05687203791469\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"17\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1118.905495857303\" y=\"556.2483412322275\" width=\"93.52726220196098\" height=\"60.05687203791469\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"18\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1025.378233655342\" y=\"541.2341232227488\" width=\"93.52726220196098\" height=\"60.05687203791469\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"19\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"969.659864683961\" y=\"517.211374407583\" width=\"67.91671189261551\" height=\"60.05687203791469\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"20\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1473.1151271753681\" y=\"557.2492890995261\" width=\"93.52726220196098\" height=\"60.05687203791469\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"21\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1566.642389377329\" y=\"541.2341232227488\" width=\"93.52726220196098\" height=\"60.05687203791469\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"22\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1650.2199428344004\" y=\"511.2056872037915\" width=\"67.91671189261551\" height=\"60.05687203791469\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"23\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"155.7736893520026\" y=\"329.0331753554503\" width=\"109.44679619378412\" height=\"182.17251184834123\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"24\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"143.83403885813524\" y=\"651.3383886255924\" width=\"228.84330113245775\" height=\"58.054976303317545\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"25\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"412.47617497015085\" y=\"415.11469194312804\" width=\"165.16516516516512\" height=\"72.06824644549762\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"26\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"417.4510293425956\" y=\"651.3383886255924\" width=\"155.21545642027567\" height=\"66.06255924170617\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"27\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"659.2289518434095\" y=\"647.3345971563981\" width=\"155.21545642027567\" height=\"66.06255924170617\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"28\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"659.2289518434095\" y=\"415.11469194312804\" width=\"155.21545642027567\" height=\"66.06255924170617\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"29\" value=\"\" style=\"ellipse;whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"173.68316509280362\" y=\"745.4274881516588\" width=\"44.24451224986699\" height=\"44.24451224986699\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"30\" value=\"\" style=\"ellipse;whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"2129.1764868482937\" y=\"1046.1575355450236\" width=\"194.67585389941476\" height=\"194.67585389941476\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"31\" value=\"\" style=\"ellipse;whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"2129.1764868482937\" y=\"880.0001895734597\" width=\"194.67585389941476\" height=\"194.67585389941476\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"32\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"2120.02\" y=\"1006\" width=\"212.98\" height=\"120.11\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"33\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1609\" y=\"1282\" width=\"49.75\" height=\"45\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"34\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1430\" y=\"1326\" width=\"430\" height=\"27\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "        <mxCell id=\"35\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;rotation=0;\" vertex=\"1\" parent=\"1\">\n" +
            "          <mxGeometry x=\"1609\" y=\"1139.32\" width=\"49.75\" height=\"60.68\" as=\"geometry\" />\n" +
            "        </mxCell>\n" +
            "      </root>\n" +
            "    </mxGraphModel>\n" +
            "  </diagram>\n" +
            "</mxfile>\n")
    }
    goToExterior()
    {
        GameStateController.getEngine().goToScene("testScene");
    }

    policeMessageInteriorA()
    {
      //  GameStateController.showTextBoxMessage("You", "I'm inside the Office.");
    }
    deadBodyExamine()
    {
        GameStateController.showTextBoxMessage("You", "So this was William Pierrie.\n A famous man.. What a shame.\n I know this is my job, but it's always upsetting\n to see a good man passing.");
    }
    goToPianoPuzzle()
    {
        GameStateController.getEngine().goToScene("PianoTestScene");
    }
}