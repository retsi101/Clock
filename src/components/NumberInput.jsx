import { useState, useEffect } from 'preact/hooks'
import { clamp } from '../utils/utils'

export default function NumberInput(props) {
  const [value, setValue] = useState('')
  const [maskedValue, setMaskedValue] = useState('') 

  useEffect(() => {
    if (value === '') { 
      setMaskedValue('') 
    }
    else if (!isNaN(parseInt(value))) {
      const leadingZeros = value.match(/^0*/g, '$1')[0]
      const clampedValue = String(clamp(parseInt(value), props.min, props.max))
      let prefix = clampedValue !== '0' 
        ? leadingZeros 
        : leadingZeros.slice(0, -1)

      setMaskedValue(prefix + clampedValue)
    } 
  }, [value])

  const handleInput = (e) => {
    if (e.key !== 'Tab') {
      setValue(e.target.value)
    }
  }

  const handleBlur = (e) => {
    if (props.leadingZeros && maskedValue.length === 1) {
      setMaskedValue(maskedValue.padStart(2, '0')) 
    }
  }

  return (
    <input 
      {...props}
      type="text"
      value={maskedValue}
      onInput={handleInput}
      onKeyDown={handleInput}
      onBlur={handleBlur}
      class={`${props.class} border w-full py-2 text-center text-4xl rounded-md`}
    />
  )
}
