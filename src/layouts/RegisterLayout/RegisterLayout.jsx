import React from 'react'
import Footer from 'src/components/Footer/Footer'
import HeaderRegister from 'src/components/HeaderRegister/HeaderRegister'
import Proptypes from 'prop-types'

export default function RegisterLayout({ children, title }) {
  return (
    <div>
      <HeaderRegister title={title} />
      {children}
      <Footer />
    </div>
  )
}

RegisterLayout.propTypes = {
  title: Proptypes.string,
  children: Proptypes.oneOfType([Proptypes.element, Proptypes.arrayOf(Proptypes.element)])
}
