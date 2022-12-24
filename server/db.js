var mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/SpaceCraftDB')
    .then(() => {
        console.log("La conexion con MongoDB {SpaceCraftDB} se ha establecido con exito!");

    })
    .catch(err => console.log(err));

module.exports = mongoose;