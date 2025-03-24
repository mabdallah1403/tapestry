// custom imports
import { BaseState } from "../../state"
import { navigationTileType } from "../types"

// third party

export interface CentralBoardState extends BaseState {
    // players: string[] // TODO: handle multiplier by storing playing ids
    tiles: navigationTileType[]

    init: () => void

    popTile: () => void
}

export const selector = (state: CentralBoardState) => ({
    tiles: state.tiles,

    init: state.init,

    popTile: state.popTile,
})