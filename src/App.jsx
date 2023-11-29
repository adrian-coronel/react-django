import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateFormPage from './page/CreateFormPage';
import HomePage from './page/HomePage';

function App() {
  return (
    <Router>  
      <Routes>
        {/* Otras rutas... */}
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/create" element={<CreateFormPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
