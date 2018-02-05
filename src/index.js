import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import uuid from 'uuid/v4'

import App from './components/app'
import Scorecard from './components/scorecard'
import ScoreBoard from './components/scoreboard'
import HelpPage from './components/helppage'
import rootReducer from './reducers'
import { ADD_ALERT } from './actions'

let gameId = localStorage.getItem('sika-gameid')

if (gameId === null) {
  gameId = uuid()
  localStorage.setItem('sika-gameid', gameId)
} 

const reducer = storage.reducer(rootReducer)
const engine = createEngine('sikascore')
const middleware = storage.createMiddleware(engine, [ADD_ALERT])
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

const load = storage.createLoader(engine)
load(store).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/app" component={App}>
          <IndexRoute component={Scorecard} />
          <Route path="/app/scorecard" component={Scorecard} />
          <Route path="/app/scoreboard" component={ScoreBoard} />
          <Route path="/app/help" component={HelpPage} />
        </Route>
      </Router>
    </Provider>,
    document.querySelector('.main')
  )
})
