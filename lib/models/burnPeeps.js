var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const burnerSchema = new Schema({
    name: {type: String, required: true},
    function: {type: String, required: true},
    thereFor: {type: String, required: true}
});

module.exports = mongoose.model('Burner', burnerSchema);

