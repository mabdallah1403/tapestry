import { NavigationTile } from "../central_board/resources_acquired_from_board/navigation_tiles";
import { Resource, ResourceLabel } from "../resources";

export enum PlayerColor {
    RED = "Red",
    BLUE = "Blue",
    GREEN = "Green",
    YELLOW = "Yellow",
}

export class Player {
    private readonly resources: Resource[] = [];
    private victoryPoints: number = 0;
    private readonly color: PlayerColor;
    private readonly username: string;
    private readonly navigationTiles: NavigationTile[] = [];

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

    public incrementResource(resourceLabel: ResourceLabel, amountAdded: number): void {
        const resource = this.resources.find((r) => r.getLabel() === resourceLabel);
        if (resource) {
            resource.increaseValue(amountAdded);
        }
    }

    public decrementResource(resourceLabel: ResourceLabel, amountLost: number): void {
        const resource = this.resources.find((r) => r.getLabel() === resourceLabel);
        if (resource) {
            resource.decreaseValue(amountLost);
        }
    }

    public getVP(): number {
        return this.victoryPoints;
    }

    public getColor(): PlayerColor {
        return this.color;
    }

    public getUsername(): string {
        return this.username;
    }

    public addNavigationTile(NavigationTile: NavigationTile): void {
        this.navigationTiles.push(NavigationTile);
    }

}