import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class creditsLogo extends Actor {

    constructor() {
        super({
            width: Resources.creditsLogo.width,
            height: Resources.creditsLogo.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(1450, 500);
        this.scale = new Vector(1.3, 1.3)

        this.graphics.add(Resources.creditsLogo.toSprite());
    }
}