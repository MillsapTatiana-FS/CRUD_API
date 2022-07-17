import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Dashboard() {
  const [crystals, setCrystals] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/v1' 
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
        <h1>You are on Dashboard.js </h1>
        <Link to="/">Home</Link>
        <ul>
          {
            crystals && crystals.map(crystal => (
              <li key={crystal._id}>
                <Link to={`/crystal/${crystal._id}`}>{crystal.name}</Link>
              </li>
              ))
         }
        </ul>
      </header>
    </div>
  );
}

export default Dashboard;
