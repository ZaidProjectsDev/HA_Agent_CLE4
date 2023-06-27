import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class SummaryControls extends Actor {

    constructor() {
        super({
            width: Resources.ControlSummary.width,
            height: Resources.ControlSummary.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(1700, 290);
        this.scale = new Vector(0.2, 0.2)

        this.graphics.add(Resources.ControlSummary.toSprite());
    }
}