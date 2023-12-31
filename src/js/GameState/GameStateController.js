//This is sthe game state controller that keeps track of all of the game state variables in the session
//TODO : Spawn and track playercharacter actor in game world

import {Player} from "../Player/Player.js";
import {BigTextBox} from "../Textbox/BigTextBox.js";
import {Textbox} from "../Textbox/Textbox.js";
import {Actor, CollisionType, Color, Sound, Vector} from "excalibur";
import {Resources} from "../resources.js";
import {SoundProperty} from "./SoundProperty.js";
import {Dialogue} from "./Dialogue.js";
import {NPC} from "../Player/NPC.js";

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
        soundVolume
        musicVolume
        gameVolume
        currentPlayingBGM
        interactionIcon
        pianoCompleted
        pianoWasIncorrect
        xmlParser
        lastSpawnPosition
        lastUsedDialog
        wasShowingDialog
        alreadyShowedTutorialMessage
        cameFromInside
        joannaMission
        alettaMission
        alreadyExploredInside
        soundToPlay
        constructor(engine) {
            if(GameStateController.instance == null)
            {
                GameStateController.instance = this;
            }
            GameStateController.instance.engine = engine;
            GameStateController.instance.currentGameState = GameState.MainMenu
            GameStateController.setVolumeProperty(SoundProperty.gameVolume,0.5);
            GameStateController.setVolumeProperty(SoundProperty.soundVolume,0.7);
            GameStateController.setVolumeProperty(SoundProperty.musicVolume,0.15);
            GameStateController.instance.pianoWasIncorrect = false
            GameStateController.instance.pianoCompleted = true;
            GameStateController.instance.cameFromInside = false;
            GameStateController.instance.alreadyShowedTutorialMessage = false;
            GameStateController.instance.joannaMission = false;
            GameStateController.instance.alettaMission = false;
            GameStateController.instance.alreadyExploredInside = false;
            GameStateController.instance.soundToPlay = null;
        }
        static resetGame()
        {
            GameStateController.setVolumeProperty(SoundProperty.gameVolume,0.5);
            GameStateController.setVolumeProperty(SoundProperty.soundVolume,0.7);
            GameStateController.setVolumeProperty(SoundProperty.musicVolume,0.15);

            GameStateController.instance.pianoWasIncorrect = false
            GameStateController.instance.pianoCompleted = false;
            GameStateController.instance.cameFromInside = false;
            GameStateController.instance.alreadyShowedTutorialMessage = false;
            GameStateController.instance.joannaMission = false;
            GameStateController.instance.alettaMission = false;
            GameStateController.instance.alreadyExploredInside = false;
            GameStateController.instance.soundToPlay = null;
        }
        setGameState(newGameState)
        {
            this.currentGameState = newGameState;
        }
        static runFunctionOfDeceasedDialog() {
            if (GameStateController.instance.lastUsedDialog != null) {
                GameStateController.instance.lastUsedDialog.runEndFunction();
            }
        }
        static checkForDialog()
        {
            GameStateController.runFunctionOfDeceasedDialog();
          //  GameStateController.instance.lastUsedDialog = null;
        }

        ///ChagtGPT Experiment
        static wrapText(text, maxLength) {
            if (text.length > maxLength) {
                let wrappedText = '';
                let remainingText = text;

                while (remainingText.length > maxLength) {
                    let chunk = remainingText.substring(0, maxLength);
                    let lastSpaceIndex = chunk.lastIndexOf(' ');

                    // If there is no space within the chunk, find the next space after the chunk
                    if (lastSpaceIndex === -1) {
                        lastSpaceIndex = remainingText.indexOf(' ', maxLength);
                    }

                    // If a space is found, break the chunk at that space
                    if (lastSpaceIndex !== -1) {
                        chunk = remainingText.substring(0, lastSpaceIndex);
                        remainingText = remainingText.substring(lastSpaceIndex + 1);
                    } else {
                        // If no space is found, break the chunk at the maxLength
                        remainingText = remainingText.substring(maxLength);
                    }

                    // Remove spaces on new lines
                    chunk = chunk.trim().replace(/\n\s*/g, '\n');

                    wrappedText += chunk + '\n';
                }

                // Remove spaces on new lines from the remaining text
                remainingText = remainingText.trim().replace(/\n\s*/g, '\n');

                wrappedText += remainingText;
                return wrappedText;
            }

            return text;
        }

        ///
        static checkForRequiredStuff()
        {

            if(GameStateController.instance.pianoCompleted)
            {
                this.npcCheck = new NPC({width:32,height:32, pos: new Vector(9999,9999)});
                this.getEngine().add(this.npcCheck)
                this.npcCheck.setInteractionBox(1,1);
                this.npcCheck.genericDialogue = new Dialogue("You", ["Hey...a key.", "Looks like I can open that door now."], "", this.npcCheck);
                this.npcCheck.functionToExecute = `GameStateController.instance.engine.currentScene.getRidOfBlackBox()`;
                this.npcCheck.interactionBox.interact();
              //  GameStateController.showTextBoxMessage("You", "Whoa! Something interesting happened.");
            }
            if(  GameStateController.instance.pianoWasIncorrect)
            {
             //   GameStateController.showTextBoxMessage("You", "Whoa! Something bad happened.");
                this.npcCheck = new NPC({width:32,height:32, pos: new Vector(9999,9999)});
                this.getEngine().add(this.npcCheck)
                this.npcCheck.setInteractionBox(1,1);
                this.npcCheck.genericDialogue = new Dialogue("You", ["I don't think that was it.","Maybe I should go ask around."], "", this.npcCheck);
                this.npcCheck.interactionBox.interact();
                GameStateController.instance.pianoWasIncorrect = false;
            }

             
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
            GameStateController.instance.player = new Player(150);
            GameStateController.instance.player.pos = spawnLocation;
            GameStateController.instance.engine.currentScene.add(  GameStateController.instance.player);
            GameStateController.instance.player.vel = new Vector(0,0);
        }
        /**
         *Checks if the player can move.
         */
      static  logAllActors(engine) {
            const actors = engine.currentScene.actors;

            console.log("All Actors:");
            console.log("COUNT : " + actors.length);
            for (const actor of actors) {
                console.log(actor);
            }
            console.log("COUNT : " + actors.length);
        }
       static killAllActors(scene) {
            let actors = scene.actors;

            for (let actor of actors) {
                actor.kill();
                actor = null;
            }
        }
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
        static showDialogueLastInteractor()
        {

        }
        static showDialogueMessage(Dialogue)
        {
            if(GameStateController.instance.textBox != null)
            {
                GameStateController.instance.textBox.kill();
            }
            GameStateController.instance.textBox = new Textbox(GameStateController.instance.engine);
            GameStateController.getEngine().add(GameStateController.instance.textBox);
            GameStateController.instance.textBox.showDialogue(Dialogue)
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
                case SoundProperty.soundVolume:
                    GameStateController.instance.soundVolume = volume;
                    break;
                case SoundProperty.musicVolume:
                    GameStateController.instance.musicVolume = volume;
                    break;
                case SoundProperty.gameVolume:
                    GameStateController.instance.gameVolume = volume;
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
           GameStateController.stopSound();
            if(GameStateController.instance.gameVolume==0)
            {
                return;
            }  if(GameStateController.instance.soundToPlay!=null) {
            GameStateController.instance.soundToPlay.volume = 0;
            GameStateController.instance.soundToPlay.loop = false;
            GameStateController.instance.soundToPlay.once = true;
        }
            GameStateController.instance.soundToPlay = sound;
            GameStateController.instance.soundToPlay.play(volume*GameStateController.instance.soundVolume*GameStateController.instance.gameVolume)

        }
        static stopSound()
        {
            if(GameStateController.instance.soundToPlay!=null) {
                GameStateController.instance.soundToPlay.stop()
                GameStateController.instance.soundToPlay = null;
            }

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
            if(GameStateController.instance.gameVolume==0)
            {
                return;
            }
            if(bgm == GameStateController.instance.currentPlayingBGM)
            {
                if(GameStateController.instance.currentPlayingBGM.isPlaying())
                {
                    return;
                }
            }
            else
            {
                if(GameStateController.instance.currentPlayingBGM!=null)
                {
                    GameStateController.instance.currentPlayingBGM.stop();
                    GameStateController.instance.currentPlayingBGM = null;
                }
                GameStateController.instance.currentPlayingBGM = bgm;
                GameStateController.instance.currentPlayingBGM.play(volume * GameStateController.instance.musicVolume * GameStateController.instance.gameVolume)
                GameStateController.instance.currentPlayingBGM.loop = loop;
            }
        }

        static parseXMLToCollider(filePath)
        {
         //   GameStateController.getEngine().showDebug(true);
            const xmlData = filePath/// fs.readFileSync(filePath, 'utf-8');
            // Create a parser object
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
            // Get all mxGeometry elements
            const mxGeometryElements = xmlDoc.getElementsByTagName('mxGeometry');
            // Convert mxGeometry elements to Box Colliders
            for (let i = 0; i < mxGeometryElements.length; i++) {
                const mxGeometryElement = mxGeometryElements[i];
                const x = parseInt(mxGeometryElement.getAttribute('x'));
                const y = parseInt(mxGeometryElement.getAttribute('y'));
                const width = parseInt(mxGeometryElement.getAttribute('width'));
                const height = parseInt(mxGeometryElement.getAttribute('height'));
                const style = mxGeometryElement.parentElement.getAttribute('style');

                let shorterSide = Math.min(width, height);
                let radius = 0.5 * shorterSide;
                // Create Box Collider using mxGeometry attributes
                if(style.toString().includes("ellipse"))
                {
                    const boxCollider = new Actor({
                        collisionType: CollisionType.Fixed,
                        radius : radius,

                        pos : new Vector(x+radius,y+radius),
                        // Set other properties like position, color, collision type, etc.
                    });
                    GameStateController.getEngine().currentScene.add(boxCollider);
                }
                else
                {

                    if(style.toString().includes("rotation=90;"))
                    {
                        const boxCollider = new Actor({
                            width: width,
                            height: height,
                            collisionType: CollisionType.Fixed,

                            pos : new Vector(x,y),
                            anchor: new Vector(0,0),
                            // Set other properties like position, color, collision type, etc.
                        });
                        GameStateController.getEngine().currentScene.add(boxCollider);


                    }
                    else {
                        const boxCollider = new Actor({
                            width: width,
                            height: height,
                            collisionType: CollisionType.Fixed,

                            pos : new Vector(x,y),
                            anchor: new Vector(0,0),
                            // Set other properties like position, color, collision type, etc.
                        });
                        GameStateController.getEngine().currentScene.add(boxCollider);
                    }
                }

            }
        }

    }