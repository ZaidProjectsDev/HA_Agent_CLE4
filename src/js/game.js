import '../css/style.css'
import {
    Actor,
    Color,
    DisplayMode,
    Engine,
    Vector,
    Scene,
    Resolution,
    CollisionGroupManager,
    CollisionGroup, SpriteSheet, range,Animation
} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {ScoreTracker} from "./ScoreTracker.js";
import { Physics } from 'excalibur'
import {TestScene} from "./Scenes/Testing/TestScene.js";
import {GameStateController} from "./GameState/GameStateController.js";

export class Game extends Engine {

    gameStateController
    playerCollisionCollideWith
    weaponCollisionCollideWith
    solidCollision
    weaponCollision
    mainPlayerStatsHud

    fireEffectSpriteSheet;
    fireEffectAnimation;
    scoreTracker;
    constructor() {
        super({ width: 1280, height: 720 ,maxFps:30, displayMode: DisplayMode.FitScreen, antialiasing:true, resolution:Resolution.Standard})
        this.scoreTracker = new ScoreTracker();
        Physics.acc = new Vector(0,300);

        this.addScene("testScene", new TestScene());

        this.start(ResourceLoader).then(() => this.goToScene('testScene',{engine:this}));
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.gameStateController = new GameStateController(this);
        this.solidCollision = CollisionGroupManager.create("solid");
        this.weaponCollision = CollisionGroupManager.create("weapons")
        this.playerCollisionCollideWith = CollisionGroup.collidesWith([
            this.solidCollision,this.weaponCollision
        ])



        this.fireEffectSpriteSheet = SpriteSheet.fromImageSource({
            image:Resources._fireEffect,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 192,
                spriteHeight: 128
            }

        } )

        this.add(this.fireEffectSpriteSheet);
        this.fireEffectAnimation = Animation.fromSpriteSheet( this.fireEffectSpriteSheet,range(0,2),100);
    }
    triggerGameOver()
    {
        this.goToScene('scGameOver',{engine:this});
    }


}

new Game()
