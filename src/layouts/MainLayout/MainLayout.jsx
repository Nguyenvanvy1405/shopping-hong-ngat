import React from 'react'
import Header from 'src/components/Header/Header'
import Footer from 'src/components/Footer/Footer'
import Proptypes from 'prop-types'

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

MainLayout.propTypes = {
  children: Proptypes.oneOfType([Proptypes.element, Proptypes.arrayOf(Proptypes.element)])
}
