import { NavigationTile } from "../central_board/resources_acquired_from_board/navigation_tiles";
import { Resource, ResourceLabel } from "./resources";

export enum PlayerColor {
    RED = "Red",
    BLUE = "Blue",
    GREEN = "Green",
    YELLOW = "Yellow",
}

export class Player {
    resources: Resource[] = [];
    victoryPoints: number = 0;
    color: PlayerColor;
    username: string;
    navigationTiles: NavigationTile[] = [];
    constructor(color: PlayerColor, username: string) {
        this.resources.push(new Resource(ResourceLabel.COINS));
        this.resources.push(new Resource(ResourceLabel.WORKERS));
        this.resources.push(new Resource(ResourceLabel.FOOD));
        this.resources.push(new Resource(ResourceLabel.CULTURE));
        this.color = color;
        this.username = username;
    }
    public increaseVP(amountAdded: number): void {
        this.victoryPoints += amountAdded;
    }
    public decreaseVP(amountLost: number): void {     
        this.victoryPoints -= amountLost;
    }
    public addNavigationTile(NavigationTile: NavigationTile): void {
        this.navigationTiles.push(NavigationTile);
    }
}