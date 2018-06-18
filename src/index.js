import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css';
import './styles/css/index.css'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers/game.reducer'

let store = createStore(rootReducer, {}, applyMiddleware(createLogger(), thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
