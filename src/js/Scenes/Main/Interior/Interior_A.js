import {ExtendedScene} from "../../ExtendedScene.js";
import {Actor, Vector, Scene, Color, Trigger, CollisionType} from "excalibur";
import {GameStateController} from "../../../GameState/GameStateController.js";
import {Resources} from "../../../resources.js";
import {Interactable} from "../../../Generics/Interactable.js";
export class Interior_A extends ExtendedScene
{
    onActivate(_context) {
        super.onActivate(_context);
        _context.engine.backgroundColor = Color.Black;
        this.setBackground(Resources.bkgInteriorA.toSprite(),new Vector(2,2));
        this.spawnPlayer( new Vector(1354,1240));
        this.setCameraToPlayer();
        this.setCameraBariers(150,1445,0,2640)
        this.setCollisions();

        const policeTrigger3 = new Trigger({
            width: 90,
            height: 90,
            repeat: 1,
            pos: new Vector(668, 775),
            target: GameStateController.instance.player,
            action: this.deadBodyExamine,
            color: Color.Red
        })
        const exteriorDoor = new Trigger({
            width: 90,
            height: 90,
            repeat: true,
            pos: new Vector(1354, 1353),
            target: GameStateController.instance.player,
            action: this.goToExterior,
            color: Color.Red
        })
        const pianoTrigger = new Interactable(96,96, this.goToPianoPuzzle);
        pianoTrigger.pos = new Vector(1730,1031);
        GameStateController.getEngine().add(pianoTrigger);
        //GameStateController.instance.showPopUpMessage("Test", "BogosBinted");

        GameStateController.getEngine().add(policeTrigger3);
        GameStateController.getEngine().add(exteriorDoor);
        GameStateController.playBGM(Resources.bgmInteriorA,0.5,true);
        GameStateController.checkForRequiredStuff();
    }
    setCollisions() {
       // GameStateController.getEngine().showDebug(true);
        let col1 = new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:16, height:1500, pos: new Vector(823,1610)})
        this.engine.add(col1);
        let col2 = new Actor({collisionType:CollisionType.Fixed, color:Color.Black, width:16, height:1500, pos: new Vector(823,-10)})
        this.engine.add(col2);
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