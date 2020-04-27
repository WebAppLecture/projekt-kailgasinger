

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
}