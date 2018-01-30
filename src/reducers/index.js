import { combineReducers } from 'redux'
import { currentThrow, currentTurn, scoreBoard, playerAmount, alerts, processedImage } from './reducers'

const rootReducer = combineReducers({
  currentThrow,
  currentTurn,
  scoreBoard,
  players: playerAmount,
  alerts,
  processedImage
})

export default rootReducer
