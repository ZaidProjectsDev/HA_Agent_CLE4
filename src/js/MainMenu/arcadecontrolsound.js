import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class SoundControl extends Actor {

    constructor() {
        super({
            width: Resources.ArcadeSound.width,
            height: Resources.ArcadeSound.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(1200, 950);
        this.scale = new Vector(0.15, 0.15)

        this.graphics.add(Resources.ArcadeSound.toSprite());
    }
}