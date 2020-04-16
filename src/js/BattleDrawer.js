
import { AttackAnim } from "../../src/js/BattleAnim.js";

export class BattleDrawer {

    constructor() {
        this.attackAnims = [];
    }

    drawBox(ctx, color, x, y, width, heigth) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, width, heigth);
        ctx.fill();
    }

    drawString(ctx, color, x, y, string, align="left", baseline="middle", font="16px monospace") {
        ctx.fillStyle = color;

        ctx.font = font;
        ctx.textAlign = align;
        ctx.textBaseline = baseline;
        ctx.fillText(string, x, y);
    }

    drawAnim(move, perform) {
        switch (move) {
        	case "Sparky Breath":
                let count = Math.round(6*perform);
                for (let i = 0; i<=count; i++) {
                    this.attackAnims.push( new AttackAnim(70+20*Math.random(), 360+20*Math.random(), 10, 10, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", 2.25+Math.random(), -3.8+Math.random(),"Sparky Breath"));
                }
            break;
            case "Fireball":
                let size = 10*(perform*perform);
                let vx = 0.1*(perform*perform); let vy = -1.5*(perform*perform);
                this.attackAnims.push( new AttackAnim(75+10*Math.random(), 365+10*Math.random(), size, size, "rgb("+140+Math.random()*60+","+(80+Math.random()*30)+", 16)", vx, vy, "Fireball"));
            break;
        }
    }

    updateAnims(ctx) {
        for (let i in this.attackAnims) {
            this.attackAnims[i].update(ctx);
            this.attackAnims[i].randomize();
            let effect = this.attackAnims[i].createEffect();
            if ( effect != null) {
                this.attackAnims.push( effect );
            }
        }
    }
}