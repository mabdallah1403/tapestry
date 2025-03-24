import { CentralBoardState } from ".";
import { ResourceLabel } from "../enums";
import { baseState } from "../../state/store";

// third party
import { create } from "zustand"

export const useCentralBoardStore = create<CentralBoardState>((set, get) => {
    const base = baseState<CentralBoardState>(set, get)
    
    return {
        ...base,
        tiles: [
            {resource: ResourceLabel.FOOD},
            {resource: ResourceLabel.COINS},
            {resource: ResourceLabel.WORKERS},
            {resource: ResourceLabel.CULTURE},
        ],

        init: () => {
            const state = get();
            state.tiles = Math.random() < 0.5 ? state.tiles : state.tiles.reverse();
        },

        popTile: () => {
            const state = get();
            state.tiles.pop();
        },
    }}
)