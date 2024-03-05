import { useState } from 'preact/hooks'

export default function Toggle(props) {
  const [active, setActive] = useState(props.initialValue)

  return (
    <div class="flex flex-col items-center text-xs text-center">
      <div>
        <div>{props.title[active ? 0 : 1]}</div>
        <button 
          {...props} 
          onClick={(e) => { 
            props?.onToggle(!active)
            setActive(!active)
          }} 
          class={`
            ${props.class}
            group flex flex-row w-14 h-8 rounded-full  box-border p-1

            bg-white border-4 border-gray-300
            data-[active=true]:bg-black
            data-[active=true]:border-black

            dark:bg-gray-800
            dark:border-2
            dark:border-gray-600

            
            transition-all
          `}
          data-active={active}
        >
          {/* Toggle helper, this guy makes it possible to slide the  */}
          <div class="
            transition-all duration-300 
            w-0 
            group-data-[active=true]:w-full
          "></div>
          
          <div class="
            w-[50%] h-full
            shrink-0 
            bg-gray-300
            rounded-full 
            transition-all
            group-data-[active=true]:bg-white
            group-data-[active=true]:border-0
          "></div>
        </button>
      </div>
    </div>
  )
}
