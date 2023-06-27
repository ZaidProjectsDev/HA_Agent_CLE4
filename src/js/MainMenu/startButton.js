import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class StartGame extends Actor {

    constructor() {
        super({
            width: Resources.StartButton.width,
            height: Resources.StartButton.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(750, 790);
        // this.scale = new Vector(1.3, 1.3)

        this.graphics.add(Resources.StartButton.toSprite());

        this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;

        this.on("pointerup", (event) =>  _engine.goToScene('testScene'))
    }
}