import { useRef, useEffect } from 'preact/hooks'

export default function Modal(props) {
  const dialogRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (props.show) {
      dialogRef.current.showModal()
      props?.onOpen?.()
    } else {
      dialogRef.current.close()
      props?.onClose?.()
      props.onDismiss()
    }
  }, [props.show])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    props?.onSubmit?.(e)
    e.target.reset()
    props.onDismiss()
  }

  const handleOnClick = (e) => {
    props?.onClose?.()
    props.onDismiss()
  }

  const handleOnClose = (e) => {
    props?.onClose?.(e)
    props.onDismiss()
  }

  return (
    <dialog 
      ref={dialogRef} 
      onClick={handleOnClick} 
      onClose={handleOnClose}
      class="top-0 left-0 group flex items-center justify-center w-full h-full max-w-full max-h-full bg-white/30 dark:bg-black/20 opacity-0 open:opacity-100 pointer-events-none open:pointer-events-auto open:backdrop-blur transition duration-300 transition-all"> 
      <form ref={formRef} action="about:blank" 
        onSubmit={handleOnSubmit} 
        onClick={(e) => { 
          e.stopPropagation() 
        }}
        class="flex flex-col bg-white dark:bg-gray-700 text-black dark:text-gray-300 rounded-lg shadow-lg w-60 overflow-hidden shadow-[inset_0_0px_2px_1px_rgba(0,0,0,0.05)] -translate-y-10 group-open:translate-y-0 transition duration-300 transition-all"
      >
        <header class="text-lg font-bold text-center p-4">{props.title}</header>
        <hr class="border-gray-200 dark:border-gray-800 border-1 w-full"/>

        <div class="p-2">
          {props.content}
        </div>

        <hr class="border-gray-200 dark:border-gray-800 border-1 w-full"/>
        <footer class="w-full flex gap-1 justify-center">
          {props.buttons}
        </footer>
      </form>
    </dialog>
  )
}
