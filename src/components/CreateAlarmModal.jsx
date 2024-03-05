import Modal from "./Modal"
import TimeInput from './TimeInput'
import Button from './Button'

export default function CreateAlarmModal(props) {
  const handleOnSubmit = (e) => {
    const data = new FormData(e.target)

    props.alarms.value = [
      ...props.alarms.value, 
      
      { 
        id: Date.now(), 
        title: data.get('title'),
        time: `${data.get('hours').padStart(2, '0')}:${data.get('minutes').padStart(2, '0')}`,
      }
    ]

    props?.onSubmit?.()
  }

  return (
    <Modal 
      {...props}
      onSubmit={handleOnSubmit}

      title="Add alarm"

      content={
        <>
          <TimeInput required/>
          <input type="text" name="title" class="border dark:border-gray-800 dark:bg-gray-800 w-full py-2 text-center rounded-md" placeholder="Title"/>
        </>
      }

      buttons={
        <>
          <Button value="Cancel" onClick={() => props.onDismiss()} class="w-full font-semibold dark:text-gray-400" />
          <Button value="Add" submit class="btn-primary w-full" />
        </>
      }
    />
  )
}

