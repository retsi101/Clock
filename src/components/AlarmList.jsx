import Alarm from './Alarm'

export default function AlarmList(props) {
  const handleAlarmClose = id => {
    props.alarms.value = props.alarms.value.filter(i => i.id !== id)
  }
  
  return (
    <ul class="flex flex-row gap-3">
      {
        props.alarms.value.map(alarm =>
          <li key={alarm.id}>
            <Alarm {...alarm} clockTime={props.clockTime} onClose={ handleAlarmClose } />
          </li>
        )
      }
    </ul>
  )
}
