import uuid from 'uuid/v4'

import Pig from './pig'

const PREDICT_URI = '/api/predict'
const SCORES_URI = '/api/submit_scores'

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type:mime})
}

const resetGameId = () => {
  const id = uuid()
  localStorage.setItem('sika-gameid', id)
  return id
}

const unsetGameId = () =>
  localStorage.setItem('sika-gameid', null)

const currentGameId = () => {
  const id = localStorage.getItem('sika-gameid')
  if (id === null) return resetGameId()
  return id
}

const gameIdIsSet = () =>
  localStorage.getItem('sika-gameid') !== null

const mapToPosition = (pig) => {
  switch (pig) {
    case 'side':
      return Pig.Position.PLAINSIDE
    case 'side_spot':
      return Pig.Position.DOTSIDE
    case 'razorback':
      return Pig.Position.RAZORBACK
    case 'trotter':
      return Pig.Position.TROTTER
    case 'snouter':
      return Pig.Position.SNOUTER
    case 'leaning_jowler':
      return Pig.Position.LEANER
    case 'bacon':
      return Pig.Position.BACON
    default:
      return null
  }
}

const detect = (image) => {
  const data = new FormData()
  data.append('file', dataURLtoBlob(image), 'filename.png')
  return fetch(PREDICT_URI, { method: 'POST', body: data })
    .then(response => response.json())
    .then(resp => (
      {
        image: `/${resp.img_url}`,
        throw: [mapToPosition(resp.pig1), mapToPosition(resp.pig2)]
      }
    ))
}

const submitScores = (players, turns) =>
  fetch(`${SCORES_URI}/${currentGameId()}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ players, turns, totals: Pig.scoreAccumulations(players, turns) })
  })

export default { detect, submitScores, resetGameId, unsetGameId, gameIdIsSet }
