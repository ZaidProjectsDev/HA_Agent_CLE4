//This is sthe game state controller that keeps track of all of the game state variables in the session
//TODO : Spawn and track playercharacter actor in game world

import {Player} from "../Player/Player.js";
import {BigTextBox} from "../Textbox/BigTextBox.js";
import {Textbox} from "../Textbox/Textbox.js";

const GameState =
    {
        MainMenu: "MainMenu",
        Interacting: "Interacting",
        Cutscene: "Cutscene",
        Paused: "Paused",
        Gameplay: "Gameplay"
    }
    export class GameStateController {
        static instance

        static getEngine()
        {
            return GameStateController.instance.engine;
        }
        currentGameState
        //ExcaliburEngine
        engine
        //PlayerCharacter
        player
        popUpBox;
        textBox;
        showingMessage;
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
        playerCanMove()
        {
            if(this.showingMessage)
            {
                return false;
            }
            return  true;
        }
        showPopUpMessage(header,content)
        {
            if(this.popUpBox!= null)
            {
                this.popUpBox.kill();
            }
            this.popUpBox = new BigTextBox(this.engine);
            GameStateController.getEngine().add(this.popUpBox);
            this.popUpBox.typeOutText(header, content);
        }
        showTextBoxMessage(speaker, content)
        {
            if(this.textBox != null)
            {
                this.textBox .kill();
            }
            this.textBox = new Textbox(this.engine);
            GameStateController.getEngine().add(this.textBox);
            this.textBox.typeOutText(speaker,content);
        }
    }