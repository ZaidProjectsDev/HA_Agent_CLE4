import {ExtendedScene} from "../Scenes/ExtendedScene.js";
import {Button} from "../Generics/Button.js";
import {Vector} from "excalibur";
import {GameStateController} from "../GameState/GameStateController.js";
export class MainMenu extends ExtendedScene
{ 
    constructor() {
        super();
    }

    onActivate(_context) {
        super.onActivate(_context);

        let button = new Button('This is a button', new Vector(_context.engine.halfCanvasWidth,_context.engine.halfCanvasHeight))

        this.add(button)

        button.on('pointerup', function (ev){
            
            _context.engine.goToScene('testScene');
        });

    }

}