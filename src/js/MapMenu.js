
import { BasicDrawer } from "../../src/js/BasicDrawer.js";

export class MapMenu extends BasicDrawer{
    constructor() {
        super();
        this.MenuPoints = ["Pet Status", "Minimap", "drei", "back to map"];
        this.MenuPoints.active = 0;
    }
    start(){
        console.log("jetzt im Menu");
    }
    selectMenuObject(bool){
        let mapUpdate = [];
        if (bool == null) {
            return null;
        }
        switch(this.MenuPoints[this.MenuPoints.active]){
            case "back to map":  {
                mapUpdate[0] = "map";
                return mapUpdate;
            }
            case "Pet Status": {
                mapUpdate[0] = "details";
                return mapUpdate;
            }
            case "Minimap": {
                mapUpdate[0] = "miniMap";
                return mapUpdate;
            }
        }

    }

    navMenu(bool, value, mode) {
        if (mode == "MapMenu") {
            this.MenuPoints.active += value*bool+4;    // Für %-Navigation: Brilliant oder was?
            this.MenuPoints.active %=4;    //Nach letztem Move von vorn :)
        }
    }
    drawMapMenu(ctx) {
        this.drawBox(ctx, "rgba(87, 101, 116, 0.85)",0 , 440, 400, 480);    // Moves Box
        for (let x in this.MenuPoints) {
            let color = "#000000";
            if (this.MenuPoints.active == x) {
                color = "#49D615"
            }
            let y = Math.round(x/2-0.1);
            this.drawString(ctx, color, 125+120*(x%2 -1), 455+(y%2)*15, this.MenuPoints[x])
        }
    }
    draw(ctx){
        this.drawBox(ctx);
        this.drawMapMenu(ctx);        
    }
}

