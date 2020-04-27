import { BattleCreature } from "./BattleCreature.js";

/*
    - Starter wählen ;)
    - Lv. UP
    - Attack Energy, Types, Res&Weakness!
*/



export class LibCreature {

    static GetCreature (name, rand, type="enemy") {   // rand= 0 ^= exact values || rand >0 ^= randomized values
        rand *= Math.random();
        if (type == "enemy"){
            switch (name) {
                case "Bad Rabbit":
                    this.sprite = "bad_rabbit.png";
                    this.health = Math.round(20 + 5*rand);
                    this.energy = Math.round(20 + 5*rand);
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
                    this.x = 250;
                    this.y = 10;
                    this.height = 140;
                    this.width = 140;
                break;
                case "Flameling":
                    this.sprite = "flameling.png";
                    this.health = 25 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
                    this.x = 220;
                    this.y = 25;
                    this.height = 170;
                    this.width = 170;
                break;
                case "Ashfalom":
                    this.sprite = "ashfalom.png";
                    this.health = 50 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 15, def: 23, spatk: 22, spdef: 24};
                    this.moves = ["Fiery Breath", "Fireball", "Fiery Breath", "Fireball"];
                    this.x = 230;
                    this.y = 20;
                    this.height = 200;
                    this.width = 200;
                break;
            }
        }
        else {
            switch (name) {
                case "Flameling":
                    this.sprite = "flameling.png";
                    this.health = 25 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
                    this.x =0;
                    this.y = 300;
                    this.height = 150;
                    this.width = 175;
                break;
                case "Sealing":
                    this.sprite = "sealing.png";
                    this.health = 25 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Freeze", "Fiery Breath", "Fireball"];
                    this.x =0;
                    this.y = 300;
                    this.height = 150;
                    this.width = 175;
                break;
                case "Shadeling":
                    this.sprite = "shadeling.png";
                    this.health = 25 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
                    this.x =0;
                    this.y = 280;
                    this.height = 150;
                    this.width = 175;
                break;
                case "Rockmaul":
                    this.sprite = "rockmaul.png";
                    this.health = 25 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
                    this.x =0;
                    this.y = 300;
                    this.height = 150;
                    this.width = 175;
                break;
                case "Thunderwalker":
                    this.sprite = "thunderwalker.png";
                    this.health = 25 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
                    this.x =0;
                    this.y = 295;
                    this.height = 150;
                    this.width = 175;
                break;
                case "Zapderyx":
                    this.sprite = "zapderyx.png";
                    this.health = 25 + 10*rand;
                    this.energy = 20 + 5*rand;
                    this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                    this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
                    this.x =0;
                    this.y = 280;
                    this.height = 150;
                    this.width = 175;
                break;

            }
        }
        this.getXp = this.health+this.energy;
        /*
            this.enemy = {name: "Keili", sprite: "flameling.png"};
            this.enemystats = {health: 111, maxhealth: 125, energy:10, maxenergy:22, atk: 3, def: 3, spatk: 2, spdef: 4};
            this.enemymoves = ["Clawstrike", "Fireball", "Fiery Breath", "Fiery Breath"];
        */
        return (new BattleCreature(this.x, this.y, this.width, this.height, "color", "enemy", name, this.sprite, this.stats, this.moves, this.getXp));
    }

}