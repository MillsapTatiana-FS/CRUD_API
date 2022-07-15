const express = require('express');
const router = express.Router();

const Crystal = require('../models/crystal')

//RESTFUL  ENDPOINTS
//GET, POST, PATCH, DELETE

const getCrystal = async (req, res, next) => {
  let crystal 
    try {
      crystal = await Crystal.findById(req.params.id)
      if(!crystal) {
        return res.status(404).json({
          message: 'Crystal not found'
        })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
    res.crystal = crystal;
    next();
}

//GET ALL
router.get('/', async (req, res) => { 
     try {
         const crystals = await Crystal.find()
         res.json(crystals)
     } catch (err) {
         res.status(500).json({ message: error.message })
     }
    }); 

//GET ONE
router.get('/:id', getCrystal, async (req, res) => { 
    res.json(res.crystal) 
    }) 

//POST CREATE
router.post('/', async (req, res) => { 
    const crystal = new Crystal({
        name: req.body.name,
        color: req.body.color,
        chakra: req.body.chakra
    })
    try {
        const newCrystal = await crystal.save();
        res.status(201).json(newCrystal)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}) 

//PATCH UPDATE
router.patch('/:id', getCrystal, async (req, res) => { 
    if(req.body.name != null) {
        res.crystal.name = req.body.name
    }
    if(req.body.color != null) {
        res.crystal.color = req.body.color
    }
    if(req.body.chakra != null) {
        res.crystal.chakra = req.body.chakra
    }
    try {
        const updatedCrystal = await res.crystal.save()
        res.json(updatedCrystal)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}); 

//DELETE
router.delete('/:id', getCrystal, async (req, res) => { 
    try {
        await res.crystal.remove()
        res.json({ message: 'Crystal deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}); 
module.exports = router;