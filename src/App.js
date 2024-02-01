
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Booking from './Components/Booking';
import Navbar from './Components/Navbar';




function App() {


  return (
        <div className="App">
    <BrowserRouter>
  <Navbar/>
      <Routes>
        <Route path='/' element={  <Home />}/>
        <Route path='/book/:id' element={  <Booking />}/>
        
      </Routes>

    </BrowserRouter>
        </div>


  );
}

export default App;
