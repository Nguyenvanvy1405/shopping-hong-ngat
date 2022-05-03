import React, { useState } from 'react'
import * as S from './InputText.style'
export default function InputText({ ...props }) {
  // Set Focus cho Component Inut
  const [focus, setFocus] = useState(false)
  return (
    <S.FormControl focus={focus}>
      {/* Focus vào , Onblur thả chuột Ra */}
      <input {...props} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </S.FormControl>
  )
}
