import './App.css'
import {BtnFilled, BtnHref, BtnOutlined} from './components/moleculs/Button'

function App() {
  return (
    <>
      <h1>Hola</h1>
      <BtnOutlined text='Nuestros servicios'/>
      <BtnFilled text='Contactanos'/>
      <BtnHref text='Ir a Google' link='https://www.google.com'/>
    </>
  )
}

export default App
