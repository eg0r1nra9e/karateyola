import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICurrentDuel } from '../../types/ICurrentDuel'
import { IDuel } from '../../types/IDuel'
import { TAppState } from '../store'
import { v4 as uuidv4 } from 'uuid'


interface ICurrentDuelState {
    duel: ICurrentDuel
}

const initialState: ICurrentDuelState = {
    duel: {},
}

const getCurrentDuel = (currentDuel: ICurrentDuel[]): ICurrentDuel[] => {
    const currentDuel = [...currentDuel]

    currentDuel?.forEach((currentDuel) => {
        currentDuel?.player?.forEach((player) => {
            if (!player) {
                return
            }

            const duels = chunk(shuffle(uniq(category?.athletes)), 2)

            player.standings = duels.map((duel) => ({
                id: uuidv4(),
                athletesId: player,
            }))
        })
    })

    return currentDuel
}

export const duelSlice = createSlice({
    name: 'duels',
    initialState,
    reducers: {
        addDuel: (state, action: PayloadAction<IDuel>) => {
            const duel = { ...action.payload, id: uuidv4(), duel: getDuel(action.payload.duel) }
            state.duel = [...state.duel, duel]
        },
        editDuel: (state, action: PayloadAction<IDuel>) => {
            const duel = state.duels.find((duel) => duel.id === action.payload.id)
            duel.name = action.payload.name
            duel.athletesId = action.payload.athletesId
     )
    }

  },
})

export const { addDuel, removeDuel, editDuel, startDuel, endDuel } = duelsSlice.actions

export const selectDuels = (state: TAppState) => state.duels.duels
export const selectDuel = (state: TAppState, duelId: string) => state.duels.duels.find((duel) => duel.id === duelId)

export default DuelsSlice.reducer
