import {ExtendedScene} from "../Scenes/ExtendedScene.js";
import {Button} from "../Generics/Button.js";
import {Vector, Color, Actor} from "excalibur";
import {GameStateController} from "../GameState/GameStateController.js";
export class MainMenu extends ExtendedScene
{ 
    constructor() {
        super();
    }

    onActivate(_context) {
        super.onActivate(_context);

        _context.engine.backgroundColor = Color.fromHex('#39545D');



        let startbutton = new Button('Start Game', new Vector(700,850),300, 300)

        let soundbutton = new Button('Start Game', new Vector(1300,850),800, 300)

        this.add(startbutton)

        this.add(soundbutton)

        startbutton
        soundbutton

        startbutton.on('pointerup', function (ev){

            _context.engine.goToScene('testScene');
        });

        soundbutton.on('pointerup', function (ev) {

            _context.engine.goToScene('testScene');
        });
    }

}