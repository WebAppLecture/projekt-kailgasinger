
import { GameObject, MovableGameObject, Ball, Mode } from "../../vendor/gamebox/src/js/GameObject.js";
import { MovableSpriteObject } from "./SpriteObject.js";
import { BattleCreature } from "./BattleCreature.js";


// update?!? z.B. mit bei Kollision => Explosion o.ä.
// |-> Problem bezgl. Kollision :/
export class AttackAnim extends MovableSpriteObject {

    constructor(x, y, width, height, color, vx, vy, sprite="none", type="default", vxStart, vyStart) {
        super(x, y, width, height, color, vx, vy, sprite)
        this.type = type;
        this.vxStart = vxStart;
        this.vyStart = vyStart;
        this.lifetime = 0;
    }

    randomize() {
        let rand = Math.random();
        switch (this.type) {
            case "Fiery Breath": case "Spark":
                this.vx += 0.5*(Math.random()-0.5);
                this.vy += 0.5*(Math.random()-0.5);
            break;
            case "Fireball":
                this.vx +=0.3*rand*this.vxStart;
                this.vy +=0.3*rand*this.vyStart;
                this.width +=2*rand;
                this.height +=2*rand;
            break;
            case "Freeze":
                this.vx -=rand*0.02*this.vxStart;
                this.vy -=rand*0.02*this.vyStart;
                this.width +=rand;
                this.height +=rand;
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

export class EggSparkAnim extends AttackAnim {

    constructor(x, y, width, height, color, vx, vy, sprite="none", type="default", vxStart, vyStart) {
        super(x, y, width, height, color, vx, vy, sprite="none", type="default", vxStart, vyStart);
        this.lifetime = 0;
    }

    randomize() {
        let rand = Math.random();
        this.vx *= (1+rand/5);
        this.vy *= (1+rand/5);
    }

}