const express = require('express');
const { Gas } = require('../models/gas');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    Gas.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error tratando de obtener los "combustibles" ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No se encontraron "combustibles" con el id: ${req.params.id}`);
    }
    Gas.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(`Error buscando "combustible : ${req.params.id}" ` + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var gasObject = new Gas({
        name: req.body.name,
        octane: req.body.octane,
        detail: req.body.detail
    });
    gasObject.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error tratando de almacenar el "combustible" ' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No se encontraron "combustibles" con el id: ${req.params.id}`);
    }
    var gasObject = {
        name: req.body.name,
        octane: req.body.octane,
        detail: req.body.detail
    };
    Gas.findByIdAndUpdate(req.params.id, { $set: gasObject }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error tratando de actualizar el "Combustible" ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay combustibles con el id: ${req.params.id}`);

    Gas.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error eliminando combustible :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;