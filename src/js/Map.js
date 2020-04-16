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
        this.maplengthx = 19*this.fieldlength;
        this.maplengthy = 24*this.fieldlength;
        this.player = new Player(this.maplengthx/2, this.maplengthy/2, 15, 15, "#180b1d", 10);
        this.colors = {mountain:"#180b1d", tree:"#c470b3", fight:"#ba9714", water:"#db0303", swamp:""};
        

        // Entity Test ab hier:
        this.entities = [];
        this.entities.push( new MapObject(200, 200, 20, 20, "#000000", "fight"));
        for (let i=0; i<=this.maplengthx; i= i+20){
            for (let j=0; j<=this.maplengthy; j= j+40){
                if (i === 0 || j === 0 || i === this.maplengthx || j === this.maplengthy){
                    this.entities.push( new MapObject(i, j, 20, 20, this.colors["tree"], "tree"));
                }
            }
        }
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
            if (MapObject.rectangleCollision(this.entities[j], this.player)) {
                if (this.entities[j].name === "fight"){
                    return "startBattle";
                }
                if (this.entities[j].name === "tree"){

                    return "map";
                }
            }
            else {
                return "map";
            }
        }
    }

}

export class Player extends GameObject{
    constructor(x, y, width, height, color, speed){
        super(x, y, width, height, color);
        this.speed = speed;
    }
    

}

export class MapObject extends GameObject{
    constructor(x, y, width, height, color, name){
        super(x, y, width, height, color);
        this.name = name;
    }
}
