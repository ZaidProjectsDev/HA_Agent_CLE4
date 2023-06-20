import * as ex from 'excalibur';

export class Actor extends ex.Actor
{
    expectedSequence;
    playerInputKb;
    playerInputGp;

    onInitialize(_engine) {
        const expectedSequence = [];
        const playerInputKb = [];
        const playerInputGp = [];

        this.getPlayerInput();

        this.handleSequence();

    }

    getPlayerInput (_engine) {
        _engine.input.keyboard.on('press', (evt) => {
            const keypressed = evt.key;
            this.playerInputKb.push(keypressed);
        });

        _engine.input.gamepads.on('button', (evt) => {
            const buttonPressed = evt.button;
            this.playerInputGp.push(buttonPressed);
        });
    }

    handleSequence (_engine) {
        if (this.playerInputKb.length === this.expectedSequence.length || this.playerInputGp.length === this.expectedSequence.length) {
            let isCorrect = true;
            for (let i = 0; i < this.expectedSequence.length; i++) {
                if (this.playerInputKb[i] !== this.expectedSequence[i] || this.playerInputGp[i] !== this.expectedSequence[i]) {
                    isCorrect = false;
                    break;
                }
            }

            if (isCorrect) {
                // Player entered the correct sequence
                // Do something
            } else {
                // Player entered the wrong sequence
                // Do something else
            }

            // Clear player's input for the next round
            this.playerInputKb.length = 0;
            this.playerInputGp.length = 0;
        }
    }
}