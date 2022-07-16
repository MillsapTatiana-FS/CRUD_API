import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [crystals, setCrystals] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/v1/' 
    : process.env.REACT_APP_BASE_URL;

  let ignore = false;  
  useEffect(() => {
    
    if(!ignore){
      getCrystals();
    }

    return () => {
      ignore = true;
    }
  },  [])
  
  const getCrystals = async () => {
    try{ 
      await fetch(`${API_BASE}/crystals`)
      .then(res => res.json())
      .then(data => {
        console.log({data})
        setCrystals(data)
      })
    } catch (error){
      setError(error.message || 'Something went wrong') 
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crystals:</h1>
          <ul>
            <li>Look at the lovelies</li>
          </ul>
      </header>
    </div>
  );
}

export default App;
