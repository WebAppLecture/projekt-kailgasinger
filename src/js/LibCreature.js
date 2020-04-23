import { BattleCreature } from "./BattleCreature.js";

export class LibCreature {

    static GetCreature (name, rand) {   // rand= 0 ^= exact values || rand >0 ^= randomized values
        rand *= Math.random();
        switch (name) {
            case "Bad Rabbit":
                this.sprite = "bad_rabbit.png";
                this.health = Math.round(20 + 5*rand);
                this.energy = Math.round(20 + 5*rand);
                this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
            break;
            case "Flameling":
                this.sprite = "flameling.png";
                this.health = 25 + 10*rand;
                this.energy = 20 + 5*rand;
                this.stats = {health: this.health, maxhealth: this.health, energy: this.energy, maxenergy: this.energy, atk: 3, def: 3, spatk: 2, spdef: 4};
                this.moves = ["Clawstrike", "Fireball", "Fiery Breath", "Fireball"];
            break;
        }
        this.getXp = this.health+this.energy;
        /*
            this.enemy = {name: "Keili", sprite: "flameling.png"};
            this.enemystats = {health: 111, maxhealth: 125, energy:10, maxenergy:22, atk: 3, def: 3, spatk: 2, spdef: 4};
            this.enemymoves = ["Clawstrike", "Fireball", "Fiery Breath", "Fiery Breath"];
        */
        return (new BattleCreature(250,10, 150, 150, "color", "enemy", name, this.sprite, this.stats, this.moves, this.getXp));
    }

}