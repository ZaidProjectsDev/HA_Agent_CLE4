import * as ex from 'excalibur';
import {ExtendedScene} from "../ExtendedScene.js";
import {Puzzle} from "../../Puzzle.js";
import {GameStateController} from "../../GameState/GameStateController.js";
import {Resources} from "../../resources.js";

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

    onActivate(_engine) {
       //this.spawnPlayer(new ex.Vector(0,0));
        //
        this.puzzle = new Puzzle();
        this.add(this.puzzle);
       this.setBackground(Resources.pianoImg.toSprite(), new ex.Vector(1, 1))
    }
}