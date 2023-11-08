const express = require('express');
const Model = require('../model/model')
const artefact = require('../model/artefact')

const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {

    const data = new Model(
        {
            name: req.body.name,
            age: req.body.age
        }
    )

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)

    }
    catch (error) {
        res.status(400).json({ message: error.message })

    }
})

router.post('/postartefact', async (req, res) => { //artefact

    const data = new artefact(
        {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        }
    )

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)

    }
    catch (error) {
        res.status(400).json({ message: error.message })

    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find({ name: { $ne: "yoooo" } }, { name: 0, _id: 0, __v: 0 }).sort({ time: -1 }).limit(3); //gets the last person with file not containing name,id,version with name not equal to yoooo
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getArtefacts', async (req, res) => { //artefact
    try {
        const data = await artefact.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/deleteart/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const data = await artefact.findOneAndDelete({ name: name });
        if (data) {
            res.send(`Document with name ${data.name} has been deleted.`);
        } else {
            res.status(404).send("Document not found.");
        }
    }
    catch (error) {
        res.status(400).json({ message: ("param is" + req.params.name) });
    }
});

module.exports = router;