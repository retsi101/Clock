import { signal, computed, effect } from '@preact/signals'
import { splitTime, timeToMinutes } from '../utils/utils'
import alarmSoundFile from '/alarm.mp3'

export const LOCAL_STORAGE_KEY = '__zenalarm__'

const isDef = (value) =>
  value !== undefined &&
  value !== null &&
  value !== 'undefined'

const getLocalStorage = (id, initialValue) => {
  const value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY + id))

  if (isDef(value)) {
    return value
  }

  return initialValue
}

const setLocalStorage = (id, value) => {
  if (isDef(value)) {
    localStorage.setItem(LOCAL_STORAGE_KEY + id, JSON.stringify(value))
  }
}

const date = new Date(Date.now())

export const timestamp = signal(date.getTime())

export const time = computed(() => {
  date.setTime(timestamp.value)
  return date.toLocaleTimeString('pt-BR')
})

export const alarms = signal(getLocalStorage('alarms', []))

effect(() => {
  alarms.value = alarms.value.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)) 
  setLocalStorage('alarms', alarms.value)
})

export const currentAlarm = computed(() => {
  const [hours, minutes] = splitTime(time.value)
  return alarms.value.find(i => i.time === `${hours}:${minutes}`)
})

export const isDarkMode = signal(getLocalStorage('isDarkMode', true))

effect(() => {
  setLocalStorage('isDarkMode', isDarkMode.value)
})

const audio = new Audio(alarmSoundFile)
export const alarmSound = signal(audio)

