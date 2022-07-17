import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Crystal from './pages/Crystal';

function App() {
  
  return (
   <Router>
      <Routes>
        <Route path="/crystal/:_id" element={<Crystal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
   </Router>
  );
}

export default App;
