export class BattleCreature {

    constructor(x, y, width, height, type, sprite="none") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    }

    draw(ctx) {
        if (this.sprite == "none") {
            switch (this.type) {
                case "player":
                    ctx.fillStyle = "#10C47D"
                    ctx.beginPath();
                    ctx.moveTo(10, 480);
                    ctx.lineTo(110,420);
                    ctx.lineTo(120,405);
                    ctx.lineTo(20, 300);
                    ctx.closePath(200, 99);
                    ctx.fill();
                break;
                case "enemy":
                    ctx.fillStyle = "#D62F15"
                    ctx.beginPath();
                    ctx.moveTo(290, 80);
                    ctx.lineTo(330,3);
                    ctx.lineTo(420,3);
                    ctx.lineTo(450, 58);
                    ctx.lineTo(310, 100);
                    ctx.closePath(390, 99);
                    ctx.fill();
                break;
            }
        }
        else {
            switch (this.type) {
                case "player":
                    
                break;
                case "enemy":
                    //ctx.scale(-1, 1);
                break;
            }
            let image = new Image();
            image.src = "../../src/images/creatures/"+this.sprite;
            ctx.drawImage(image, this.x, this.y, this.width, this.height);
        }
    }

}