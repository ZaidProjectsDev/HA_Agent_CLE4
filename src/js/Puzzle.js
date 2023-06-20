import * as ex from 'excalibur';

export class Actor extends ex.Actor
{
    expectedSequence;
    playerInputKb;
    playerInputGp;
    isChecking;

    onInitialize(_engine) {
        this.expectedSequence = ['A', 'B', 'C', 'D'];
        this.playerInputKb = [];
        this.playerInputGp = [];
        this.isChecking = false;
        this.getPlayerInput();

    }

    onPreUpdate(_engine, _delta) {

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


            if (keyPressed === 'A') {

            }

            if (keyPressed === 'B') {

            }

            if (keyPressed === 'C') {

            }

            if (keyPressed === 'D') {

            }

            //if key pressed matches sound requirement
            //Tell singleton to play sound
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
        if (
            (this.playerInputKb.length === this.expectedSequence.length &&
                this.playerInputKb.join('') === this.expectedSequence.join('')) ||
            (this.playerInputGp.length === this.expectedSequence.length &&
                this.playerInputGp.join('') === this.expectedSequence.join(''))
        ) {
            // Player entered the correct sequence
        } else {
            // Player entered the wrong sequence
        }

        // Clear player's input for the next round
        this.playerInputKb.length = 0;
        this.playerInputGp.length = 0;

        this.isChecking = false;
    }
}