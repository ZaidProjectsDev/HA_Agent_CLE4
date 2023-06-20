import * as ex from 'excalibur';
import {ExtendedScene} from "../ExtendedScene.js";
import {Puzzle} from "../../Puzzle.js";
import {GameStateController} from "../../GameState/GameStateController.js";
import {Resources} from "../../resources.js";

export class PianoTestScene extends ExtendedScene {
    constructor() {``
        super();
    }

    onInitialize(_engine) {
       //this.spawnPlayer(new ex.Vector(0,0));
       GameStateController.getEngine().currentScene.add(new Puzzle());
       this.setBackground(Resources.pianoImg.toSprite(), new ex.Vector(1, 1))
    }
}