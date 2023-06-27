import * as ex from 'excalibur';
import {ExtendedScene} from "../ExtendedScene.js";
import {Puzzle} from "../../Puzzle.js";
import {GameStateController} from "../../GameState/GameStateController.js";
import {Resources} from "../../resources.js";
import {Color, Font, FontUnit, Label, TextAlign, Vector} from "excalibur";

export class PianoTestScene extends ExtendedScene {
    puzzle
    constructor() {
        super();
    }
    onDeactivate(_context) {
        super.onDeactivate(_context);
        this.puzzle.kill();
        this.puzzle = null;
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        console.log(this.backgroundImage.position);
    }

    onActivate(_engine) {
       //this.spawnPlayer(new ex.Vector(0,0));
        //

        this.puzzle = new Puzzle();
        this.add(this.puzzle);
        this.setBackground(Resources.pianoImg.toSprite(), new ex.Vector(1.25, 1.25), new Vector(16,200));
        const instructions = new Label({width:1280,height:128,font: new Font({
                family: "helvetica",
                size: 5,
                unit: FontUnit.Em,
                textAlign:TextAlign.Left
            }), color:Color.White})
        instructions.text = "Press the correct ABCD keys\non the keyboard or\nuse the correct ABCD (1,2,3,4)\nbuttons on the joystick\nto solve the puzzle.";
        this.add(instructions);
        instructions.pos = new Vector(1000,256);
        instructions.anchor = new Vector(0,0);
        const pianoHelp = new ex.Actor({width:100, height:100});
        pianoHelp.graphics.use(Resources.pianoHelpImg.toSprite());
        pianoHelp.pos = new Vector(1200,500);
        pianoHelp.anchor = new Vector(0,0);
        pianoHelp.scale = new Vector(0.5,0.5);
        this.add(pianoHelp);
        this.engine.backgroundColor =Color.fromHex("39545D");
     //   this.backgroundImage.vel = new Vector(100,0);


    }
}