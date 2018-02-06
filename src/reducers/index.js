import { combineReducers } from 'redux'
import { currentThrow, currentTurn, scoreBoard, players, alerts, processedImage, processingImage, playerModalVisible } from './reducers'

const rootReducer = combineReducers({
  currentThrow,
  currentTurn,
  scoreBoard,
  players,
  alerts,
  processedImage,
  processingImage,
  playerModalVisible
})

export default rootReducer
