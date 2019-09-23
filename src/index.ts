import {createAction, Action} from "redux-actions"

const prefix = "Omni/"

export const makeAction: (...args: Parameters<typeof createAction>) => ReturnType<typeof createAction> = (type, ...rest) => {
  return createAction(`${prefix}${type}`, ...rest)
}

export const makeSelector = <AppState extends {[i: string]: any}>(actionCreator: typeof makeAction) => (appState: AppState) => {
  return appState[actionCreator.toString()]
}

export const omniducer = <State, Payload>(state: State, action: Action<Payload>): State => {
  if (action.type.startsWith(prefix)) {
    return {
      ...state,
      [action.type]: action.payload
    }
  } else {
    return state
  }
}
