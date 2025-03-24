import { allowedTrackPositions } from "../types"
import { Resource } from "../../centalBoard/resources"
import { navigationTileType } from "../../centalBoard/types"

export interface PlayerState {
    id: string
    name: string
    color: string

    tiles: navigationTileType[]

    resources: Resource[]

    position: {
        exploration: allowedTrackPositions
        // TODO: mahdi add rest
        
    }
    
    init: () => void

    pushTile: (tile: navigationTileType) => void

    // Mahdi advanceTrack: (type: "exploration" | ...) => void
}

export const selector = (state: PlayerState) => ({
    id: state.id,
    name: state.name,
    color: state.color,
    tiles: state.tiles,

    init: state.init,

    pushTile: state.pushTile,
})