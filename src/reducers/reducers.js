import {
  SET_THROW,
  UPDATE_CURRENT,
  NEW_TURN,
  UNDO_THROW,
  ADD_TURN,
  CLEAR_TURNS,
  UNDO_LAST_TURN,
  ADD_ALERT,
  REMOVE_ALERT,
  CHANGE_PLAYERS,
  SET_PROCESSED_IMAGE,
  SET_PROCESSING,
  SHOW_PLAYER_MODAL
} from '../actions'

const currentThrow = (state = [null, null], action) => {
  switch (action.type) {
    case SET_THROW:
      return action.throw
    default:
      return state
  }
}

const currentTurn = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CURRENT:
      return [...state, action.throw]
    case NEW_TURN:
      return []
    case UNDO_THROW:
      return state.slice(0, -1)
    default:
      return state
  }
}

const scoreBoard = (state = [], action) => {
  switch (action.type) {
    case ADD_TURN:
      return [...state, action.throws]
    case CLEAR_TURNS:
      return []
    case UNDO_LAST_TURN:
      return state.slice(0, -1)
    default:
      return state
  }
}

const defaultPlayers = ['1', '2', '3', '4']
const players = (state = defaultPlayers, action) => {
  switch (action.type) {
    case CHANGE_PLAYERS:
      return action.list
    default:
      return state
  }
}

const alerts = (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...state,
        {
          text: action.text,
          style: action.style,
          id: action.id
        }
      ]
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.id)
    default:
      return state
  }
}

const processedImage = (state = null, action) => {
  switch (action.type) {
    case SET_PROCESSED_IMAGE:
      return action.image
    default:
      return state
  }
}

const processingImage = (state = false, action) => {
  switch (action.type) {
    case SET_PROCESSING:
      return action.isProcessing
    default:
      return state
  }
}

const playerModalVisible = (state = false, action) => {
  switch (action.type) {
    case SHOW_PLAYER_MODAL:
      return action.show
    default:
      return state
  }
}

export { currentThrow, currentTurn, scoreBoard, players, alerts, processedImage, processingImage, playerModalVisible }
