import { timeDifference } from '../utils/utils'

export default function Alarm(props) {
  return (
    <div class="relative border-2 border-black dark:border-gray-700 rounded-md py-1 px-4 select-none text-center">
      <span class="peer">{props.time}</span>
      <button 
        onClick={ e => props.onClose(props.id) }
        class="absolute top-0 right-0 -translate-y-1 -translate-x-1 hover:font-bold"
      >
        ×
      </button>
      <div class="text-xs">{timeDifference(props.clockTime.slice(0, -3), props.time)}</div>
      { props.title.length > 0 && <div class="absolute pointer-events-none italic left-0 right-0 bg-white dark:bg-gray-700 border dark:border-gray-600 box-border p-2 w-32 -translate-x-7 translate-y-4 peer-hover:translate-y-2 rounded-md shadow-lg opacity-0 backdrop-blur peer-hover:opacity-100 transition-all">{props.title}</div> }
    </div>
  )
}
