//This is sthe game state controller that keeps track of all of the game state variables in the session
//TODO : Spawn and track playercharacter actor in game world

import {Player} from "../Player/Player.js";
import {BigTextBox} from "../Textbox/BigTextBox.js";
import {Textbox} from "../Textbox/Textbox.js";
import {Actor, Sound, Vector} from "excalibur";
import {Resources} from "../resources.js";

const GameState =
    {
        MainMenu: "MainMenu",
        Interacting: "Interacting",
        Cutscene: "Cutscene",
        Paused: "Paused",
        Gameplay: "Gameplay"
    }
    const SoundProperty={
        gameVolume:"GameVolume",
        musicVolume: "MusicVolume",
        soundVolume: "SoundVolume"
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
        soundVolume
        musicVolume
        gameVolume
        currentPlayingBGM
        interactionIcon
        constructor(engine) {
            if(GameStateController.instance == null)
            {
                GameStateController.instance = this;
            }
            GameStateController.instance.engine = engine;
            GameStateController.instance.currentGameState = GameState.MainMenu
            GameStateController.setVolumeProperty(SoundProperty.gameVolume,1);
            GameStateController.setVolumeProperty(SoundProperty.soundVolume,0.7);
            GameStateController.setVolumeProperty(SoundProperty.musicVolume,0.45);
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
        static  getPlayer()
        {
            if(GameStateController.instance.player!=null)
            {
                return GameStateController.instance.player;
            }
            return  null;
        }
        static  getPlayerPosition(offset)
        {
            if(GameStateController.instance.player!=null)
            {
                return new Vector(GameStateController.instance.player.pos.x+offset.x,GameStateController.instance.player.pos.y+offset.y)
            }
            return  new Vector(0,0);
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
        static setInteractionIconState(showing, position)
        {
            if(GameStateController.instance.interactionIcon!= null)
            {
                if(showing) {
                    GameStateController.instance.interactionIcon.kill();
                    GameStateController.instance.interactionIcon = new Actor({width: 256, height: 256})
                    GameStateController.instance.interactionIcon.graphics.use(Resources.sptInteract.toSprite());
                    GameStateController.instance.interactionIcon.pos = position;
                    GameStateController.getEngine().add( GameStateController.instance.interactionIcon);
                }
                else
                {
                    GameStateController.instance.interactionIcon.kill();
                }
            }
            else
            {
                if(showing) {
                    GameStateController.instance.interactionIcon = new Actor({width: 256, height: 256})
                    GameStateController.instance.interactionIcon.graphics.use(Resources.sptInteract.toSprite());
                    GameStateController.instance.interactionIcon.pos = position;
                    GameStateController.getEngine().add( GameStateController.instance.interactionIcon);
                }
            }
        }

        //Sound and Music static Functions
        /**
         *
         * Sets the volume level for the specified sound property
         * @param soundProperty
         * @param volume
         */
        static setVolumeProperty(soundProperty,volume)
        {
            switch (soundProperty)
            {
                case SoundProperty.soundVolume: GameStateController.instance.soundVolume = volume;
                    break;
                case SoundProperty.musicVolume: GameStateController.instance.musicVolume = volume;
                    break;
                case SoundProperty.gameVolume: GameStateController.instance.gameVolume = volume;
                    break;
            }
        }
        /**
         *
         * Plays Sound at a specified volume.
         * @param sound
         * @param volume
         */
       static playSound(sound, volume)
        {
            sound.play(volume*GameStateController.instance.soundVolume*GameStateController.instance.gameVolume)
        }
        /**
         *
         * Plays Music at a specified volume and loops it if required.
         * @param bgm
         * @param volume
         * @param loop
         */
       static playBGM(bgm, volume, loop)
        {
            if(bgm == GameStateController.instance.currentPlayingBGM)
            {
                if(GameStateController.instance.currentPlayingBGM.isPlaying())
                {
                    return;
                }
            }
            else
            {
                GameStateController.instance.currentPlayingBGM = bgm;
                GameStateController.instance.currentPlayingBGM.play(volume * GameStateController.instance.musicVolume * GameStateController.instance.gameVolume)
                GameStateController.instance.currentPlayingBGM.loop = loop;
            }
        }

    }