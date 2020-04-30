
import { BasicDrawer } from "../../src/js/BasicDrawer.js";
import { MovableSpriteObject } from "../../src/js/SpriteObject.js";

export class CreatureDetailsDrawer extends BasicDrawer {

    constructor(pCreature, egg) {
        super();
        this.pCreature = pCreature;
        this.egg = new MovableSpriteObject(-51.5, -115, 95, 125, "", 0, 0, "../../src/images/eggs/"+egg+".png");
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

    drawCreatureStats(ctx) {
        this.drawBox(ctx, "rgba(130, 140, 120, 0.8)", 0, 340, 400, 240);
        this.drawString(ctx, "#000000", 150, 350, this.pCreature.name+"'s stats:", "middle");
        this.drawString(ctx, "#000000", 5, 370, "Health: "+this.pCreature.stats.health+"/"+this.pCreature.stats.maxhealth, "middle");
        // für draw_health eine neue Fn (damit in Battle und details)!
        this.drawBox(ctx, "#C81D1A", 125, 363, 200, 14); //Maxhealth
        this.drawBox(ctx, "#25DE0F", 126, 364, 199*(this.pCreature.stats.health/this.pCreature.stats.maxhealth) -1, 12);
        this.drawString(ctx, "#000000", 5, 385, "Energy: "+this.pCreature.stats.energy+"/"+this.pCreature.stats.maxenergy, "middle");
        this.drawString(ctx, "#000000", 5, 400, "Attack Power: "+this.pCreature.stats.atk, "middle");
        this.drawString(ctx, "#000000", 5, 415, "Defense: "+this.pCreature.stats.def, "middle");
        this.drawString(ctx, "#000000", 5, 430, "Special Att. Power: "+this.pCreature.stats.spatk, "middle");
        this.drawString(ctx, "#000000", 5, 445, "Special Def.: "+this.pCreature.stats.spdef, "middle");
        console.log(this.pCreature);
    }

    drawCreature(ctx) {
        let image = new Image();
        image.src = "../../src/images/creatures/"+this.pCreature.sprite+"_front.png";
        ctx.drawImage(image, 135, 160,  150, 150);
    }
}