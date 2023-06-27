import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Logo extends Actor {

    constructor() {
        super({
            width: Resources.logo_image.width,
            height: Resources.logo_image.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(950, 350);
        this.scale = new Vector(1.3, 1.3)

        this.graphics.add(Resources.logo_image.toSprite());
    }
}