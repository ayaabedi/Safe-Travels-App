import { createStore, combineReducers } from 'redux'
import { flights } from "./reducers/flights.reducer"

const rootReducer = combineReducers ({
    flights,
    
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;