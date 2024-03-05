import Modal from "./Modal"
import Button from './Button'

export default function AlarmModal(props) {
  return (
    props?.alarm &&
    <Modal 
      {...props} 

      title="Alarm"

      content={
        <>
          <div class="text-center text-4xl">{props.alarm.time}</div>
          <div class="text-center text-lg mt-2">{props.alarm.title}</div>
        </>
      }

      buttons={
        <>
          <Button value="Dismiss" class="btn-primary w-full" onClick={() => props.onDismiss()}/>
        </>
      } 
    />
  )
}


