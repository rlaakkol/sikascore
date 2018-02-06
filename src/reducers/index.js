import { combineReducers } from 'redux'
import { currentThrow, currentTurn, scoreBoard, playerAmount, alerts, processedImage, processingImage } from './reducers'

const rootReducer = combineReducers({
  currentThrow,
  currentTurn,
  scoreBoard,
  players: playerAmount,
  alerts,
  processedImage,
  processingImage
})

export default rootReducer
