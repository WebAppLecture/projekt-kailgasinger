import { LibMove } from "../../src/js/LibMove.js";

export class BasicDrawer {

    drawMovesBackgr(ctx) {      // Eine Fn. zum REchteck zeichen (Farbe, Maße)
        this.drawBox(ctx, "#828C78", 0, 440, ctx.canvas.width, 60);
    }

    drawDialogueBox(ctx) {
        this.drawBox(ctx, "rgba(130, 140, 120, 0.8)", 0, 420, ctx.canvas.width, 80);
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

    // für Fight und Creaturedetails
    drawHealth(ctx, pCreature, eCreature, mode) {
        //console.log(mode);
        let x=0; let y=0;
        if (mode == "battle") {
            x = 141;
            y = 410;

            //Enemy:
            this.drawBox(ctx, "#C81D1A", 57, 8, 200, 14);
            this.drawBox(ctx, "#25DE0F", 58+199*(1-eCreature.stats.health/eCreature.stats.maxhealth), 9, 199*(eCreature.stats.health/eCreature.stats.maxhealth) -1, 12); 
        }
        else if (mode == "details") {
            x = 130;
            y = 363;
        }
        //Spieler:
        this.drawBox(ctx, "#C81D1A", x, y, 200, 14); //Maxhealth
        this.drawBox(ctx, "#25DE0F", x+1, y+1, 199*(pCreature.stats.health/pCreature.stats.maxhealth) -1, 12);
    }

    drawEnergy(ctx, pCreature, eCreature, mode) {
        //console.log(mode);
        let x=0; let y=0;
        if (mode == "battle") {
            x = 141;
            y = 425;

            //Enemy:
            this.drawBox(ctx, "#211D26", 57, 23, 200, 14);
            this.drawBox(ctx, "#1B6BEF", 58+199*(1-this.eCreature.stats.energy/this.eCreature.stats.maxenergy), 24, 199*(this.eCreature.stats.energy/this.eCreature.stats.maxenergy) -1, 12);

        }
        else if (mode == "details") {
            x = 130;
            y = 379;
        }
        //Spieler:
        this.drawBox(ctx, "#211D26", x, y, 200, 14); //MaxEn
        this.drawBox(ctx, "#1B6BEF", x+1, y+1, 199*(this.pCreature.stats.energy/this.pCreature.stats.maxenergy) -1, 12);
    }
    
    drawMoves(ctx, playermoves, active, offx, offy, size = 16) {
        for (let x in playermoves) {
            let color = "#000000";
            if (active == x) {
                color = "#49D615"
            }
            let y = Math.round(x/2-0.1);
            this.drawString(ctx, color, offx+120*(x%2 -1), offy+(y%2)*15, playermoves[x], "", "", size+"px monospace")
        }
    }

    drawMoveDesc(ctx, moves, active, offx, offy) {
        let str = LibMove.GetMove(moves[active]);
        let strArr = str.desc.split("_");
        this.drawString(ctx, "#990000", offx, offy-15, str.type.toUpperCase()+"-Move, Power: "+str.power, "", "", "15px monospace")
        for (let i in strArr) {
            this.drawString(ctx, "#000000", offx, offy+13*i, strArr[i] , "", "", "12px monospace");
        }
    }
}