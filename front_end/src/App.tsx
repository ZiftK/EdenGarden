import Input from './components/moleculs/Input'
import './App.css'
import Navbar from './components/organisms/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <h1>Hola</h1>
      <Input sx='small' color='#efac4f' lightnessFactor={60}  sxText={14} variant='filled' label='mmm'/>
      <Input sx='small' color='#f0f' variant='outlined' label='quee'/>
      <Input sx='small' color='#f00' sxText={14} variant='default' label='quee'/>
    </>
  )
}

export default App
