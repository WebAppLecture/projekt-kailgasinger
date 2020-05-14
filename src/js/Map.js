import {MapObject, Player, Tree, Mountain, Water} from "../../src/js/Mapobjects.js";     // <- WIP
import {LibMap} from "../../src/js/LibMaps.js";
export class Map {
    constructor(playerPosx, playerPosy, currentMapx, currentMapy){
        this.playerPosx = playerPosx;
        this.playerPosy = playerPosy;
        this.currentMapx = currentMapx; // Position der aktuellen Map im Map Array allMaps
        this.currentMapy = currentMapy;
    }
    // startMiniMap(){
    //     this.size = 2;

    // }

    start() {
        this.size = 20; 
        this.maplengthx = 19;
        this.maplengthy = 24;
       
        this.colors = {nextMap:"#20860D", mountain:"#180b1d", tree:"#02402f", fight:"#601815", water:"#0E69FB", healer:"#FFFFFF"};
        if (!this.currentMapx){
            this.currentMapx = 0;
        }
        if (!this.currentMapy){
            this.currentMapy = 0;
        }
        //Array für die Maps erstellen
        let iMax = 5;
        let jMax = 3;
        this.allMaps = [];

        let count = 1;
        for (let i=0; i<iMax; i++) {
            this.allMaps[i] = [];
            for (let j=0; j<jMax; j++) {
                this.allMaps[i][j] = LibMap.GetMap(i,j);
                count++;
            }
        }       

        // Entity Test ab hier:
        this.entities = [];
        // Auslesen der MapEntities 
        for (let i=0; i<=this.maplengthx; i++){
            this.entities[i] = [];
            for (let j=0; j<=this.maplengthy; j++){
                this.entities[i][j] = {content: undefined};
                switch(this.allMaps[this.currentMapx][this.currentMapy][i].charAt(j)){
                    case "T": this.entities[i][j].content = new Tree (this.colors["tree"], "tree", "");
                    break;
                    case "U": this.entities[i][j].content = new Water (this.colors["water"], "water", "");
                    break;
                    case "M": this.entities[i][j].content = new Mountain (this.colors["mountain"], "mountain", "");
                    break;
                    case "E": this.entities[i][j].content = ( new MapObject(this.colors["fight"], "fight", "Bad Rabbit"));
                    break;
                    case "D": this.entities[i][j].content = ( new MapObject(this.colors["fight"], "fight", "Flameling"));
                    break;
                    case "O": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "east", "Osten"));
                    break;
                    case "W": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "west", "Westen"));
                    break;
                    case "S": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "south", "Süden"));
                    break;
                    case "N": this.entities[i][j].content = ( new MapObject(this.colors["nextMap"], "north", "Norden"));
                    break;
                    case "H": this.entities[i][j].content = ( new MapObject(this.colors["healer"], "healer", "Heiler"));
                    break;
                }
            }
        }

        if(!this.playerPosx && !this.playerPosx){   // Default Player Position, if not set
            this.playerPosx = 12;
            this.playerPosy = 10;
        }

        this.player = new Player(this.playerPosx, this.playerPosy, this.size, this.size, "#180b1d", 10);
        this.entities[this.playerPosx][this.playerPosy].content = this.player;
    }


    playerMove(di, dj) {    // Player moves on grid (1 move per hit)
        let newPlayeri = this.player.i + di,
            newPlayerj = this.player.j + dj,
            targetField = this.entities[newPlayeri][newPlayerj].content;

        if(!targetField){
            this.entities[this.player.i][this.player.j].content = undefined;
            this.entities[newPlayeri][newPlayerj].content = this.player;
            this.player.move(di, dj);
        } 
        else {  // Colision with MapObject
            let mapUpdate = [];
            switch(targetField.type){
                case "fight": {
                    mapUpdate[0] = "startBattle";
                    mapUpdate[1] = this.entities[newPlayeri][newPlayerj].content.name;
                    this.entities[newPlayeri][newPlayerj].content = null;
                    //this.allMaps[this.currentMapx][this.currentMapy][newPlayeri][newPlayerj]="_"; // WIP, hier wurde versucht einen Encounter komplett zu Löschen.
                    return mapUpdate;
                }
                case "east": {
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = 1;
                    mapUpdate[2] = newPlayerj;
                    mapUpdate[3] = this.currentMapx+1;
                    mapUpdate[4] = this.currentMapy;
                    return mapUpdate;
                }
                case "west": {
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = 18;
                    mapUpdate[2] = newPlayerj;
                    mapUpdate[3] = this.currentMapx-1;
                    mapUpdate[4] = this.currentMapy;
                    return mapUpdate;

                }
                case "north": {
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = newPlayeri;
                    mapUpdate[2] = 22;
                    mapUpdate[3] = this.currentMapx;
                    mapUpdate[4] = this.currentMapy-1;
                    return mapUpdate;

                }
                case "south": {
                    mapUpdate[0] = "nextMap";
                    mapUpdate[1] = newPlayeri;
                    mapUpdate[2] = 1;
                    mapUpdate[3] = this.currentMapx;
                    mapUpdate[4] = this.currentMapy+1;
                    return mapUpdate;

                }
                case "healer": {
                    mapUpdate[0] = "healer";
                    return mapUpdate;
                }
            }
        }
        return false;
    }

    draw(ctx){
        this.player.draw(ctx);
        this.drawEntities(ctx);
        // this.drawText(ctx);
    }

    // drawMiniMap(ctx){
    //     this.player.draw(ctx);
    //     this.drawEntitiesMiniMap(ctx);
    // }

    // drawEntitiesMiniMap(ctx) {
    //     for (let i in this.entities) {
    //         for (let j in this.entities[i]){ 
    //             if (this.entities[i][j].content) {         
    //                 this.entities[i][j].content.draw(ctx, i, j, this.miniMapSize);
    //             }
    //         }
    //     }
    // }

    drawEntities(ctx) {
        for (let i in this.entities) {
            for (let j in this.entities[i]){ 
                if (this.entities[i][j].content) {         
                    this.entities[i][j].content.draw(ctx, i, j, this.size);
                }
            }
        }
    }

    update() {  // WIP
        let mapUpdate = [];
        for (let i in this.entities){
            for (let j in this.entities[i]) {
                //hier dann mal Update für Gegnerbewegung

            }
        }
    }

}