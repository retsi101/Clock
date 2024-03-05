import NumberInput from './NumberInput'

export default function TimeInput(props) {
  return (
    <div class="flex items-center justify-center font-bold py-2">
      <NumberInput 
        name="hours" 
        min={0} max={23} 
        maxlength={2}
        leadingZeros={true} 
        placeholder="00" 
        required={props.required}
        class="border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700"
      />
      <div class="text-4xl -translate-y-1">:</div>
      <NumberInput 
        name="minutes" 
        min={0} max={59} 
        maxlength={2} leadingZeros={true} 
        placeholder="00" 
        required={props.required}
        class="border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
    </div>
  )
}
