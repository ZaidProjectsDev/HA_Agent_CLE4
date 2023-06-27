import {ExtendedScene} from "../Scenes/ExtendedScene.js";
import {Button} from "../Generics/Button.js";
import {Vector, Color, Actor, Input} from "excalibur";
import { Logo } from "./logoImage.js";
import {GameStateController} from "../GameState/GameStateController.js";
import {StartGame} from "./startButton.js";
import {ChangeSound} from "./soundButton.js";
import {StartControl} from "./arcadecontrolstart.js";
import {SoundControl} from "./arcadecontrolsound.js";
import {SummaryControls} from "./controlsummary.js";
import {ReturnButton} from "./ReturnButton.js";
import {creditsLogo} from "./creditsLogoImage.js";
import {QrCode} from "./QrCode.js";
export class WinMenu extends ExtendedScene
    
{ 
    constructor() {
        super();
    }

    onActivate(_context) {
        super.onActivate(_context);

        const logo = new creditsLogo();
        this.add(logo);

        const logo2 = new QrCode();
        this.add(logo2)

        _context.engine.backgroundColor = Color.fromHex('#39545D');

        //const buttonStart = new ReturnButton();
       // this.add(buttonStart);

      //  const controlStart = new StartControl();
      //  this.add(controlStart);

    }

}