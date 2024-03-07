const MINUTES_IN_A_DAY = 1440

export function splitTime(time) {
  return time.match(/^(\d\d):(\d\d)/g, '$1:$2').join().split(':') 
}

export const timeToMinutes = (time) => {
  const [strHours, strMinutes] = splitTime(time)
  const minutes = (parseInt(strHours) * 60) + (parseInt(strMinutes) % 60)
  return minutes
} 

export const minutesToTime = (_minutes) => {
  const hours   = String(Math.floor(_minutes / 60)).padStart(2, '0')
  const minutes = String(_minutes % 60).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const timeDifference = (a, b) => {
  const aMinutes = timeToMinutes(a)
  const bMinutes = timeToMinutes(b)
  const diff = bMinutes - aMinutes

  if (diff < 0) {
    return minutesToTime(diff + MINUTES_IN_A_DAY)
  }

  return minutesToTime(diff)
}

export const clamp = (value, min, max) =>
  Math.min(Math.max(min, value), max)
