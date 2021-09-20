export const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export const normalizedTimestamp = (timestamp) => {
  return new Date(timestamp.seconds * 1000).toLocaleString('es-SV')
}

export const PATH_NAMES = {
  HOME: '/home',
  COMPOSE_DEVIT: '/compose/devit'
}
