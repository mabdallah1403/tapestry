import { allowedTrackPositions } from "../track_interface";
enum explorationTrackOutput {
    NAVIGATION_TILE = "NAVIGATION_TILE",
    PLACE_NAV_TILE = "PLACE_NAV_TILE",
    BROWN_HOUSE = "BROWN_HOUSE",
    TAPESTRY_CARD = "TAPESTRY_CARD",
    VP_FROM_CONQUER = "VP_FROM_CONQUER",
    VP_FROM_BROWN_HOUSE = "VP_FROM_BROWN_HOUSE",
    FIVE_VP = "FIVE_VP",
    VP_FROM_TECH_TRACK = "VP_FROM_TECH_TRACK",
    SPACE_TILE = "SPACE_TILE",
    PLACE_SPACE_TILE = "PLACE_SPACE_TILE",
    PLACE_NAV_TILE_OR_BROWN_HOUSE = "PLACE_NAV_TILE_OR_BROWN_HOUSE",
}
class ExplorationTrack {
    invoke(currentPosition: allowedTrackPositions): explorationTrackOutput[] {
        switch (currentPosition){
            case 0:
                return [explorationTrackOutput.NAVIGATION_TILE, explorationTrackOutput.NAVIGATION_TILE];
            case 1:
                return [explorationTrackOutput.PLACE_NAV_TILE, explorationTrackOutput.TAPESTRY_CARD];
            case 2:
                return [explorationTrackOutput.PLACE_NAV_TILE_OR_BROWN_HOUSE]
            case 3:
                return [explorationTrackOutput.NAVIGATION_TILE, explorationTrackOutput.PLACE_NAV_TILE];
            case 4:
                return [explorationTrackOutput.VP_FROM_CONQUER, explorationTrackOutput.BROWN_HOUSE];
            case 5:
                return [explorationTrackOutput.NAVIGATION_TILE, explorationTrackOutput.BROWN_HOUSE];
            case 6:
                return [explorationTrackOutput.NAVIGATION_TILE, explorationTrackOutput.NAVIGATION_TILE, explorationTrackOutput.PLACE_NAV_TILE];
            case 7:
                return [explorationTrackOutput.NAVIGATION_TILE, explorationTrackOutput.NAVIGATION_TILE, explorationTrackOutput.PLACE_NAV_TILE];
            case 8:
                return []
            case 9:
                // Do something
                break;
            case 10:
                // Do something
                break;
            case 11:
                // Do something
                break;
            case 12:
                // Do something
                break;
        }
    }
}