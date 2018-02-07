import uuid from 'uuid/v4'

import Pig from './pig'

const PREDICT_URI = '/api/predict'
const VERIFY_URI = '/api/submit'
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

const apiPositionMap = {
  'side': Pig.Position.PLAINSIDE,
  'side_spot': Pig.Position.DOTSIDE,
  'razorback': Pig.Position.RAZORBACK,
  'trotter': Pig.Position.TROTTER,
  'snouter': Pig.Position.SNOUTER,
  'leaning_jowler': Pig.Position.LEANER,
  'bacon': Pig.Position.PLAINSIDE
}

const positionApiMap = {}
Object.entries(apiPositionMap).forEach(entry => (positionApiMap[entry[1]] = entry[0]))

const mapToPosition = pig =>
  Object.prototype.hasOwnProperty.call(apiPositionMap, pig) ? apiPositionMap[pig] : null

const mapFromPosition = pig =>
  Object.prototype.hasOwnProperty.call(positionApiMap, pig) ? positionApiMap[pig] : null

const detect = (image) => {
  const data = new FormData()
  data.append('file', dataURLtoBlob(image), 'filename.png')
  return fetch(PREDICT_URI, { method: 'POST', body: data })
    .then(response => response.json())
    .then(resp => (
      {
        image: `/${resp.img_url}`,
        throw: [mapToPosition(resp.pig1), mapToPosition(resp.pig2)],
        uuid: resp.uuid
      }
    ))
}

const verify = (id, pig1, pig2) =>
  fetch(VERIFY_URI, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      uuid: id,
      pig1: mapFromPosition(pig1),
      pig2: mapFromPosition(pig2)
    })
  })

const submitScores = (players, turns) =>
  fetch(`${SCORES_URI}/${currentGameId()}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ players, turns, totals: Pig.scoreAccumulations(players, turns) })
  })

export default { detect, verify, submitScores, resetGameId, unsetGameId, gameIdIsSet }
