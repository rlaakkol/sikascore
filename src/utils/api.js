import Pig from './pig'

const PREDICT_URI = '/api/predict'

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
    .then((resp) => {
      console.log(resp)
      return {
        image: `/${resp.img_url}`,
        throw: [mapToPosition(resp.pig1), mapToPosition(resp.pig2)]
      }
    })
}

export default { detect, mapToPosition }
