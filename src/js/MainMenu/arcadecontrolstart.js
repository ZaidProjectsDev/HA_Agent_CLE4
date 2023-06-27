import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class StartControl extends Actor {

    constructor() {
        super({
            width: Resources.ArcadeStart.width,
            height: Resources.ArcadeStart.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(750, 950);
        this.scale = new Vector(0.15, 0.15)

        this.graphics.add(Resources.ArcadeStart.toSprite());
    }
}