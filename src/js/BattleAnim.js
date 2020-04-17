
import { GameObject, MovableGameObject, Ball, Mode } from "../../vendor/gamebox/src/js/GameObject.js";
import { MovableSpriteObject } from "./SpriteObject.js";


export class AttackAnim extends MovableSpriteObject {

    constructor(x, y, width, height, color, vx, vy, sprite="none", type="default", vxStart, vyStart) {
        super(x, y, width, height, color, vx, vy, sprite)
        this.type = type;
        this.vxStart = vxStart;
        this.vyStart = vyStart;
    }

    randomize() {
        switch (this.type) {
            case "Fiery Breath": case "Spark":
                this.vx += 0.5*(Math.random()-0.5);
                this.vy += 0.5*(Math.random()-0.5);
            break;
            case "Fireball":
                let rand = 0.3*Math.random();
                this.vx +=rand*this.vxStart;
                this.vy +=rand*this.vyStart;
                this.width +=6*rand;
                this.height +=6*rand;
            break;
        }
    }

    createEffect() {
        //DB console.log("Test, Type= "+this.type);
        switch (this.type) {
            case "Fiery Breath":
                if (Math.random() >= 0.99) {
                    // DB console.log("Test2");
                    let ret = new AttackAnim(this.x+10*Math.random(), this.y+10*Math.random(), 5, 5, "rgb("+175+Math.random()*100+","+(185+Math.random()*70)+", 3)", this.vxStart*0.9, -1.9, "none", "Spark");
                    return ret;
                }
            break;
            case "Fireball":
                if (Math.random() >= 0.8) {
                    // DB console.log("Test2");
                    let ret = new AttackAnim(this.x+10*Math.random(), this.y+10*Math.random(), 5+Math.random()*5, 5+Math.random()*5, "rgb("+175+Math.random()*100+","+(185+Math.random()*70)+", 3)", this.vxStart*0.9, -1.9, "none", "Spark");
                    return ret;
                }
            break;
        }
    }

}