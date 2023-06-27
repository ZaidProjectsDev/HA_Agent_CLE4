import * as ex from 'excalibur';
import {GameStateController} from "./GameState/GameStateController.js";
import {Resources} from "./resources.js";
import {Input} from "excalibur";
import {Button} from "./Generics/Button.js";

export class Puzzle extends ex.Actor
{
    expectedSequence;
    playerInputKb;
    playerInputGp;
    isChecking;
    canContinue;
    keyPressed;
    keyHeld
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.expectedSequence = ['KeyD', 'KeyC', 'KeyA', 'KeyB'];
        this.playerInputKb = [];
        this.playerInputGp = [];
        this.isChecking = false;
        this.canContinue = false;
        this.keyPressed = true;
      //  this.getPlayerInput(GameStateController.getEngine());
        GameStateController.getEngine().clock.schedule(() => {
            this.canContinue = true;
            console.log('Hello in 300ms')
        }, 1000);

        // if (this.isChecking === false) {
        //     _engine.input.keyboard.on('press', (evt) => {
        //         if (evt.key === 'Enter') {
        //             this.isChecking = true;
        //             this.handleSequence();
        //         }
        //     });
        //
        //     _engine.input.gamepads.on('button', (evt) => {
        //         if (evt.button === ex.Input.Buttons.Start) {
        //             this.isChecking = true;
        //             this.handleSequence();
        //         }
        //     });
        // }
    }

    onPreUpdate(_engine, _delta) {
        if(this.canContinue == true) {
        this.getPlayerInput(_engine);

            if (this.playerInputKb.length > 3 || this.playerInputGp > 3) {
                this.handleSequence();
            }
        }
    }

    getPlayerInput (_engine) {

            //add check to make sure confirmation key is ignored
        const keyWasPressed = false;
        if(_engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face2))
        {
            if(!this.keyHeld) {
                console.log("A");
                this.playerInputKb.push('KeyA');
                GameStateController.playSound(Resources.pianoC, 1)
                this.keyHeld = true;

            }
        }
        else {
            if (_engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face3)) {

                if (!this.keyHeld) {
                    console.log("B");
                    this.playerInputKb.push('KeyB');
                    GameStateController.playSound(Resources.pianoA, 1)
                    this.keyHeld = true;

                }
            } else {
                if (_engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.LeftBumper)) {
                    if (!this.keyHeld) {
                        console.log("C");
                        this.playerInputKb.push('KeyC');
                        GameStateController.playSound(Resources.pianoB, 1)
                        this.keyHeld = true;

                    }
                } else {
                    if (_engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.RightBumper)) {
                        if (!this.keyHeld) {
                            this.playerInputKb.push('KeyD');
                            GameStateController.playSound(Resources.pianoD, 1)
                            console.log("D");
                            this.keyHeld = true;

                        }
                    } else {
                        this.keyHeld = false;
                    }
                }
            }
        }
        if(_engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.LeftBumper))
        {
            console.log("C _ LeftBumper");
        }
        if(_engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.RightBumper))
        {
            console.log("D _RightBumper");
        }

            if(_engine.input.keyboard.getKeys().length>0 || _engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face1)||
                _engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face2)||
                _engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face3)||
                _engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face4)) {
                if(this.keyPressed!=_engine.input.keyboard.getKeys()[0] ) {
                    if(this.keyHeld == false)
                    this.keyPressed = _engine.input.keyboard.getKeys()[0];


                    if (this.canContinue) {

                        if ( this.keyPressed!== 'Enter' &&  this.keyPressed !== 'Space') {
                                this.playerInputKb.push( this.keyPressed);

                        }

                        console.log(this.keyPressed);
                        console.log(this.playerInputKb);
                        if ( this.keyPressed === 'KeyA') {
                            GameStateController.playSound(Resources.pianoA, 1)
                        }

                        if ( this.keyPressed === 'KeyB') {
                            GameStateController.playSound(Resources.pianoB, 1)
                        }

                        if ( this.keyPressed === 'KeyC') {
                            GameStateController.playSound(Resources.pianoC, 1)
                        }

                        if ( this.keyPressed === 'KeyD') {
                            GameStateController.playSound(Resources.pianoD, 1)
                        }

                    }
                }
            }
            else
            {
                this.keyPressed = null;
            }
            /*

            _engine.input.gamepads.on('button', (evt) => {
                const buttonPressed = evt.button;
                this.playerInputGp.push(buttonPressed);

                //if key pressed matches sound requirement
                //Tell singleton to play sound
            });
            */


    }



    //refactor length to check for content instead
    handleSequence() {
        console.log(this.expectedSequence);
        if (
            (this.playerInputKb.length === this.expectedSequence.length &&
                this.playerInputKb.join('') === this.expectedSequence.join('')) ||
            (this.playerInputGp.length === this.expectedSequence.length &&
                this.playerInputGp.join('') === this.expectedSequence.join(''))
        ) {
            console.log("Correct");
            GameStateController.instance.pianoCompleted = true;
            GameStateController.getEngine().goToScene("Interior_A");

         //   GameStateController.showTextBoxMessage("You", "Whoa! Something interesting happened.");
        } else {
            console.log("Incorrect");
            GameStateController.instance.pianoWasIncorrect = true;
            GameStateController.getEngine().goToScene("Interior_A");

           // GameStateController.showTextBoxMessage("You", "Whoa! Something bad happened.");
        }

        // Clear player's input for the next round
        this.playerInputKb.length = 0;
        this.playerInputGp.length = 0;

        this.isChecking = false;
    }
}