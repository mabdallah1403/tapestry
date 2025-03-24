import { title } from "process"
import { selector as centralBoardSelector } from "./state"
import { useCentralBoardStore } from "./state/store"
import { selector as playerSelector } from "../player/state"

import { useShallow } from "zustand/shallow"
import { useParams } from "react-router-dom"
import { usePlayerStore } from "../player/state/store"

export function CentralBoard() {
    const { tiles, popTile } =  useCentralBoardStore(useShallow(centralBoardSelector))
    const { pushTile } = usePlayerStore(useShallow(playerSelector))

    return (
        <>
        </>
    )
}