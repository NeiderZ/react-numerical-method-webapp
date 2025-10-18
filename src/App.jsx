import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RootOfEquation from './RootOfEquation'
import LinearAlgebra from './LinearAlgebra'
import Interpolation from './Interpolation'
import Extrapolation from './Extrapolation'

function App() {
  const [activeMenu, setActiveMenu] = useState(null)

  const renderContent = () =>{
    switch(activeMenu){
      case 'RootOfEquation':
        return(<RootOfEquation/>)
      case 'LinearAlgebraEquation':
        return(<LinearAlgebra/>)
      case 'Interpolation':
        return(<Interpolation/>)
      case 'Extrapolation':
        return(<Extrapolation/>)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Numerical Method</h1>
      <button onClick={() => setActiveMenu('RootOfEquation')}>Root of Equation</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => setActiveMenu('LinearAlgebraEquation')}>Linear Algebra Equation</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => setActiveMenu('Interpolation')}>Interpolation Method</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => setActiveMenu('Extrapolation')}>Extrapolation Method</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="card">
        {renderContent()}
      </div>
    </>
  )
}

export default App
