import { PlayerState } from ".";
import { ResourceLabel } from "../../centalBoard/enums";
import { Resource } from "../../centalBoard/resources";
import { baseState } from "../../state/store";

// third party
import { create } from "zustand"
import { explorationTrackOutput } from "../enums";

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
            science: 0,
            military: 0,
            technology: 0,
        },

        init: () => {
            const state = get();
        },

        pushTile: (tile) => {
            const state = get();
            state.tiles.push(tile);
        },

        advanceTrack: (type) => {
            const state = get();
            if (type === explorationTrackOutput) {
                state.position.exploration += 1;
            } else if (type === "science") {
                state.position.science += 1;
            } else if (type === "military") {
                state.position.military += 1;
            } else if (type === "technology") {
                state.position.technology
            }
        }
    }}
)