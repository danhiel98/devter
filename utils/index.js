export const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export const normalizedTimestamp = (timestamp) => {
  return new Date(timestamp.seconds * 1000).toLocaleString('es-SV')
}
