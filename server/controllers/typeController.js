const express = require('express');
const { Type } = require('../models/type');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    Type.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error tratando de obtener los "tipos de nave" ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No se encontraron "tipos" con el id: ${req.params.id}`);
    }
    Type.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(`Error buscando "tipo : ${req.params.id}" ` + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var typeObject = new Type({
        name: req.body.name,
        detail: req.body.detail
    });
    typeObject.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error tratando de almacenar el "tipo" ' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No se encontraron "tipos" con el id: ${req.params.id}`);
    }
    var typeObject = {
        name: req.body.name,
        detail: req.body.detail
    };
    Type.findByIdAndUpdate(req.params.id, { $set: typeObject }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error tratando de actualizar el "Tipo" ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay tipos con el id: ${req.params.id}`);

    Type.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error eliminando tipo :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;