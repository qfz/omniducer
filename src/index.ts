import {ActionMeta, createAction} from "redux-actions"
import {createSelector, Selector} from "reselect"

export interface OmniState {
    [index: string]: any;
}

interface OmniSlice {
  omni: OmniState
}

export interface IsOmni {
    isOmni: boolean;
}

export type OmniAction<Payload> = ActionMeta<Payload, IsOmni>

export function createOmniAction<Payload = undefined>(
    actionType: string,
    payloadCreator: (...params: any[]) => any = (p) => p,
    metaCreator: Function = () => ({})
) {
    const omniMetaCreator = (...params: any[]) => {
        const payloadMeta = metaCreator(...params)
        return {
            ...payloadMeta,
            isOmni: true
        }
    }

    return createAction<Payload, IsOmni>(actionType, payloadCreator, omniMetaCreator)
}

export function omniReducer<Payload>(state: OmniState = {}, action: OmniAction<Payload>) {
    if (action.meta && action.meta.isOmni) {
        return {
            ...state,
            [action.type]: action.payload
        }
    } else {
        return state
    }
}

const omniSelector: Selector<OmniSlice, OmniState> = (state) => state.omni

export function createOmniSelector<ReturnType = undefined>(actionType: string, defaultValue?: ReturnType) {
    return createSelector<OmniSlice, OmniState, ReturnType | undefined>(
        omniSelector,
        omniState => {
            const selectedState = omniState[actionType]
            if (selectedState === undefined) {
                return defaultValue
            } else {
                return selectedState
            }
        }
    )
}

export const omniReducerSlice = {
  omni: omniReducer
}