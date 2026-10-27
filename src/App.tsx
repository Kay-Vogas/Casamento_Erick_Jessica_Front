import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RSVPPage from './pages/ListaPresentes';

function App() {
  return (

    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/presentes" element={<RSVPPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;