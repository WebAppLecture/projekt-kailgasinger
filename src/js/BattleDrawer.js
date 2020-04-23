
import { AttackAnim } from "../../src/js/BattleAnim.js";

/*
    Problem in Switch Case mit let count in verschiedenen Cases
*/


export class BattleDrawer {

    constructor(pCreature, eCreature) {
        this.eCreature = eCreature;
        this.pCreature = pCreature;
        this.attackAnims = [];
    }

    // All Time Drawer:
    drawBattle(ctx) {
        this.drawMonsters(ctx, this.pCreature, this.eCreature);
        this.drawMovesBackgr(ctx);
        this.drawHealth(ctx, this.pCreature, this.eCreature);
        this.drawEnergy(ctx);
        this.drawNames(ctx, this.pCreature.name, this.eCreature.name);
    }

    drawMonsters(ctx, pCreature, eCreature) {
        pCreature.draw(ctx);
        eCreature.draw(ctx);
     }

     drawMovesBackgr(ctx) {      // Eine Fn. zum REchteck zeichen (Farbe, Maße)
        this.drawBox(ctx, "#828C78", -1, 441, ctx.canvas.width, 60);
    }

    drawNames(ctx, pName, eName) {  // AUslagern:P => done!
        // Spieler:
        this.drawBox(ctx, "#828C78", -1, 410, 100, 29);
        this.drawString(ctx, "#000000", 10, 425, pName);

        // Gegner:
        this.drawBox(ctx, "#828C78", 300, 8, 100, 29);
        this.drawString(ctx, "#000000", 310, 20, eName);
    }

    drawHealth(ctx,pCreature, eCreature) {
        //Spieler:
        this.drawBox(ctx, "#C81D1A", 101, 410, 200, 14); //Maxhealth
        this.drawBox(ctx, "#25DE0F", 102, 411, 199*(pCreature.stats.health/pCreature.stats.maxhealth) -1, 12);

        //Enemy:
        this.drawBox(ctx, "#C81D1A", 97, 8, 200, 14);
        this.drawBox(ctx, "#25DE0F", 98+199*(1-eCreature.stats.health/eCreature.stats.maxhealth), 9, 199*(eCreature.stats.health/eCreature.stats.maxhealth) -1, 12); 
    }

    drawEnergy(ctx) {
        //Spieler:
        this.drawBox(ctx, "#211D26", 101, 425, 200, 14); //MaxEn
        this.drawBox(ctx, "#1B6BEF", 102, 426, 199*(this.pCreature.stats.energy/this.pCreature.stats.maxenergy) -1, 12);

        //Enemy:
        this.drawBox(ctx, "#211D26", 97, 23, 200, 14);
        this.drawBox(ctx, "#1B6BEF", 98+199*(1-this.eCreature.stats.energy/this.eCreature.stats.maxenergy), 24, 199*(this.eCreature.stats.energy/this.eCreature.stats.maxenergy) -1, 12);
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
        
        switch (move) {
        	case "Fiery Breath":
                let count = Math.round(6*perform);
                for (let i = 0; i<=count; i++) {
                    this.attackAnims.push( new AttackAnim(xStart+20*Math.random(), yStart+20*Math.random(), 10, 10, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", vxStart*2.25+Math.random(), 3.8*vyStart+Math.random(), "none", "Fiery Breath", vxStart, vyStart));
                    //console.log( new AttackAnim(xStart+20*Math.random(), yStart+20*Math.random(), 10, 10, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", vxStart*2.25+Math.random(), 3.8*vyStart+Math.random(), "none", "Fiery Breath", vxStart, vyStart));
                }
            break;
            case "Fireball":
                let size = 10*(perform*perform);
                let vx = 0.1*(perform*perform); let vy = 1.5*(perform*perform);
                this.attackAnims.push( new AttackAnim(xStart+15*Math.random(), yStart+15*Math.random(), size, size, "rgb("+140+Math.random()*60+","+(80+Math.random()*30)+", 16)", vxStart*vx, vyStart*vy, "none", "Fireball", vxStart, vyStart));
                //console.log( new AttackAnim(xStart+15*Math.random(), yStart+15*Math.random(), size, size, "rgb("+140+Math.random()*60+","+(80+Math.random()*30)+", 16)", vxStart*vx, vyStart*vy, "none", "Fireball", vxStart, vyStart));
            break;
            case "Freeze":
                let counter = Math.round(12*perform);
                for (let i = 0; i<=counter; i++) {
                    this.attackAnims.push( new AttackAnim(xStart+55*Math.random(), yStart-50+45*Math.random(), 6+counter/4*i, 6+counter/4*i, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", vxStart*1.5+Math.random(), 3*vyStart+Math.random(), "freeze.png", "Freeze", vxStart, vyStart));
                    //console.log( new AttackAnim(xStart+15*Math.random(), yStart+15*Math.random(), 10, 10, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", vxStart*2.25+Math.random(), 3.8*vyStart+Math.random(), "freeze.png", "Freeze", vxStart, vyStart));
                }
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