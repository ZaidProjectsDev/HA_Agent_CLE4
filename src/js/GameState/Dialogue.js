import {Debug} from "excalibur";
import {GameStateController} from "./GameStateController.js";
import {Scene} from "excalibur";

export class Dialogue
{
    speaker
    lines
    endFunction
    internalLineIterator
    actor
    playSound
    constructor(speaker,lines,endFunction,actor) {
        this.speaker= speaker;
        this.lines = lines;
        this.endFunction = endFunction;
        this.internalLineIterator = 0;
        this.actor = actor;
        console.log(lines[0]);
    }
    getNextLine()
    {
        if(this.internalLineIterator>this.lines.length-1)
        {
            this.internalLineIterator =0;
            return "";
        }
        else
        {
            let returnLine = this.internalLineIterator;
            this.internalLineIterator++;
            console.log(this.lines[returnLine]);
            return this.lines[returnLine];
        }
    }
    runEndFunction()
    {
        if(this.endFunction!= "")
        {
            eval(this.endFunction);
        }
    }
}