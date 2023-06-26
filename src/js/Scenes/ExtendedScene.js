import {BoundingBox, Scene} from "excalibur";
import {Actor, Vector} from "excalibur";
import {GameStateController} from "../GameState/GameStateController.js";
import {Resources} from "../resources.js";
export class ExtendedScene extends  Scene
{
    backgroundImage

    constructor() {
        super();
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
    }

    spawnPlayer(pos)
    {
        GameStateController.spawnPlayer(pos);
    }
    setCameraToPlayer()
    {
        GameStateController.getEngine().currentScene.camera.clearAllStrategies();
        GameStateController.getEngine().currentScene.camera.strategy.elasticToActor(GameStateController.instance.player,0.1,0.1);
    }
    setCameraBariers(top,bottom,left,right)
    {
      GameStateController.getEngine().currentScene.camera.strategy.limitCameraBounds(new BoundingBox({top:top,bottom:bottom,left:left, right:right}));
    }
    setBackground(backgroundAsset, scale)
    {

        this.backgroundImage = new Actor({width:backgroundAsset.width, height:backgroundAsset.height, anchor: new Vector(0,0)});
       // this.backgroundImage.pos = new Vector(backgroundAsset.width/scale.x, backgroundAsset.height/scale.y);
        this.backgroundImage.graphics.use(backgroundAsset);
        this.backgroundImage.scale = scale;
        this.add(this.backgroundImage);
    }

    setCollisions()
    {

    }
}