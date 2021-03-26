
import { AttackAnim } from "../../src/js/BattleAnim.js";
import { BasicDrawer } from "../../src/js/BasicDrawer.js";


export class BattleDrawer extends BasicDrawer{

    constructor(pCreature, eCreature) {
        super();
        this.eCreature = eCreature;
        this.pCreature = pCreature;
        this.attackAnims = [];
    }

    // All Time Drawer:
    drawBattle(ctx) {
        this.drawBaground(ctx, this.eCreature.width, this.eCreature.height);
        this.drawMonsters(ctx, this.pCreature, this.eCreature);
        this.drawMovesBackgr(ctx);
        this.drawHealth(ctx, this.pCreature, this.eCreature, "battle");
        this.drawEnergy(ctx, this.pCreature, this.eCreature, "battle");
        this.drawNames(ctx, this.pCreature.name, this.eCreature.name);
    }

    
    drawBaground(ctx, width, height) {
        let image = new Image();
        image.src = "../../src/images/background/grass_tile.png";
        ctx.drawImage(image, 212/(height/150), 110*height/150, 227*width/150, 74*height/150);
        ctx.drawImage(image, -43, 382, 227, 74);
    }

    drawMonsters(ctx, pCreature, eCreature) {
        pCreature.draw(ctx);
        eCreature.draw(ctx);
     }

    drawNames(ctx, pName, eName) {  // AUslagern:P => done!
        // Spieler:
        this.drawBox(ctx, "#828C78", -1, 410, 140, 29);
        this.drawString(ctx, "#000000", 10, 425, pName);

        // Gegner:
        this.drawBox(ctx, "#828C78", 260, 8, 140, 29);
        this.drawString(ctx, "#000000", 265, 20, eName);
    }

    drawAnim(move, perform, xStart, yStart, vxStart, vyStart) { // Startwerte auslagern! Switch Case auslagern (insgesamt 3 Funktionen!)
        
        switch (move) {
        	case "Fiery Breath":
                let count = Math.round(6*perform);
                for (let i = 0; i<=count; i++) {
                    this.attackAnims.push( new AttackAnim(xStart+20*Math.random(), yStart+20*Math.random(), 10, 10, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", vxStart*2.25+Math.random(), 3.8*vyStart+Math.random(), "none", "Fiery Breath", vxStart, vyStart));
                }
            break;
            case "Fireball":
                let size = 10*(perform*perform);
                let vx = 0.1*(perform*perform); let vy = 1.5*(perform*perform);
                this.attackAnims.push( new AttackAnim(xStart+15*Math.random(), yStart+15*Math.random(), size, size, "rgb("+140+Math.random()*60+","+(80+Math.random()*30)+", 16)", vxStart*vx, vyStart*vy, "none", "Fireball", vxStart, vyStart));
            break;
            case "Freeze":
                let counter = Math.round(12*perform);
                for (let i = 0; i<=counter; i++) {
                    this.attackAnims.push( new AttackAnim(xStart+55*Math.random(), yStart-50+45*Math.random(), 6+counter/4*i, 6+counter/4*i, "rgba("+130+Math.random()*80+","+(80+Math.random()*30)+", 16,"+(0.5+Math.random()*0.5)+")", vxStart*1.5+Math.random(), 3*vyStart+Math.random(), "/attacks/freeze.png", "Freeze", vxStart, vyStart));
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