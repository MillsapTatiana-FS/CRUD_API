import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Crystal from './pages/Crystal';

function App() {
  
  return (
   <Router>
      <Routes>
        <Route path="/crystals/:id" exact element={<Crystal />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
   </Router>
  );
}

export default App;
