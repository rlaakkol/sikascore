import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/app'
import Scorecard from './components/scorecard'
import ScoreBoard from './components/scoreboard'
import HelpPage from './components/helppage'
import rootReducer from './reducers'
import { ADD_ALERT } from './actions'

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
        <Route path="/" component={App}>
          <IndexRoute component={Scorecard} />
          <Route path="/scorecard" component={Scorecard} />
          <Route path="/scoreboard" component={ScoreBoard} />
          <Route path="/help" component={HelpPage} />
        </Route>
      </Router>
    </Provider>,
    document.querySelector('.main')
  )
})
