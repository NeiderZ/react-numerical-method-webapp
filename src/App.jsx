import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RootOfEquation from './RootOfEquation'
import LinearAlgebra from './LinearAlgebra'
import Interpolation from './Interpolation'
import Extrapolation from './Extrapolation'
import Integration from './Integration'
import { Link, Routes, Route } from 'react-router-dom'

function App() {

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
      <Link to="/RootOfEquation"><button style={{ backgroundColor: '#007bff', color: 'white' }}>Root of Equation</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/LinearAlgebraEquation"><button style={{ backgroundColor: '#007bff', color: 'white' }}>Linear Algebra Equation</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/Interpolation"><button style={{ backgroundColor: '#007bff', color: 'white' }}>Interpolation Method</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/Extrapolation"><button style={{ backgroundColor: '#007bff', color: 'white' }}>Extrapolation Method</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/Integration"><button style={{ backgroundColor: '#007bff', color: 'white' }}>Integration Method</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="card">
        <Routes>
          <Route path="/RootOfEquation/:methodParam?" element={<RootOfEquation />} />
          <Route path="/LinearAlgebraEquation/:methodParam?" element={<LinearAlgebra />} />
          <Route path="/Interpolation/:methodParam?" element={<Interpolation />} />
          <Route path="/Extrapolation/:methodParam?" element={<Extrapolation />} />
          <Route path="/Integration/:methodParam?" element={<Integration />} />
        </Routes>
      </div>
    </>
  )
}

export default App
