import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function Crystal() {
  const [crystals, setCrystals] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { id } = useParams();

  const API_BASE = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/v1' 
    : process.env.REACT_APP_BASE_URL;

  let ignore = false;  
  useEffect(() => {
    
    if(!ignore){
      getCrystal();
    }

    return () => {
      ignore = true;
    }
  },  [])
  
  const getCrystal = async () => {
    try{ 
      await fetch(`${API_BASE}/crystals/${id}`)
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
        <h1>Crystal Profile </h1>
        <h5>{crystals && crystals.name}</h5>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Crystal;
