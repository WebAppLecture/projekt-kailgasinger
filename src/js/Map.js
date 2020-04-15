import { GameObject } from "../../vendor/gamebox/src/js/GameObject.js";

export class Map {
    constructor(maplengthx, maplengthy, name){
        this.maplengthx = maplengthx;
        this.maplengthy = maplengthy;
        this.name = name;
    }

    start(){
        this.battleencounter = false; //bei true -> in Battle wechseln
        this.fieldlength = 20; 
        this.maplengthx = 10*this.fieldlength;
        this.maplengthy = 10*this.fieldlength;
        this.player = new Player(this.maplengthx/2, this.maplengthy/2, 15, 15, "#180b1d", 10)

    }

    bindControls(){
        this.inputBinding = {
            "left": () => this.player.x += -10,
            "right": () => this.player.x += 10,
            "up": () => this.player.y += -10,
            "down": () => this.player.y += 10,
        };
    }

    method() {
    
    }
    draw(ctx){
        this.player.draw(ctx);
    }

}

export class Player extends GameObject{
    constructor(x, y, width, height, color, speed){
        super(x, y, width, height, color)
        this.speed = speed;
    }
    

}