import * as ex from 'excalibur';
import {Input} from 'excalibur';
import {GameStateController} from "./GameState/GameStateController.js";
import {Resources} from "./resources.js";

export class Puzzle extends ex.Actor
{
    expectedSequence;
    playerInputKb;
    playerInputGp;
    isChecking;

    onInitialize(_engine) {
        this.expectedSequence = ['KeyA', 'KeyB', 'KeyC', 'KeyD'];
        this.playerInputKb = [];
        this.playerInputGp = [];
        this.isChecking = false;
        this.getPlayerInput(_engine);

        if (this.isChecking === false) {
            _engine.input.keyboard.on('press', (evt) => {
                if (evt.key === 'Enter') {
                    this.isChecking = true;
                    this.handleSequence();
                }
            });

            _engine.input.gamepads.on('button', (evt) => {
                if (evt.button === ex.Input.Buttons.Start) {
                    this.isChecking = true;
                    this.handleSequence();
                }
            });
        }
    }

    getPlayerInput (_engine) {

        //add check to make sure confirmation key is ignored

        _engine.input.keyboard.on('press', (evt) => {
            const keyPressed = evt.key;
            this.playerInputKb.push(keyPressed);
            console.log(keyPressed);
            console.log(this.playerInputKb);

            if(keyPressed !== 'KeyEnter'){
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
            }

        });

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
        } else {
            console.log("Incorrect");
        }

        // Clear player's input for the next round
        this.playerInputKb.length = 0;
        this.playerInputGp.length = 0;

        this.isChecking = false;
    }
}