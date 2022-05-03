import React from 'react'
import 'normalize.css'
// Đường dẫn tương đối đã config tại file jsconfig.json
import 'src/assets/styles/global.scss'
import Routes from './Routes'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Authorization from './components/Authorization/Authorization'
// import Authorization from './components/Authorization/Authorization'

function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer />
      {/* khi mà status thay đổi chỉ render component này thôi */}
      <Authorization />
    </div>
  )
}

export default App
