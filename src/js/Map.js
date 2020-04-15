import { GameObject } from "../../vendor/gamebox/src/js/GameObject.js";

export class Map {
    constructor(maplengthx, maplengthy, name){
        this.maplengthx = maplengthx;
        this.maplengthy = maplengthy;
        this.name = name;
    }

    start() {
        this.battleencounter = false; //bei true -> in Battle wechseln
        this.fieldlength = 20; 
        this.maplengthx = 10*this.fieldlength;
        this.maplengthy = 10*this.fieldlength;
        this.player = new Player(this.maplengthx/2, this.maplengthy/2, 15, 15, "#180b1d", 10);

        // Entity Test ab hier:
        this.entities = [];
        this.entities.push( new GameObject(200, 200, 30, 30, "#000000"));
    }

    bindControls() {
        
    }

    method() {
    
    }
    draw(ctx){
        this.player.draw(ctx);
        this.drawEntities(ctx);
    }

    drawEntities(ctx) {
        for (let i in this.entities) {
            this.entities[i].draw(ctx);
        }
    }

    update() {
        for (var j in this.entities) {
            if (GameObject.rectangleCollision(this.entities[j], this.player)) {
                return "startBattle";
            }
            else {
                return "map";
            }
        }
    }

}

export class Player extends GameObject{
    constructor(x, y, width, height, color, speed){
        super(x, y, width, height, color)
        this.speed = speed;
    }
    

}
