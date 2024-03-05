export default function Button(props) {
  return (
    <input 
      {...props} 
      class={`
        ${props.class} 
        w-hover:shadow-md transition-shadow active:translate-y-[1px] transition-tranform py-2
      `}
      type={props.submit ? 'submit' : 'button'} 
      value={props.value}
    />
  )
}
