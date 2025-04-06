import { allowedTrackPositions } from "../types"
import { Resource } from "../../centalBoard/resources"
import { navigationTileType } from "../../centalBoard/types"
import { chosenTrackEnum } from "../enums"

export interface PlayerState {
    id: string
    name: string
    color: string
    VP: number

    tiles: navigationTileType[]

    resources: Resource[]

    position: {
        exploration: allowedTrackPositions
        science: allowedTrackPositions
        military: allowedTrackPositions
        technology: allowedTrackPositions
    }
    
    init: () => void

    pushTile: (tile: navigationTileType) => void

    advanceTrack: (track: chosenTrackEnum) => void

}

export const selector = (state: PlayerState) => ({
    id: state.id,
    name: state.name,
    color: state.color,
    tiles: state.tiles,
    VP: state.VP,

    init: state.init,

    pushTile: state.pushTile,
})