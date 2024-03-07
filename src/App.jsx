import { useState, useEffect } from 'preact/hooks'
import { currentAlarm, alarms, timestamp, time, isDarkMode, alarmSound } from './signals/store'
import { timeToMinutes, timeDifference } from './utils/utils'
import { useSignalEffect, effect } from '@preact/signals'

import Clock from './components/Clock'
import AlarmList from './components/AlarmList'
import CreateAlarmModal from './components/CreateAlarmModal'
import AlarmModal from './components/AlarmModal'
import Button from './components/Button'
import Toggle from './components/Toggle'

//Has to run before the app starts to avoid flickering
effect(() => {
  const html = document.querySelector('html')

  if (isDarkMode.value) {
    if (!html.classList.contains('dark')) {
      html.classList.add('dark')
    }
  } else {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
    }
  }
})

export default function App() {
  const [showCreateAlarm, setShowCreateAlarm] = useState(false)
  const [showAlarm, setShowAlarm] = useState(false)
  const [alarm, setAlarm] = useState(null)
  const [alarmsToDismiss, setAlarmsToDismiss] = useState([])

  useEffect(() => {
    setTabTitle()
    setInterval(() => {
      timestamp.value = Date.now()
      setTabTitle()
    }, 1000)
  }, [])

  useEffect(() => {
    setTabTitle()
  }, [alarms, currentAlarm])

  useSignalEffect(() => { 
    if (currentAlarm.value) {
      if (!alarm) {
        setAlarm(currentAlarm.value)
        setShowAlarm(true)
        onAlarmRing(currentAlarm.value.id)
      } else {
        if (currentAlarm.value.time !== alarm.time) {
          setAlarm(currentAlarm.value)
          setShowAlarm(true)
          onAlarmRing(currentAlarm.value.id)
        }
      }

    }
  }, [currentAlarm])

  const playAlarmSound = () => {
    if (alarmSound.value) {
      alarmSound.value.play()
    }
  }
  
  const stopAlarmSound = () => {
    if (alarmSound.value) {
      alarmSound.value.pause()
      alarmSound.value.currentTime = 0
    }
  }

  const onAlarmRing = (id) => {
    playAlarmSound()
    setAlarmsToDismiss([...alarmsToDismiss, id])
  }

  const setTabTitle = () => {
    let minTime = Infinity

    for (let i = 0; i < alarms.value.length; i++) {
      minTime = Math.min(minTime, timeToMinutes(alarms.value[i].time))
    }

    const [minAlarm] = alarms.value.filter(i => timeToMinutes(i.time) !== minTime)

    document.title = minAlarm?.time ?? 'Clock'
  }

  const dismissAlarms = () => {
    alarmsToDismiss.forEach(id => {
      alarms.value = alarms.value.filter(i => i.id !== id)
    })
    setAlarmsToDismiss([])
  }

	return (
		<div class="flex flex-col h-full w-full">
      <header class="flex justify-end shrink-1 h-auto w-full basis-0 p-2">
        <Toggle 
          title={['Dark', 'Dark']}
          initialValue={isDarkMode.value}
          onToggle={(value) => {
            isDarkMode.value = value
          }}
        />
      </header>

      <main class="w-full h-full flex items-center justify-center flex-col gap-4 basis-full">
        <Clock time={time} />
  
        <AlarmList clockTime={time.value} alarms={alarms}/>
  
        <Button 
          value="Add alarm" 
          onClick={() => setShowCreateAlarm(true)} 
          class="btn-primary w-[120px] px-4 grow-0 rounded-md dark:bg-gray-700"
          submit 
        />
  
        <CreateAlarmModal
          show={showCreateAlarm}
          alarms={alarms}
          onDismiss={() => setShowCreateAlarm(false)}
        />
  
        <AlarmModal 
          show={showAlarm}
          alarm={alarm}
          alarms={alarms}
          onDismiss={() => {
            setShowAlarm(false)
            stopAlarmSound()
            dismissAlarms()
          }}
        />
      </main>

      <footer class="flex basis-0">
        <a href="https://github.com/retsi101" class="pl-1 opacity-20 hover:-translate-y-[3px] transition-transform">{' '}by retsi</a>
      </footer>
    </div>
	)
}
