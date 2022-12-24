const express = require('express');
const { Spacecraft } = require('../models/spacecraft');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    Spacecraft.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error tratando de obtener los "Spacecrafts" ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No se encontraron "Spacecrafts" con el id: ${req.params.id}`);
    }
    Spacecraft.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(`Error buscando "Spacecraft : ${req.params.id}" ` + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/filter', (req, res) => {
    
    var word = req.body.word;

    Spacecraft.find({type: word}, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(doc);
            console.log("word => " + word);
        } else {
            console.log(`Error buscando "tipos : ${word}" ` + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var spacecraftObject = new Spacecraft({
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
        push: req.body.push,
        gas: req.body.gas,
        speed: req.body.speed,
        detail: req.body.detail
    });
    spacecraftObject.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error tratando de almacenar el "Spacecraft" ' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No se encontraron "Spacecrafts" con el id: ${req.params.id}`);
    }
    var spacecraftObject = {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
        push: req.body.push,
        gas: req.body.gas,
        speed: req.body.speed,
        detail: req.body.detail
    };
    Spacecraft.findByIdAndUpdate(req.params.id, { $set: spacecraftObject }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error tratando de actualizar el "Spacecraft" ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay naves con el id: ${req.params.id}`);

    Spacecraft.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error eliminando nave :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;