import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './styles/css/index.css'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers/game.reducer'

let store = createStore(rootReducer, {}, applyMiddleware(createLogger()))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))

registerServiceWorker()
