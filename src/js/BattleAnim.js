
import { GameObject, MovableGameObject, Ball, Mode } from "../../vendor/gamebox/src/js/GameObject.js";


export class AttackAnim extends Ball {

    constructor(x, y, width, height, color, vx, vy, type="default") {
        super(x, y, width, height, color, vx, vy)
        this.type = type;
    }

    randomize() {
        switch (this.type) {
            case "Sparky Breath": case "Spark":
                this.vx += 0.5*(Math.random()-0.5);
                this.vy += 0.5*(Math.random()-0.5);
            break;
            case "Fireball":
                let rand = 0.3*Math.random();
                this.vx +=rand;
                this.vy -=rand;
                this.width +=6*rand;
                this.height +=6*rand;
            break;
        }
    }

    createEffect() {
        //DB console.log("Test, Type= "+this.type);
        switch (this.type) {
            case "Sparky Breath":
                if (Math.random() >= 0.99) {
                    // DB console.log("Test2");
                    let ret = new AttackAnim(this.x+10*Math.random(), this.y+10*Math.random(), 5, 5, "rgb("+175+Math.random()*100+","+(185+Math.random()*70)+", 3)", 0.9, -1.9, "Spark");
                    return ret;
                }
            break;
            case "Fireball":
                if (Math.random() >= 0.8) {
                    // DB console.log("Test2");
                    let ret = new AttackAnim(this.x+10*Math.random(), this.y+10*Math.random(), 5+Math.random()*5, 5+Math.random()*5, "rgb("+175+Math.random()*100+","+(185+Math.random()*70)+", 3)", 0.9, -1.9, "Spark");
                    return ret;
                }
            break;
        }
    }

}