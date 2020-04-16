
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

    drawAnim(move, perform, xStart, yStart, vxStart, vyStart) { // Startwerte auslagern! Switch Case auslagern (insgesamt 3 Funktionen!)
        
        /*
        let xStart = 70;
        let yStart = 360;
        let vxStart = 1;
        let vyStart = -1;
        if (caster === "player") {
            xStart = 70;
            yStart = 360;
            vxStart = 1;
            vyStart = -1;
        }
        else {
            xStart = 310;
            yStart = 40;
            xStart = -1;
            yStart = 1;
        }
        */
        switch (move) {
        	case "Sparky Breath":
                let count = Math.round(6*perform);
                for (let i = 0; i<=count; i++) {
                    this.attackAnims.push( new AttackAnim(xStart+20*Math.random(), yStart+20*Math.random(), 10, 10, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", vxStart*2.25+Math.random(), 3.8*vyStart+Math.random(),"Sparky Breath", vxStart, vyStart));
                }
            break;
            case "Fireball":
                let size = 10*(perform*perform);
                let vx = 0.1*(perform*perform); let vy = 1.5*(perform*perform);
                this.attackAnims.push( new AttackAnim(xStart+15*Math.random(), yStart+15*Math.random(), size, size, "rgb("+140+Math.random()*60+","+(80+Math.random()*30)+", 16)", vxStart*vx, vyStart*vy, "Fireball", vxStart, vyStart));
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