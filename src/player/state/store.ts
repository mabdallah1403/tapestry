import { PlayerState } from ".";
import { ResourceLabel } from "../../centalBoard/enums";
import { Resource } from "../../centalBoard/resources";
import { baseState } from "../../state/store";

// third party
import { create } from "zustand"

export const usePlayerStore = create<PlayerState>((set, get) => {
    return {
        id: "", 
        name: "",
        color: "",

        tiles: [],
        resources: [
            new Resource(ResourceLabel.FOOD),
            new Resource(ResourceLabel.COINS),
            new Resource(ResourceLabel.CULTURE),
            new Resource(ResourceLabel.WORKERS)
        ],

        position: {
            exploration: 0,
        }, // Mahdi implement

        init: () => {
            const state = get();
        },

        pushTile: (tile) => {
            const state = get();
            state.tiles.push(tile);
        }

        // TODO: mahdi implement
    }}
)