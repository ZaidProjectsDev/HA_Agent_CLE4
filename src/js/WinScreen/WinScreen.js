import {ExtendedScene} from "../Scenes/ExtendedScene.js";
import {Button} from "../Generics/Button.js";
import {Vector, Color, Actor} from "excalibur";
import { Logo } from "./logoImage.js";
import {GameStateController} from "../GameState/GameStateController.js";
import {StartGame} from "./startButton.js";
import {ChangeSound} from "./soundButton.js";
import {StartControl} from "./arcadecontrolstart.js";
import {SoundControl} from "./arcadecontrolsound.js";
import {SummaryControls} from "./controlsummary.js";
export class MainMenu extends ExtendedScene
{ 
    constructor() {
        super();
    }

    onActivate(_context) {
        super.onActivate(_context);

        const logo = new Logo();
        this.add(logo);

        _context.engine.backgroundColor = Color.fromHex('#39545D');

        const buttonStart = new StartGame();
        this.add(buttonStart);

        const controlStart = new StartControl();
        this.add(controlStart);

    }

}