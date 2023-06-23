import {Debug} from "excalibur";
import {GameStateController} from "./GameStateController.js";
import {Scene} from "excalibur";

export class Dialogue
{
    speaker
    lines
    endFunction
    internalLineIterator
    constructor(speaker,lines,endFunction) {
        this.speaker= speaker;
        this.lines = lines;
        this.endFunction = endFunction;
        this.internalLineIterator = 0;
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