import { createStore } from 'redux'
import { rootReducer } from './reducers/game.reducer'

export default (initialState) => createStore(rootReducer, initialState)