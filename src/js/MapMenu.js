//import {Menu} from "../../vendor/gamebox/src/js/Menu.js";
import { BasicDrawer } from "../../src/js/BasicDrawer.js";

export class MapMenu extends BasicDrawer{
    constructor() {
        super();
        this.MenuPoints = ["eins", "zwei", "drei", "back to map"];
        this.MenuPoints.active = 0;
    }
    start(){
        console.log("jetzt im Menu");
    }
    selectMenuObject(){
        let mapUpdate = [];
        //console.log(this.MenuPoints[this.MenuPoints.active])
        //console.log("MapUpdates im MapMenu: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3]);
        switch(this.MenuPoints[this.MenuPoints.active]){
            case "back to map":  {
                console.log("jetzt case")
                mapUpdate[0] = "map";
                // mapUpdate[1] = 12;//newPlayeri;
                // mapUpdate[2] = 12;//newPlayerj;
                // mapUpdate[3] = 0;//this.currentMapx;
                // mapUpdate[4] = 0;//this.currentMapy;
                console.log("MapUpdates im Case: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3] + " [5], " + mapUpdate[4]);
                return mapUpdate;
            }
        }

    }

    // openMapMenu(){
    //     let mapUpdate = [];
    //     this.Map.openMenu();
    //     console.log("MapUpdates im Mapmenu: [1], " + mapUpdate[0] + " [2], " + mapUpdate[1] + " [3], "+ mapUpdate[2] + " [4], " + mapUpdate[3] + " [5], " + mapUpdate[4]);
                
    // }

    navMenu(bool, value, mode) {
        //console.log("Modus:"+mode);
        if (mode == "MapMenu") {
            this.MenuPoints.active += value*bool+4;    // Für %-Navigation: Brilliant oder was?
            this.MenuPoints.active %=4;    //Nach letztem Move von vorn :)
            //console.log(this.MenuPoints.active);
        }
    }
    drawMapMenu(ctx) {
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

