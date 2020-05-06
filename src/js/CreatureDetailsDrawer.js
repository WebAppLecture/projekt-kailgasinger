
import { BasicDrawer } from "../../src/js/BasicDrawer.js";
import { MovableSpriteObject } from "../../src/js/SpriteObject.js";

export class CreatureDetailsDrawer extends BasicDrawer {

    constructor(pCreature, egg) {
        super();
        this.pCreature = pCreature;
        this.egg = new MovableSpriteObject(-51.5, -115, 95, 125, "", 0, 0, "../../src/images/eggs/"+egg+".png");
        this.active = 0;
        //
    }

    clearScreen(ctx) { //übermalt Canvas
        this.drawBox(ctx, "#484", 0, 0, ctx.width, ctx.heigth);
    }

    drawBase(ctx) {
        let image = new Image();
        image.src = "../../src/images/background/grass_tile.png";
        ctx.drawImage(image, 90, 250, 227, 81);
    }

    drawEgg(ctx, timer, rotate = 0) {
        this.drawString(ctx, "#000000", 100, 110, "Your egg will hatch soon (A)!", "middle", "middle", "16px monospace");
        ctx.translate(200, 270);
        if (rotate >= 1) {
            //rotation
            timer %= 120;
            if (timer % 120 >= 60) {
                timer = 120-timer;
            }
            timer -= 35;
            //rotation
            ctx.rotate(timer * Math.PI / 360);
        }
        this.egg.draw(ctx);
        if (rotate >= 1) {
            ctx.rotate(-timer * Math.PI / 360);
        }
        ctx.translate(-200, -270);
    }

    drawCreatureInfo(ctx) {
        this.drawBox(ctx, "rgba(130, 140, 120, 0.8)", 0, 340, 400, 240);    // Big Box
        this.drawBox(ctx, "rgba(120, 120, 90, 0.8)", 0, 395, 145, 240);    // Stats Box
        this.drawBox(ctx, "rgba(160, 150, 110, 0.8)", 150, 395, 250, 240);    // Moves Box
        this.drawBox(ctx, "rgba(140, 120, 100, 0.8)", 150, 430, 250, 240);    // MovesDesc Box
        this.drawString(ctx, "#000000", 140, 350, this.pCreature.name+"'s stats:", "middle");
        this.drawString(ctx, "#000000", 5, 370, "Health: "+this.pCreature.stats.health+"/"+this.pCreature.stats.maxhealth, "middle");
        // für draw_health eine neue Fn (damit in Battle und details)!
        this.drawHealth(ctx, this.pCreature, null, "details");
        this.drawString(ctx, "#000000", 5, 386, "Energy: "+this.pCreature.stats.energy+"/"+this.pCreature.stats.maxenergy, "middle");
        this.drawEnergy(ctx, this.pCreature, null, "details");

        this.drawCreatureStats(ctx, 5, 405);
        this.drawMoves(ctx, this.pCreature.moves, this.active, 275, 405, 14);
        this.drawMoveDesc(ctx, this.pCreature.moves, this.active, 155, 455);
    }

    drawCreatureStats(ctx, xStart, yStart) {
        let dist = 125;
        this.drawString(ctx, "#000000", xStart, yStart, "Attack Power: ");
        this.drawString(ctx, "#000099", xStart+dist, yStart, this.pCreature.stats.atk);
        this.drawString(ctx, "#000000", xStart, yStart+16, "Defense: ");
        this.drawString(ctx, "#000099", xStart+dist, yStart+16, this.pCreature.stats.def);
        this.drawString(ctx, "#000000", xStart, yStart+32, "Special Att.: ");
        this.drawString(ctx, "#000099", xStart+dist, yStart+32, this.pCreature.stats.spatk);
        this.drawString(ctx, "#000000", xStart, yStart+48, "Special Def.: ");
        this.drawString(ctx, "#000099", xStart+dist, yStart+48, this.pCreature.stats.spdef);
    }



    drawCreature(ctx) {
        let image = new Image();
        image.src = "../../src/images/creatures/"+this.pCreature.sprite+"_front.png";
        ctx.drawImage(image, 135, 160,  150, 150);
    }
}