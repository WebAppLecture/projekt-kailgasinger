
import { GameObject, MovableGameObject, Ball, Mode } from "../../vendor/gamebox/src/js/GameObject.js";

export class SpriteObject extends GameObject {

    constructor(x, y, width, height, color, sprite="none") {
        super(x, y, width, height, color)
        this.sprite = sprite;
    }

    draw(ctx) {
        if (this.sprite == "none") {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
        else {
            let image = new Image();
            image.src = "../../src/images/"+this.sprite;
            ctx.drawImage(image, this.x, this.y, this.width, this.height)
        }
    }

}

export class MovableSpriteObject extends MovableGameObject {

    constructor(x, y, width, height, color, vx, vy, sprite="none") {
        super(x, y, width, height, color, vx, vy)
        this.sprite = sprite;
    }

    draw(ctx) {
        if (this.sprite == "none") {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
        else {
            let image = new Image();
            image.src = "../../src/images/"+this.sprite;
            ctx.drawImage(image, this.x, this.y, this.width, this.height)
        }
    }

}