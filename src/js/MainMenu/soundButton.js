import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class ChangeSound extends Actor {

    constructor() {
        super({
            width: Resources.SoundButton.width,
            height: Resources.SoundButton.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(1200, 790);
        // this.scale = new Vector(1.3, 1.3)

        this.graphics.add(Resources.SoundButton.toSprite());
    }
}