import {
  SET_THROW,
  UPDATE_CURRENT,
  UNDO_THROW,
  ADD_TURN,
  CLEAR_TURNS,
  UNDO_LAST_TURN,
  ADD_ALERT,
  REMOVE_ALERT,
  CHANGE_PLAYER_AMOUNT
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

const playerAmount = (state = 4, action) => {
  switch (action.type) {
    case CHANGE_PLAYER_AMOUNT:
      return action.amount
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

export { currentThrow, currentTurn, scoreBoard, playerAmount, alerts }
