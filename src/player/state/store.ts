import { PlayerState } from ".";
import { ResourceLabel } from "../../centalBoard/enums";
import { Resource } from "../../centalBoard/resources";
import { baseState } from "../../state/store";
import { chosenTrackEnum, explorationTrackOutputEnum } from "../enums";

// third party
import { create } from "zustand"

export const usePlayerStore = create<PlayerState>((set, get) => {
    return {
        id: "", 
        name: "",
        color: "",
        VP: 0,

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
        

        advanceTrack: (track) => {
            const state = get();
            if (track === chosenTrackEnum.EXPLORATION_TRACK_CHOSEN) {
                switch (state.position.exploration){
                    case 0:
                        return [explorationTrackOutputEnum.NAVIGATION_TILE, explorationTrackOutputEnum.NAVIGATION_TILE];
                    case 1:
                        return [explorationTrackOutputEnum.PLACE_NAV_TILE, explorationTrackOutputEnum.TAPESTRY_CARD];
                    case 2:
                        return [explorationTrackOutputEnum.PLACE_NAV_TILE_OR_BROWN_HOUSE]
                    case 3:
                        return [explorationTrackOutputEnum.NAVIGATION_TILE, explorationTrackOutputEnum.PLACE_NAV_TILE];
                    case 4:
                        return [explorationTrackOutputEnum.VP_FROM_CONQUER, explorationTrackOutputEnum.BROWN_HOUSE];
                    case 5:
                        return [explorationTrackOutputEnum.NAVIGATION_TILE, explorationTrackOutputEnum.BROWN_HOUSE];
                    case 6:
                        return [explorationTrackOutputEnum.NAVIGATION_TILE, explorationTrackOutputEnum.NAVIGATION_TILE, explorationTrackOutputEnum.PLACE_NAV_TILE];
                    case 7:
                        return [explorationTrackOutputEnum.NAVIGATION_TILE, explorationTrackOutputEnum.NAVIGATION_TILE, explorationTrackOutputEnum.PLACE_NAV_TILE];
                } // finish

            }
            if (track === chosenTrackEnum.SCIENCE_TRACK_CHOSEN) { // finish
                state.position.science += 1;
            }
            if (track === chosenTrackEnum.MILITARY_TRACK_CHOSEN) { // finish
                state.position.military += 1;
            }
            if (track === chosenTrackEnum.TECHNOLOGY_TRACK_CHOSEN) { // finish
                state.position.technology += 1;
            }
        }
        
    }}
)