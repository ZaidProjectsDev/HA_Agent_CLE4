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
        /**
         *Returns the Engine Instance (Pretty Usefull)
         */
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
            GameStateController.instance.engine = engine;
            GameStateController.instance.currentGameState = GameState.MainMenu
        }

        setGameState(newGameState)
        {
            this.currentGameState = newGameState;
        }
        /**
         *
         * Spawns player character in the map
         * @param speaker
         * @param content
         */
       static spawnPlayer(spawnLocation)
        {
            if(GameStateController.instance.player!= null)
            {
                GameStateController.instance.player.kill();
            }
            GameStateController.instance.player = new Player(200);
            GameStateController.instance.player.pos = spawnLocation;
            GameStateController.instance.engine.currentScene.add(  GameStateController.instance.player);
        }
        /**
         *Checks if the player can move.
         */
      static  playerCanMove()
        {
            if(GameStateController.instance.showingMessage)
            {
                return false;
            }
            return  true;
        }

        /**
         *
         * Shows a full screen message. (This disables player movement, btw)
         * @param header
         * @param content
         */
     static showPopUpMessage(header,content)
        {
            if(   GameStateController.instance.popUpBox!= null)
            {
                GameStateController.instance.popUpBox.kill();
            }
            GameStateController.instance.popUpBox = new BigTextBox(   GameStateController.instance.engine);
            GameStateController.getEngine().add(   GameStateController.instance.popUpBox);
            GameStateController.instance.popUpBox.typeOutText(header, content);
        }
        /**
         *
         * Shows a text message. (This disables player movement, btw)
         * @param speaker
         * @param content
         */
      static showTextBoxMessage(speaker, content)
        {
            if(    GameStateController.instance.textBox != null)
            {
                GameStateController.instance.textBox.kill();
            }
            GameStateController.instance.textBox = new Textbox(GameStateController.instance.engine);
            GameStateController.getEngine().add(GameStateController.instance.textBox);
            GameStateController.instance.textBox.typeOutText(speaker,content);
        }
    }