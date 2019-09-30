# Omniducer

Redux is fairly low level library and is thus verbose. There are libraries such as [redux-actions](https://github.com/redux-utilities/redux-actions) that can help reduce boilerplate code, this library is one of them. It helps reduce/eliminate the need to write selectors and reducers.

## Installation
```
$ npm install --save omniducer
```
or
```
$ yarn add omniducer
```

## Usage
```Javascript
import {combineReducers} from "redux"
import {omniducerSlice} from "omniducer"

const rootReducer = combineReducers({
    ...omniducerSlice
})

// Use rootReducer above to create the store and connect it to react
```

```Javascript
import {createOmniAction, createOmniSelector} from "omniducer"
import {useDispatch, useSelector} from "react-redux"

const actionType = "SET_DATA"

const setData = createOmniAction(actionType)
const getData = createOmniSelector(actionType, "defaultValue")

const CompA = () => {
    const dispatch = useDispatch()
    const data = useSelector(getData)

    return (
        <div>
            <h1>CompA</h1>
            <p>{data}</p>
            <button onClick={() => {dispatch(setData("new data"))}}>
                Set Data
            </button>
        </div>
    )
}
```
