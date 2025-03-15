import { Player } from "../../util/player";
import { Resource, ResourceLabel } from "../../util/resources";

export class NavigationTile {
    resource: Resource;
    constructor(resource: Resource) {
        this.resource = resource;
    }
}

export class NavigationTiles {
    private tiles: NavigationTile[] = [];

    constructor() {
        const temporaryTiles: NavigationTile[] = [];
        temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.COINS)));
        temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.WORKERS)));
        temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.FOOD)));
        temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.CULTURE)));
        Math.random() < 0.5 ? this.tiles = temporaryTiles : this.tiles = temporaryTiles.reverse();
    }

    public playerTakesTile(player: Player): void {
        const tile = this.tiles.pop();
        if (tile) {
            player.addNavigationTile(tile);
        }
        else {
            const temporaryTiles: NavigationTile[] = [];
            temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.COINS)));
            temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.WORKERS)));
            temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.FOOD)));
            temporaryTiles.push(new NavigationTile(new Resource(ResourceLabel.CULTURE)));
            Math.random() < 0.5 ? this.tiles = temporaryTiles : this.tiles = temporaryTiles.reverse();
        }
    }
    
} 