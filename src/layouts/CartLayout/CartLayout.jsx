import React from 'react'
import Footer from 'src/components/Footer/Footer'
import HeaderCart from 'src/components/HeaderCart/HeaderCart'
import Proptypes from 'prop-types'

export default function CartLayout({ children }) {
  return (
    <div>
      <HeaderCart />
      {children}
      <Footer />
    </div>
  )
}

CartLayout.propTypes = {
  children: Proptypes.oneOfType([Proptypes.element, Proptypes.arrayOf(Proptypes.element)])
}
