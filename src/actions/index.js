export const SET_THROW = 'SET_THROW'
export const ADD_TURN = 'ADD_TURN'
export const UPDATE_CURRENT = 'UPDATE_CURRENT'
export const NEW_TURN = 'NEW_TURN'
export const UNDO_THROW = 'UNDO_THROW'
export const CLEAR_TURNS = 'CLEAR_TURNS'
export const UNDO_LAST_TURN = 'UNDO_LAST_TURN'
export const CHANGE_PLAYER_AMOUNT = 'CHANGE_PLAYER_AMOUNT'
export const ADD_ALERT = 'ADD_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
export const SET_PROCESSED_IMAGE = 'SET_PROCESSED_IMAGE'

/*
 * action creators
 */

export function setThrow(value) {
  return { type: SET_THROW, throw: value }
}

export function updateCurrent(value) {
  return { type: UPDATE_CURRENT, throw: value }
}

export function newTurn() {
  return { type: NEW_TURN }
}

export function undoThrow() {
  return { type: UNDO_THROW }
}

export function addTurn(throws) {
  return { type: ADD_TURN, throws }
}

export function clearTurns() {
  return { type: CLEAR_TURNS }
}

export function undoLastTurn() {
  return { type: UNDO_LAST_TURN }
}

export function changePlayerAmount() {
  return { type: CHANGE_PLAYER_AMOUNT }
}

export function addAlert(text, style, id) {
  return {
    type: ADD_ALERT,
    text,
    style,
    id
  }
}

export function removeAlert(id) {
  return {
    type: REMOVE_ALERT,
    id
  }
}

export function setProcessedImage(imageData) {
  return {
    type: SET_PROCESSED_IMAGE,
    imageData
  }
}
