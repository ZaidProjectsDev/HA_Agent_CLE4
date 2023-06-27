import { Actor, Vector } from "excalibur";
import { Resources } from "../resources.js";
import qrFeedback from "../../images/QRFeedback2.png";

export class QrCode extends Actor {

    constructor() {
        super({
            width: Resources.qrFeedback.width,
            height: Resources.qrFeedback.height
        });
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.pos = new Vector(400, 350);
        this.scale = new Vector(0.17, 0.17)

        this.graphics.add(Resources.qrFeedback.toSprite());
    }
}