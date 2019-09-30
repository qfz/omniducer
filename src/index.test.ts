import {createOmniAction, omniReducer, createOmniSelector } from "./index"

describe(`Function: ${createOmniAction.name}`, () => {
    it("should return an action creator, that will return an action, with the isOmni meta property", () => {
        const actionCreator = createOmniAction("SomeActionType")
        const action = actionCreator()
        expect(action.meta.isOmni).toBe(true)
    })
})

describe(`Reducer: ${omniReducer.name}`, () => {
    it("should return the given state if the action is not marked omni", () => {
        const state: any = {}
        const action: any = {
            type: "SomeAction"
        }

        const nextState = omniReducer(state, action)
        expect(nextState).toBe(state)
    })

    it(
        `should return an state with a new property named after the action type, 
         and whose value is the action payload, if the action is marked omni`,
        () => {
            const state: any = {}
            const actionType = "SomeAction"
            const payload = {
                someData: "someData"
            }
            const action: any = {
                type: actionType,
                payload,
                meta: {
                    isOmni: true
                }
            }

            const nextState = omniReducer(state, action)

            expect(nextState).toHaveProperty(actionType)
            expect(nextState[actionType]).toBe(payload)
        })
})

describe(`Function: ${createOmniSelector.name}`, () => {
    test("its returned funciton should return the payload stored aginst the key named after the action type", () => {
        const actionType = "SomeAction"
        const payload = {
            someData: "someData"
        }
        const selector = createOmniSelector(actionType)

        const state: any = {
            omni: {
                [actionType]: payload
            }
        }

        const selectedState = selector(state)

        expect(selectedState).toBe(payload)
    })
})