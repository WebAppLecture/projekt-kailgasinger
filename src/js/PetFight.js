import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
import { GameTemplate } from "../../vendor/gamebox/src/js/games/GameTemplate.js";
// Import je nachdem was wir brauchen: => import { GameObject, MovableGameObject, Ball, Mode } from "../GameObject.js";

export class PetFight extends GameTemplate{

    start() {
    
    }


    static get MODES() {
        return [
            {
                NAME:"battle", 
                parameters: {
                    "mode": "battle",
                },
            },{
                NAME: "map", 
                parameters: {
                    "mode": "map",
                },
            },
        ];
    }

}


