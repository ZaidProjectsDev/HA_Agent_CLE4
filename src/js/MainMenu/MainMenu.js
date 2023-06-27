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
import {Input} from "excalibur";
import {SoundProperty} from "../GameState/SoundProperty.js";

export class MainMenu extends ExtendedScene
{
    buttonPressed
    soundOn
    constructor() {
        super();

        this.buttonPressed = false
        this.soundOn = false;

    }

    onActivate(_context) {
        super.onActivate(_context);
        GameStateController.resetGame();
        const logo = new Logo();
        this.add(logo);

        _context.engine.backgroundColor = Color.fromHex('#39545D');

        const buttonStart = new StartGame();
        this.add(buttonStart);

        const buttonSound = new ChangeSound();
        this.add(buttonSound);

        const controlStart = new StartControl();
        this.add(controlStart);

        const controlSound = new SoundControl();
        this.add(controlSound);

        const controlSummary = new SummaryControls();
        this.add(controlSummary);


        // let startbutton = new Button('Start Game', new Vector(700,850),300, 300)
        //
        // let soundbutton = new Button('Start Game', new Vector(1300,850),800, 300)
        //
        // this.add(startbutton)
        //
        // this.add(soundbutton)
        //
        // startbutton
        // soundbutton
        //
        // startbutton.on('pointerup', function (ev){
        //
        //     _context.engine.goToScene('testScene');
        // });
        //
        // soundbutton.on('pointerup', function (ev) {
        //
        //     _context.engine.goToScene('testScene');
        // });
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face1))
        {
            _engine.goToScene('testScene');
        }
        if(this.engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face3))
        {
            if(!this.buttonPressed) {
            this.soundOn = !this.soundOn;
            if(this.soundOn) {
                GameStateController.setVolumeProperty(SoundProperty.gameVolume, 1)
            }
            else {
                GameStateController.setVolumeProperty(SoundProperty.gameVolume, 0)
            }
                this.buttonPressed = true;
            }
        }
        else
        {
            this.buttonPressed =false;
        }
    }


}