import React, { Fragment } from 'react'
import * as S from './popover.style'
import PropTypes from 'prop-types'

export default function Popover({ active, children }) {
  return (
    <Fragment>
      {active && (
        <S.Drawer>
          <S.PropoverArrow />
          <S.PropoverContent>{children}</S.PropoverContent>
        </S.Drawer>
      )}
    </Fragment>
  )
}

Popover.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
