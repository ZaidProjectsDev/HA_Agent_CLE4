//This is sthe game state controller that keeps track of all of the game state variables in the session
//TODO : Spawn and track playercharacter actor in game world

import {Player} from "../Player/Player.js";

const GameState =
    {
        MainMenu: "MainMenu",
        Interacting: "Interacting",
        Cutscene: "Cutscene",
        Paused: "Paused",
        Gameplay: "Gameplay"
    }
    export class GameStateController
    {
        static instance
        currentGameState
        //ExcaliburEngine
        engine
        //PlayerCharacter
        player
        constructor(engine) {
            if(GameStateController.instance == null)
            {
                GameStateController.instance = this;
            }
            this.engine = engine;
            this.currentGameState = GameState.MainMenu
        }
        setGameState(newGameState)
        {
            this.currentGameState = newGameState;
        }
        spawnPlayer(spawnLocation)
        {
            if(this.player!= null)
            {
                this.player.kill();
            }
            this.player = new Player(200);
            this.player.pos = spawnLocation;
            this.engine.currentScene.add(this.player);
        }
    }