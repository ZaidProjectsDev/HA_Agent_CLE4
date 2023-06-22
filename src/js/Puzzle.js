import * as ex from 'excalibur';
import {GameStateController} from "./GameState/GameStateController.js";
import {Resources} from "./resources.js";

export class Puzzle extends ex.Actor
{
    expectedSequence;
    playerInputKb;
    playerInputGp;
    isChecking;
    canContinue;
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.expectedSequence = ['KeyA', 'KeyB', 'KeyC', 'KeyD'];
        this.playerInputKb = [];
        this.playerInputGp = [];
        this.isChecking = false;
        this.canContinue = false;
        this.getPlayerInput(GameStateController.getEngine());
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
            if (this.playerInputKb.length > 3 || this.playerInputGp > 3) {
                this.handleSequence();
            }
        }
    }

    getPlayerInput (_engine) {

            //add check to make sure confirmation key is ignored

            _engine.input.keyboard.on('press', (evt) => {
                if(this.canContinue)
                {
                const keyPressed = evt.key;

                if (keyPressed !== 'Enter' && keyPressed !== 'Space') {
                    if (keyPressed === 'KeyA' || keyPressed === 'KeyB' || keyPressed === 'KeyC' || keyPressed === 'KeyD') {
                        this.playerInputKb.push(keyPressed);
                    }
                }

                console.log(keyPressed);
                console.log(this.playerInputKb);
                if (keyPressed === 'KeyA') {
                    GameStateController.playSound(Resources.pianoA, 1)
                }

                if (keyPressed === 'KeyB') {
                    GameStateController.playSound(Resources.pianoB, 1)
                }

                if (keyPressed === 'KeyC') {
                    GameStateController.playSound(Resources.pianoC, 1)
                }

                if (keyPressed === 'KeyD') {
                    GameStateController.playSound(Resources.pianoD, 1)
                }

            }});

            _engine.input.gamepads.on('button', (evt) => {
                const buttonPressed = evt.button;
                this.playerInputGp.push(buttonPressed);

                //if key pressed matches sound requirement
                //Tell singleton to play sound
            });

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
            GameStateController.instance.pianoWasIncorrect = false;
            GameStateController.getEngine().goToScene("Interior_A");

           // GameStateController.showTextBoxMessage("You", "Whoa! Something bad happened.");
        }

        // Clear player's input for the next round
        this.playerInputKb.length = 0;
        this.playerInputGp.length = 0;

        this.isChecking = false;
    }
}