import React from 'react'
import PropTypes from 'prop-types'

export default function BaseInputNumber({ onChange, value, onBlur, ...props }) {
  const hanleChange = event => {
    const val = event.target.value
    if ((/^\d+$/.test(val) || val === '') && onChange) {
      onChange(val)
    }
  }

  const hanleBlur = event => {
    const val = event.target.value
    onBlur && onBlur(val)
  }

  return <input type="text" onChange={hanleChange} value={value} {...props} onBlur={hanleBlur} />
}

BaseInputNumber.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
