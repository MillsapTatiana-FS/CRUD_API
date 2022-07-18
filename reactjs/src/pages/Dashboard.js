import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Dashboard() {
  const [crystals, setCrystals] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: '',
    color: '',
    chakra: ''
  })

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
    setLoading(true)
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

  const createCrystals = async () => {
    try{ 
      await fetch(`${API_BASE}/crystals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(values)})
      .then(() => getCrystals())
    } catch (error){
      setError(error.message || 'Something went wrong') 
    }finally{
      setLoading(false)
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    createStudent();
}

const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value
    }))
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crystal Dashboard </h1>
        <Link to="/">Home</Link>
        <ul>
          {
            crystals?.map(crystal => (
              <li key={crystal._id}>
                <Link to={`/crystals/${crystal._id}`}>{crystal.name}</Link>
              </li>
              ))
         }
        </ul>
        <form onSubmit={(event) => handleSubmit(event)}>
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleInputChanges} />
            </label>
            <label>
                Color:
                <input type="text" name="color" value={values.color} onChange={handleInputChanges} />
            </label>
            <label>
                Chakra:
                <input type="text" name="chakra" value={values.chakra} onChange={handleInputChanges} />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
