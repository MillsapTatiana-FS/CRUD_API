import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';

function Crystal() {
  const [crystals, setCrystals] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [values, setValues] = useState({
    name: '',
    color: '',
    chakra: ''
  })

  const { id } = useParams()
  const navigate = useNavigate();

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
    setLoading(true)
    try{ 
      await fetch(`${API_BASE}/crystals/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log({data})
        // const { name, color, chakra } = data;
        setValues({
            name: data.name, 
            color: data.color, 
            chakra: data.chakra
        })
      })
    } catch (error){
      setError(error.message || 'Something went wrong') 
    }finally{
      setLoading(false)
    }
  }

  const deleteCrystal = async () => {
    try{ 
      await fetch(`${API_BASE}/crystals/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        setCrystals(data)
        navigate("/dashboard", {replace: true})
      })
    } catch (error){
      setError(error.message || 'Something went wrong') 
    }finally{
      setLoading(false)
    }
  }

  const updateCrystal = async () => {
    try{ 
      await fetch(`${API_BASE}/crystals/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
            .then(res => res.json())
            .then(data => {
               console.log({data})
            })
    } catch (error){
      setError(error.message || 'Something went wrong') 
    }finally{
      setLoading(false)
    }
  }

    const handleSubmit = (Event) => {
        Event.preventDefault();
        updateCrystal();
    }


  const handleInputChanges = (Event) => {
    Event.persist();
    setValues((values) => ({
      ...values,
      [Event.target.name]: Event.target.value
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crystal Profile </h1>
        <h5>{values && values.name}</h5>
        <p>{values && values.color}</p>
        <p>{values && values.chakra}</p>
        <button onClick={() => deleteCrystal()}>Delete Crystal</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        <form onSubmit={ ( Event) => handleSubmit(Event)}>
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

export default Crystal;
