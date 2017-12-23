import { combineReducers } from 'redux'
import { currentThrow, currentTurn, scoreBoard, playerAmount, alerts } from './reducers'

const rootReducer = combineReducers({
  currentThrow,
  currentTurn,
  scoreBoard,
  players: playerAmount,
  alerts
})

export default rootReducer
